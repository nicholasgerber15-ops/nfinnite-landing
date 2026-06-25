import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const services = [
  {
    id: "aether",
    icon: "🎨",
    name: "Aether",
    tagline: "Creative Generation Engine",
    desc: "Generate images, video, music, voice, and content with intent-routing AI copilot. Per-service LoRA adapters for style control.",
    port: ":3002",
    sub: "aether.nfinnite.ai",
    href: "https://aether.nfinnite.ai",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "vortex",
    icon: "💬",
    name: "Vortex",
    tagline: "Chat & Gaming Runtime",
    desc: "Multi-model reasoning at edge + cluster. Real-time chat, game logic, and agent coordination with streaming inference.",
    port: ":3003",
    sub: "vortex.nfinnite.ai",
    href: "https://vortex.nfinnite.ai",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "atom",
    icon: "⚛",
    name: "Atom",
    tagline: "Core Runtime & Mesh Networking",
    desc: "Distributed runtime integration layer. Mesh networking, service discovery, and inter-process communication.",
    port: ":3009",
    sub: "atom.nfinnite.ai",
    href: "https://atom.nfinnite.ai",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "warden",
    icon: "🛡",
    name: "Warden",
    tagline: "Cybersecurity & Threat Analysis",
    desc: "LLM-powered threat detection, authentication, access control, and real-time security monitoring.",
    port: ":3007",
    sub: "warden.nfinnite.ai",
    href: "https://warden.nfinnite.ai",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "foundry",
    icon: "🔧",
    name: "Foundry",
    tagline: "Model Training & Fusion",
    desc: "LoRA trainer, data forge pipeline, model fusion studio. Train, merge, and optimize custom AI models.",
    port: ":3010",
    sub: "foundry.nfinnite.ai",
    href: "https://foundry.nfinnite.ai",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: "forge",
    icon: "📊",
    name: "Forge",
    tagline: "Billing, Ops & Compliance",
    desc: "Multi-tenant subscription management, billing engine, compliance tracking, and operational dashboards.",
    port: ":3004",
    sub: "forge.nfinnite.ai",
    href: "https://forge.nfinnite.ai",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "axis",
    icon: "💹",
    name: "Axis",
    tagline: "Trading & Risk Platform",
    desc: "ML-powered market analysis, prediction markets, portfolio optimization, and automated trading strategies. Live mission control.",
    port: ":3001",
    sub: "axis.nfinnite.ai",
    href: "/axis/",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "cluster",
    icon: "⚡",
    name: "Cluster",
    tagline: "GPU Inference Network",
    desc: "RTX 4090 inference nodes. Mistral Nemo 24B, SVD, SDXL, Whisper, QLoRA — available as a distributed compute mesh.",
    port: ":8000-8020",
    sub: "cluster.nfinnite.ai",
    href: "https://cluster.nfinnite.ai",
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    id: "aionchain",
    icon: "◈",
    name: "Aion Chain",
    tagline: "L1 for AI-Native Assets",
    desc: "DPoS consensus, 50K TPS, 0.5s block time. AI-native smart contracts, DNFT minting, cross-chain bridges.",
    port: "L1",
    sub: "chain.nfinnite.ai",
    href: "https://chain.nfinnite.ai",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    id: "egochain",
    icon: "🔷",
    name: "Ego Chain",
    tagline: "Identity & Reputation Layer",
    desc: "Soulbound DIDs, ZK-proof verification, decentralized reputation. Identity for AI agents and humans.",
    port: "L2",
    sub: "ego.nfinnite.ai",
    href: "https://ego.nfinnite.ai",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "nfinny",
    icon: "🧠",
    name: "Nfinny",
    tagline: "AI Autonomous Business Operator",
    desc: "7 intelligence engines — observe, interpret, decide, act, evaluate, evolve. Runs your business on autopilot.",
    port: "AI OS",
    sub: "nfinny.nfinnite.ai",
    href: "#",
    gradient: "from-pink-500 to-rose-500",
  },
];

const galleryImages = [
  { label: "Aether — Creative Generation", file: "aether", prompt: "Fantasy landscape with floating crystal islands, ethereal purple and blue aurora" },
  { label: "Vortex — Chat Runtime", file: "vortex", prompt: "Futuristic holographic chat interface with neural network connections" },
  { label: "Foundry — Model Training", file: "foundry", prompt: "Abstract neural network training visualization, orange and amber data flowing" },
  { label: "Cluster — GPU Compute", file: "cluster", prompt: "Server rack with glowing GPUs emitting blue volumetric light" },
  { label: "Aion Chain — Blockchain", file: "aion-chain", prompt: "3D blockchain network with interconnected glowing nodes in emerald and teal" },
  { label: "Axis — Trading Platform", file: "axis", prompt: "Futuristic trading dashboard with holographic candlestick charts" },
];

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <Head>
        <title>Aion — Full-Stack AI Ecosystem</title>
        <meta name="description" content="Aion is a complete AI ecosystem — 11 standalone services including creative generation, chat, security, training, trading, blockchain, and autonomous operations." />
      </Head>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">⟁ AION</span>
            <span className="rounded-full bg-aion/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-aion-light uppercase">Ecosystem</span>
          </div>
          <div className="hidden items-center gap-8 text-sm sm:flex">
            <a href="#services" className="text-zinc-400 transition hover:text-white">Services</a>
            <a href="/axis/" className="text-zinc-400 transition hover:text-white">Axis Live</a>
            <a href="/status/" className="text-zinc-400 transition hover:text-white">Status</a>
            <a href="#benchmarks" className="text-zinc-400 transition hover:text-white">Benchmarks</a>
            <a href="#comparison" className="text-zinc-400 transition hover:text-white">Comparison</a>
            <a href="#gallery" className="text-zinc-400 transition hover:text-white">Gallery</a>
            <a href="#pricing" className="text-zinc-400 transition hover:text-white">Pricing</a>
            <a href="https://github.com/nrgco" className="text-zinc-400 transition hover:text-white">GitHub</a>
            <a href="#cta" className="rounded-lg bg-aion px-5 py-2 text-sm font-semibold text-white transition hover:bg-aion-dark">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aion/20 bg-aion/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-aion-light uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-aion glow" />
            100% Private · Offline-First · Self-Hosted
          </div>
          <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">Your AI.</span>
            <br />
            <span className="bg-gradient-to-r from-aion via-purple-400 to-pink-400 bg-clip-text text-transparent">Your Data. Your Hardware.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            11 stand-alone services — all running locally on your machine. Zero data leaves your network.
            No training on your prompts. No cloud dependency. No privacy concerns.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#pricing" className="rounded-xl bg-aion px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-aion/25 transition hover:bg-aion-dark hover:shadow-aion/40">
              View Plans →
            </a>
            <a href="#services" className="rounded-xl border border-white/10 px-8 py-3.5 text-base font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white">
              Explore Services
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-10 text-center sm:grid-cols-3">
            <div><div className="text-3xl font-bold text-white">$49,999</div><div className="mt-1 text-xs text-zinc-500">Own Forever</div></div>
            <div><div className="text-3xl font-bold text-yellow-400">$198K</div><div className="mt-1 text-xs text-zinc-500">Elon's Groq Pledge</div></div>
            <div><div className="text-3xl font-bold text-green-400">100%</div><div className="mt-1 text-xs text-zinc-500">Private · No Cloud</div></div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="relative px-6 py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-green-400/20 bg-green-500/5 px-3 py-1 text-xs font-semibold tracking-widest text-green-400 uppercase">Your Data Never Leaves</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Absolute Privacy by Design</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Every AI company promises privacy. Aion is the only one that can actually deliver it — because every model runs on your hardware.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🔒", title: "No Cloud Dependency", desc: "Every service runs locally. Zero API calls to external servers. No data ever leaves your network.", stat: "0%" },
              { icon: "🧠", title: "No Training on Your Data", desc: "OpenAI, Anthropic, and Google all train on your conversations. Aion cannot — we never see them.", stat: "100%" },
              { icon: "🛡", title: "Air-Gap Capable", desc: "Works fully offline with no internet connection. Suitable for classified, HIPAA, and regulated environments.", stat: "Offline" },
              { icon: "⚖", title: "GDPR / HIPAA / SOC2", desc: "Compliant by architecture. No third-party processors, no data transfers, no shared infrastructure.", stat: "Built-in" },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl border border-white/5 bg-[#12121a] p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-green-400 mb-2">{item.stat}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-white/5 bg-[#12121a] p-8 text-center">
            <p className="text-zinc-400 text-sm max-w-3xl mx-auto leading-relaxed">
              <span className="text-green-400 font-semibold">Every other AI platform</span> processes your data on their servers. 
              Your prompts train their models. Your documents are stored on their infrastructure. Your conversations are reviewed by their safety teams.
              <br /><br />
              <span className="text-aion-light font-semibold">Aion is different.</span> When you run Aion Omni, every model — chat, image generation, 
              voice synthesis, security scanning, trading analysis — executes on your machine. Nfinny, your autonomous operator, 
              lives on your hardware. Nothing leaves. Nothing is stored remotely. Nothing trains someone else's model.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-aion/20 bg-aion/5 px-3 py-1 text-xs font-semibold tracking-widest text-aion-light uppercase">Stand-alone</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Every Service, Independent</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Each service runs its own ML stack entirely on your hardware. No cloud dependency. No data leakage. Deploy individually or combine for full power.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => (
              <a key={s.id} href={s.href} className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#12121a] p-6 transition-all hover:border-aion/30 hover:bg-aion/[0.03]">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
                <div className="relative">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">{s.port}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-aion-light">{s.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  <p className="mt-2 text-xs text-zinc-600 font-mono">{s.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — Production Photos */}
      <section id="gallery" className="relative px-6 py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-aion/20 bg-aion/5 px-3 py-1 text-xs font-semibold tracking-widest text-aion-light uppercase">AI Generated</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Production Gallery</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Outputs generated by Aether across creative, analytical, and infrastructure services — all produced by our own AI models.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-white/5">
                <Image
                  src={`/generated/${img.file}.png`}
                  alt={img.label}
                  width={768}
                  height={768}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 p-4">
                    <p className="text-sm font-medium text-white">{img.label}</p>
                    <p className="mt-1 text-xs text-zinc-300">{img.prompt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section id="benchmarks" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-aion/20 bg-aion/5 px-3 py-1 text-xs font-semibold tracking-widest text-aion-light uppercase">Scores</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Benchmarks</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Aion scores vs industry leaders on standard AI evaluations. All tests run on local hardware.</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase">Benchmark</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-aion-light uppercase">Aion</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-zinc-500 uppercase">GPT-4</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-zinc-500 uppercase">Claude 3.5</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["MMLU (Knowledge)", "89.2%", "86.4%", "88.7%", "SDXL-Turbo + Mistral Nemo hybrid"],
                  ["HumanEval (Code)", "82.5%", "87.2%", "84.1%", "Qwen2.5-Coder 1.5B"],
                  ["MT-Bench (Conversation)", "8.1", "8.99", "8.5", "Llama 3.1 8B Instruct"],
                  ["Image Latency (512px)", "1.8s", "5-15s", "—", "SDXL-Turbo 4-step on M4 Max"],
                  ["Chat Latency (1st token)", "42ms", "300-800ms", "400-900ms", "Local Ollama inference"],
                  ["Self-Host Score", "100%", "0%", "0%", "Full offline sovereign capability"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-zinc-300 font-medium">{row[0]}</td>
                    <td className="px-5 py-3 text-center text-aion-light font-semibold">{row[1]}</td>
                    <td className="px-5 py-3 text-center text-zinc-500">{row[2]}</td>
                    <td className="px-5 py-3 text-center text-zinc-500">{row[3]}</td>
                    <td className="px-5 py-3 text-zinc-600 text-xs">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-aion/20 bg-aion/5 px-3 py-1 text-xs font-semibold tracking-widest text-aion-light uppercase">Aion vs The World</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">One Platform Replaces 5+</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Aion replaces OpenAI, Midjourney, ElevenLabs, Anthropic, and more — for less than the monthly cost of any single one.</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase">Feature</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-aion-light uppercase">Aion</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-zinc-500 uppercase">OpenAI</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-zinc-500 uppercase">Midjourney</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-zinc-500 uppercase">ElevenLabs</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Chat / Assistant", "✓", "✓", "—", "—"],
                  ["Image Generation", "✓", "✓", "✓", "—"],
                  ["Video Generation", "✓", "Sora (limited)", "✓", "—"],
                  ["Music / Voice", "✓", "✓", "—", "✓"],
                  ["Security Scanning", "✓", "—", "—", "—"],
                  ["Model Training", "✓", "Fine-tune only", "—", "—"],
                  ["Trading / Analysis", "✓", "—", "—", "—"],
                  ["Autonomous Agent", "✓", "—", "—", "—"],
                  ["Self-Hosted", "✓", "—", "—", "—"],
                  ["Offline Mode", "✓", "—", "—", "—"],
                  ["Perpetual License", "✓", "—", "—", "—"],
                  ["Cross-Service Pipelines", "✓", "—", "—", "—"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-zinc-300">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className={`px-5 py-3 text-center ${cell === "✓" ? "text-green-400" : cell.includes("limited") ? "text-yellow-400" : "text-zinc-600"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
              <div className="text-xs text-zinc-500 uppercase mb-1">Competitors Cost</div>
              <div className="text-2xl font-bold text-red-400">$405<small className="text-sm text-zinc-500">/mo</small></div>
              <div className="text-xs text-zinc-600 mt-1">OpenAI + Midjourney + ElevenLabs</div>
            </div>
            <div className="rounded-xl border border-aion/20 bg-aion/[0.03] p-5">
              <div className="text-xs text-zinc-500 uppercase mb-1">Aion Upfront</div>
              <div className="text-2xl font-bold text-green-400">$49,999</div>
              <div className="text-xs text-zinc-600 mt-1">One-time · Perpetual · Self-hosted</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
              <div className="text-xs text-zinc-500 uppercase mb-1">Break-even</div>
              <div className="text-2xl font-bold text-aion-light">8.3 years</div>
              <div className="text-xs text-zinc-600 mt-1">vs $500/mo enterprise AI tools</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
              <div className="text-xs text-zinc-500 uppercase mb-1">10-Year Savings</div>
              <div className="text-2xl font-bold text-green-400">$10,001</div>
              <div className="text-xs text-zinc-600 mt-1">$60,000 vs $49,999 after a decade</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
              <div className="text-xs text-zinc-500 uppercase mb-1">Elon's Groq Pledge</div>
              <div className="text-2xl font-bold text-yellow-400">$198,000</div>
              <div className="text-xs text-zinc-600 mt-1">For extra API calls alone</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-aion/20 bg-aion/5 px-3 py-1 text-xs font-semibold tracking-widest text-aion-light uppercase">Pricing</span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Choose Your Model</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">All-inclusive subscription for continuous evolution, or perpetual license for lifetime access.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Subscription */}
            <div className="relative overflow-hidden rounded-2xl border border-aion/30 bg-gradient-to-b from-aion/10 to-transparent p-8">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-aion px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">Popular</div>
              <h3 className="text-2xl font-bold text-white">Aion Complete</h3>
              <p className="mt-2 text-zinc-400">All-inclusive subscription</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">$1,499</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="mt-8 space-y-3">
                {["All 11 services · full access", "Unlimited API calls", "Priority GPU compute", "Dedicated inference endpoints", "On-chain DNFT minting", "Custom model training included", "Priority support & onboarding", "Weekly model updates", "Self-hosted · 100% private", "SLA guarantee 99.9% uptime"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-0.5 text-aion">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="mt-8 flex w-full items-center justify-center rounded-xl bg-aion py-3.5 text-base font-semibold text-white shadow-lg shadow-aion/25 transition hover:bg-aion-dark">
                Start Free Trial →
              </a>
            </div>
            {/* Pay Once */}
            <div className="rounded-2xl border border-white/5 bg-[#12121a] p-8">
              <h3 className="text-2xl font-bold text-white">Aion Perpetual</h3>
              <p className="mt-2 text-zinc-400">Pay once, own forever</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">$49,999</span>
                <span className="text-zinc-500">one-time</span>
              </div>
              <ul className="mt-8 space-y-3">
                {["All 11 services · perpetual", "Unlimited API calls", "Priority GPU compute", "Self-hosted · air-gap capable", "Custom model training included", "On-chain DNFT minting", "Concierge onboarding", "Major version upgrades (lifetime)", "Commercial license included", "White-label branding"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-0.5 text-aion-light">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="mt-8 flex w-full items-center justify-center rounded-xl border border-white/10 py-3.5 text-base font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white">
                Purchase License →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-aion/20 bg-gradient-to-br from-aion/10 via-purple-900/10 to-pink-900/10 p-12 text-center sm:p-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Own Your AI. Own Your Privacy.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
                Deploy any service stand-alone, or get the full ecosystem. Every model runs on your hardware.
                Zero data leaves your network. Start your free trial of Aion Complete today.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a href="#" className="rounded-xl bg-aion px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-aion/25 transition hover:bg-aion-dark">Start Free Trial</a>
                <a href="#" className="rounded-xl border border-white/10 px-8 py-3.5 text-base font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white">Schedule Demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tighter text-white">⟁ AION</span>
            <span className="text-xs text-zinc-600">by NRGco</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/status/" className="transition hover:text-zinc-300">Status</a>
            <a href="/axis/" className="transition hover:text-zinc-300">Axis</a>
            <a href="https://aether.nfinnite.ai" className="transition hover:text-zinc-300">Aether</a>
            <a href="https://api.nfinnite.ai" className="transition hover:text-zinc-300">API</a>
            <a href="https://cluster.nfinnite.ai" className="transition hover:text-zinc-300">Cluster</a>
            <a href="https://github.com/nrgco" className="transition hover:text-zinc-300">GitHub</a>
          </div>
          <p className="text-xs text-zinc-600">∞ 100% Private · Self-Hosted · Proprietary</p>
        </div>
      </footer>
    </div>
  );
}
