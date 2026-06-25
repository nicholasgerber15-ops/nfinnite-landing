import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SERVICES = [
  { name: "Aether", host: "aether.nfinnite.ai", port: 3002, type: "Service" },
  { name: "Vortex", host: "vortex.nfinnite.ai", port: 3003, type: "Service" },
  { name: "Atom", host: "atom.nfinnite.ai", port: 3009, type: "Service" },
  { name: "Warden", host: "warden.nfinnite.ai", port: 3007, type: "Service" },
  { name: "Foundry", host: "foundry.nfinnite.ai", port: 3010, type: "Service" },
  { name: "Forge", host: "forge.nfinnite.ai", port: 3004, type: "Service" },
  { name: "Axis", host: "axis.nfinnite.ai", port: 3001, type: "Service" },
  { name: "Cluster", host: "cluster.nfinnite.ai", port: 3099, type: "Service" },
  { name: "Finn API", host: "api.nfinnite.ai", port: 3456, type: "API" },
  { name: "Aion Chain", host: "chain.nfinnite.ai", port: 3005, type: "L1" },
  { name: "Ego Chain", host: "ego.nfinnite.ai", port: 3006, type: "L2" },
  { name: "App", host: "app.nfinnite.ai", port: 5173, type: "Web" },
  { name: "Admin", host: "admin.nfinnite.ai", port: 5175, type: "Web" },
];

export default function Status() {
  const [results, setResults] = useState({});
  const [ollama, setOllama] = useState(null);

  useEffect(() => {
    async function checkAll() {
      const checks = {};
      for (const svc of SERVICES) {
        try {
          const r = await fetch(`http://localhost:${svc.port}/health`, { signal: AbortSignal.timeout(3000) });
          checks[svc.name] = r.ok ? "up" : "error";
        } catch {
          try {
            const r = await fetch(`https://${svc.host}/health`, { signal: AbortSignal.timeout(3000) });
            checks[svc.name] = r.ok ? "up" : "error";
          } catch {
            checks[svc.name] = "down";
          }
        }
      }
      try {
        const r = await fetch("http://localhost:11434/api/tags", { signal: AbortSignal.timeout(2000) });
        const d = await r.json();
        setOllama(d.models?.map(m => m.name).join(", ") || "running");
      } catch {
        setOllama("down");
      }
      setResults(checks);
    }
    checkAll();
    const interval = setInterval(checkAll, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusCount = Object.values(results).filter(s => s === "up").length;

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-[#0a0a0f]`}>
      <Head><title>System Status — Aion</title></Head>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🔵</span>
          <h1 className="text-3xl font-bold text-white">System Status</h1>
        </div>
        <p className="text-zinc-500 mb-8">Real-time health check — auto-refreshes every 30s</p>

        <div className="rounded-2xl border border-white/5 bg-[#12121a] p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white">{statusCount}/{SERVICES.length}</div>
              <div className="text-zinc-500 text-sm">Services Online</div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                statusCount === SERVICES.length ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
              }`}>
                <span className={`w-2 h-2 rounded-full ${statusCount === SERVICES.length ? "bg-green-400" : "bg-yellow-400"}`} />
                {statusCount === SERVICES.length ? "All Systems Nominal" : `${SERVICES.length - statusCount} Issues`}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {SERVICES.map(svc => {
            const status = results[svc.name] || "checking";
            return (
              <div key={svc.name} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#12121a] px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    status === "up" ? "bg-green-400" : status === "down" ? "bg-red-400" : "bg-zinc-500"
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-white">{svc.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">{svc.host} :{svc.port}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    svc.type === "Web" ? "bg-blue-500/10 text-blue-400" :
                    svc.type === "API" ? "bg-purple-500/10 text-purple-400" :
                    svc.type === "L1" || svc.type === "L2" ? "bg-emerald-500/10 text-emerald-400" :
                    "bg-zinc-500/10 text-zinc-400"
                  }`}>{svc.type}</span>
                  <span className={`text-xs font-semibold ${
                    status === "up" ? "text-green-400" : status === "down" ? "text-red-400" : "text-zinc-500"
                  }`}>{status.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-white/5 bg-[#12121a] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${ollama && ollama !== "down" ? "bg-green-400" : "bg-red-400"}`} />
            <span className="text-sm text-zinc-300">Ollama (Local LLM)</span>
          </div>
          <span className="text-xs text-zinc-500">{ollama || "checking..."}</span>
        </div>

        <div className="mt-12 text-center text-xs text-zinc-600">
          Auto-refreshes every 30s · Last check: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
