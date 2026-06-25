import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const RAW = "https://raw.githubusercontent.com/Dispelle/finn-trading/main";
const fmt = (n) => n == null ? "—" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n) => n == null ? "—" : (n > 0 ? "+" : "") + Number(n).toFixed(2) + "%";

export default function Axis() {
  const [data, setData] = useState(null);
  const [activity, setActivity] = useState([]);
  const [closed, setClosed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(RAW + "/positions.json?t=" + Date.now()).then(r => r.json()).catch(() => null),
      fetch(RAW + "/activity.json?t=" + Date.now()).then(r => r.json()).catch(() => null),
      fetch(RAW + "/closed_trades.json?t=" + Date.now()).then(r => r.json()).catch(() => null),
    ]).then(([p, a, c]) => {
      setData(p);
      setActivity(a?.items || a || []);
      setClosed(c?.closed || c || []);
      setLoading(false);
    });
  }, []);

  const p = data;

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-[#0a0a0f]`}>
      <Head>
        <title>Axis — Trading Mission Control | Aion</title>
      </Head>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">⟁ AION</span>
            <span className="rounded-full bg-aion/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-aion-light uppercase">Axis</span>
          </a>
          <div className="hidden items-center gap-8 text-sm sm:flex">
            <a href="/" className="text-zinc-400 transition hover:text-white">Home</a>
            <a href="#dashboard" className="text-zinc-400 transition hover:text-white">Dashboard</a>
            <a href="#positions" className="text-zinc-400 transition hover:text-white">Positions</a>
            <a href="#activity" className="text-zinc-400 transition hover:text-white">Activity</a>
          </div>
        </div>
      </nav>

      <section className="pt-28 px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">💹</span>
            <h1 className="text-3xl font-bold text-white">Axis Trading</h1>
            <span className="rounded-full border border-aion/20 bg-aion/5 px-3 py-0.5 text-xs text-aion-light">Live</span>
          </div>
          <p className="text-zinc-500 text-sm">Autonomous trading mission control — live data from Finn engine</p>
          {p?.generated_at && <p className="text-zinc-600 text-xs mt-1">Updated {new Date(p.generated_at).toLocaleString()}</p>}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />)}
            </div>
          ) : p ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Portfolio</div>
                <div className="text-2xl font-bold text-white">{fmt(p.portfolio_total)}</div>
                <div className="text-xs text-zinc-600 mt-1">Coinbase + Alpaca</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Month P&L</div>
                <div className={`text-2xl font-bold ${(p.month_pnl_pct ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {pct(p.month_pnl_pct)}
                </div>
                <div className="text-xs text-zinc-600 mt-1">{fmt(p.month_pnl_dollar)} realized</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Open Trades</div>
                <div className="text-2xl font-bold text-white">{p.open?.length || 0}</div>
                <div className="text-xs text-zinc-600 mt-1">{p.long_count ?? 0} long · {p.short_count ?? 0} short</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Cash Ready</div>
                <div className="text-2xl font-bold text-white">{fmt(p.cash_ready)}</div>
                <div className="text-xs text-zinc-600 mt-1">Buying power</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-zinc-500">
              <div className="text-4xl mb-4">📡</div>
              <p>Could not load trading data. Start the Finn engine to see live stats.</p>
            </div>
          )}
        </div>
      </section>

      {/* Positions */}
      <section id="positions" className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white mb-6">Active Positions</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
          ) : p?.open?.length > 0 ? (
            <div className="space-y-3">
              {p.open.map((pos, i) => {
                const profit = (pos.pnl_pct ?? 0) >= 0;
                return (
                  <div key={i} className="rounded-xl border border-white/5 bg-[#12121a] p-5 hover:border-aion/30 transition">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-white">{pos.ticker}</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${profit ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                        {pct(pos.pnl_pct)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-zinc-500 block text-xs">Entry</span><span className="text-zinc-300">{fmt(pos.entry)}</span></div>
                      <div><span className="text-zinc-500 block text-xs">Current</span><span className="text-zinc-300">{fmt(pos.current)}</span></div>
                      <div><span className="text-zinc-500 block text-xs">Stop</span><span className="text-zinc-300">{fmt(pos.stop)}</span></div>
                      <div><span className="text-zinc-500 block text-xs">TP</span><span className="text-zinc-300">{fmt(pos.tp)}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-12 text-center text-zinc-500">
              <div className="text-3xl mb-3">📭</div>
              <p>No open positions</p>
            </div>
          )}
        </div>
      </section>

      {/* Activity + Closed */}
      <section id="activity" className="px-6 pb-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-2">
              {loading ? (
                <>
                  {[1,2,3,4,5].map(i => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}
                </>
              ) : activity.length > 0 ? (
                activity.slice(0, 10).map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border-l-2 border-aion/30 bg-white/[0.02]">
                    <span className="text-xs text-zinc-500 w-16 shrink-0">{a.time || ""}</span>
                    <span className="text-sm text-zinc-300">{a.message || a.text || ""}</span>
                  </div>
                ))
              ) : (
                <div className="text-zinc-500 text-sm text-center py-8">No recent activity</div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Closed Trades</h2>
            <div className="space-y-2">
              {loading ? (
                <>
                  {[1,2,3].map(i => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}
                </>
              ) : closed.length > 0 ? (
                closed.slice(0, 10).map((t, i) => {
                  const klass = (t.pnl ?? 0) >= 0 ? "text-green-400" : "text-red-400";
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-[#12121a]">
                      <div>
                        <span className="font-medium text-white text-sm">{t.ticker}</span>
                        <span className="text-zinc-500 text-xs ml-2">{t.date || ""}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${klass}`}>{fmt(t.pnl)}</div>
                        <div className="text-xs text-zinc-500">{t.outcome || ""}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-zinc-500 text-sm text-center py-8">No closed trades</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-aion/20 bg-gradient-to-br from-aion/10 via-purple-900/10 to-pink-900/10 p-12 text-center">
            <h2 className="text-2xl font-bold text-white">Deploy Axis on Your Portfolio</h2>
            <p className="mt-3 text-zinc-400 max-w-lg mx-auto">Connect your Alpaca or Coinbase account and let the Finn engine trade autonomously.</p>
            <div className="mt-6 flex justify-center gap-4">
              <a href="/#pricing" className="rounded-xl bg-aion px-6 py-3 text-sm font-semibold text-white">View Plans</a>
              <a href="https://github.com/Dispelle/finn-trading" className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-300">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-zinc-600">
          <span>⟁ AION Axis · by NRGco</span>
          <span>Proprietary · All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
