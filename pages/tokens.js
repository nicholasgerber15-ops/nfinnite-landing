import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const TOKENS = [
  {
    symbol: "FINN", name: "Finn-Chain Token", price: "$1.25", marketCap: "$187.5M",
    supply: "1B", circulating: "150M", yourBalance: "150,000,000",
    yourValue: "$187,500,000", apr: "22.0%",
    desc: "AI inference, model training staking, creative pipeline burns",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    mint: "5ShPda1tVqBKgKkqw1ucwbo9RjwfDuUimJpqbbrzXSA7",
  },
  {
    symbol: "AION", name: "Aion Chain", price: "$0.45", marketCap: "$4.5B",
    supply: "10B", circulating: "1B", yourBalance: "1,000,000,000",
    yourValue: "$450,000,000", apr: "12.5%",
    desc: "Network gas, DPoS staking, governance, DNFT minting",
    gradient: "from-indigo-500 via-green-500 to-emerald-500",
    mint: "6PPqSuoeyfQw1HQe4XTxBDDaNHp4HLJsHMBobTSfS4mg",
  },
  {
    symbol: "EGO", name: "Ego Chain", price: "$2.50", marketCap: "$1.25B",
    supply: "500M", circulating: "100M", yourBalance: "100,000,000",
    yourValue: "$250,000,000", apr: "8.5%",
    desc: "Soulbound DIDs, ZK-proof verification, guardian staking",
    gradient: "from-indigo-500 via-cyan-500 to-blue-500",
    mint: "BfPQAAx9FKMJXPNKbkeuuzKQ3wero4Q2cn9T3T1CSYPH",
  },
];

export default function Tokens() {
  const totalValue = TOKENS.reduce((s, t) => s + parseInt(t.yourValue.replace(/[$,]/g, "")), 0);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-[#0a0a0f]`}>
      <Head><title>Tokens — Aion Ecosystem</title></Head>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">⟁ AION</span>
            <span className="rounded-full bg-aion/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-aion-light uppercase">Tokens</span>
          </a>
          <div className="hidden items-center gap-8 text-sm sm:flex">
            <a href="/" className="text-zinc-400 transition hover:text-white">Home</a>
            <a href="/axis/" className="text-zinc-400 transition hover:text-white">Axis</a>
            <a href="/status/" className="text-zinc-400 transition hover:text-white">Status</a>
          </div>
        </div>
      </nav>

      <section className="pt-28 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💰</span>
            <h1 className="text-3xl font-bold text-white">Token Ecosystem</h1>
          </div>
          <p className="text-zinc-500 mb-8">Live token prices, staking pools, and portfolio value</p>

          {/* Portfolio summary */}
          <div className="rounded-2xl border border-aion/20 bg-gradient-to-br from-aion/10 to-transparent p-8 mb-10 text-center">
            <div className="text-zinc-400 text-sm mb-2">Your Portfolio Value</div>
            <div className="text-5xl font-black text-white">${(totalValue / 1e6).toFixed(0)}M</div>
            <div className="text-zinc-500 text-sm mt-2">at current token prices</div>
            <div className="mt-4 flex justify-center gap-4 text-xs text-zinc-600">
              <span>Wallet: <span className="text-zinc-400 font-mono">9Jh34Aj1j3...Lqocbo</span></span>
              <span>Network: Solana</span>
            </div>
          </div>

          {/* Token cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {TOKENS.map((t) => (
              <div key={t.symbol} className="rounded-2xl border border-white/5 bg-[#12121a] overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${t.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">{t.symbol}</div>
                      <div className="text-sm text-zinc-400">{t.name}</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xl">
                      {t.symbol === "FINN" ? "⟁" : t.symbol === "AION" ? "◈" : "🔷"}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-white">{t.price}</span>
                    <span className="text-sm text-zinc-500">{t.marketCap} MC</span>
                  </div>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between"><span className="text-zinc-500">Supply</span><span className="text-zinc-300">{t.supply} ({t.circulating} circ.)</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">Your Balance</span><span className="text-green-400 font-semibold">{t.yourBalance}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">Your Value</span><span className="text-green-400 font-semibold">{t.yourValue}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">Staking APR</span><span className="text-aion-light">{t.apr}</span></div>
                  </div>

                  <p className="text-xs text-zinc-500 mb-4">{t.desc}</p>

                  <div className="text-xs text-zinc-600 font-mono truncate">
                    Mint: {t.mint}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DEX pools */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Liquidity Pools</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-4">
                <div className="text-xs text-zinc-500 uppercase mb-1">FINN/USDC</div>
                <div className="text-lg font-bold text-white">QuickSwap</div>
                <div className="text-sm text-green-400">35.2% APR</div>
                <div className="text-xs text-zinc-600">Polygon · $24,200 liquidity</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-4">
                <div className="text-xs text-zinc-500 uppercase mb-1">FINN/ETH</div>
                <div className="text-lg font-bold text-white">Uniswap</div>
                <div className="text-sm text-green-400">22.0% APR</div>
                <div className="text-xs text-zinc-600">Ethereum · $9,800 liquidity</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#12121a] p-4">
                <div className="text-xs text-zinc-500 uppercase mb-1">AION/USDC</div>
                <div className="text-lg font-bold text-white">QuickSwap</div>
                <div className="text-sm text-green-400">28.5% APR</div>
                <div className="text-xs text-zinc-600">Polygon · $48,750 liquidity</div>
              </div>
            </div>
          </div>

          {/* Launch CTA */}
          <div className="mt-10 rounded-2xl border border-aion/20 bg-gradient-to-br from-aion/10 via-purple-900/10 to-pink-900/10 p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Launch $FINN on bags.fm</h2>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Token metadata and logos ready. Connect your wallet and deploy.</p>
            <a href="https://bags.fm/launch" className="inline-block rounded-xl bg-aion px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-aion/25 hover:bg-aion-dark">
              Launch on bags.fm →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
