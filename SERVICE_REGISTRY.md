# Aion Service Registry

## Infrastructure Overview

| Layer | Provider | Detail |
|-------|----------|--------|
| **DNS** | Cloudflare | Zone: `nfinnite.ai` (Zone ID: `587cc89aee71a8d078d13f5e2b28170a`) |
| **Tunnel** | Cloudflare Tunnel | Tunnel ID: `4fa310f7-faca-404d-a1fa-d746cf986e5b` |
| **Database** | Supabase | URL: `https://nrotgjdhumcmdwudingx.supabase.co` |
| **Payments** | Stripe | Live keys configured |
| **AI** | Groq (free) / Local (Ollama) | Models: llama3.1:8b, qwen2.5-coder:1.5b |
| **Hosting** | GitHub Pages / Local | Sales site exported to `out/` |

---

## Services & Subdomains

| Service | Subdomain | Port | Project Path | Status |
|---------|-----------|------|-------------|--------|
| **Aether** | `aether.nfinnite.ai` | `:3002` | `/Users/nrgco/projects/aether` | ✅ Configured |
| **Vortex** | `vortex.nfinnite.ai` | `:3003` | `/Users/nrgco/projects/vortex` | ⚡ Need tunnel |
| **Atom** | `atom.nfinnite.ai` | `:3009` | `/Users/nrgco/projects/atom` | ⚡ Need tunnel |
| **Warden** | `warden.nfinnite.ai` | `:3007` | `/Users/nrgco/projects/warden` | ⚡ Need tunnel |
| **Foundry** | `foundry.nfinnite.ai` | `:3010` | `/Users/nrgco/projects/foundry` | ⚡ Need tunnel |
| **Forge** | `forge.nfinnite.ai` | `:3004` | `/Users/nrgco/projects/forge` | ⚡ Need tunnel |
| **Axis** | `axis.nfinnite.ai` | `:3001` | `/Users/nrgco/projects/axis` | ⚡ Need tunnel |
| **Cluster** | `cluster.nfinnite.ai` | `:8000-:8020` | GPU nodes | ✅ Configured |
| **Aion Chain** | `chain.nfinnite.ai` | L1 | Blockchain | ⚡ Need tunnel |
| **Ego Chain** | `ego.nfinnite.ai` | L2 | Identity | ⚡ Need tunnel |

### Existing Ingress Rules (Cloudflare Tunnel)

| Hostname | Local Service | Purpose |
|----------|-------------|---------|
| `nfinnite.ai` | `127.0.0.1:8088` | Main landing page |
| `www.nfinnite.ai` | `127.0.0.1:5174` | WWW redirect |
| `app.nfinnite.ai` | `127.0.0.1:5173` | Main PWA app |
| `api.nfinnite.ai` | `127.0.0.1:3456` | Core API (Finn engine) |
| `admin.nfinnite.ai` | `127.0.0.1:5175` | Admin panel |
| `sales.nfinnite.ai` | `127.0.0.1:5176` | Sales site |
| `aion.nfinnite.ai` | `127.0.0.1:8084` | Aion portal |
| `chat.nfinnite.ai` | `127.0.0.1:8084` | Chat interface |
| `aether.nfinnite.ai` | `127.0.0.1:3002` | Creative generation |
| `cluster.nfinnite.ai` | `127.0.0.1:3099` | GPU cluster status |

---

## Engine Port Map

| Port | Service | Currently Running |
|------|---------|-------------------|
| `3000` | Axis — Polymarket | ✅ |
| `3001` | Axis — Trading Core | ✅ |
| `3002` | Aether — Creative Gen | ✅ |
| `3003` | Vortex — Chat Runtime | ✅ |
| `3004` | Forge — Billing/Ops | ✅ |
| `3005` | (spare) | ✅ |
| `3006` | (spare) | ✅ |
| `3007` | Warden — Security | ✅ |
| `3008` | (spare) | ✅ |
| `3009` | Atom — Mesh Network | ✅ |
| `3010` | Foundry — Training | ✅ |
| `3011-3021` | (spare cluster) | ✅ |
| `3456` | Finn API Server | node PID 79899 |
| `3457` | Finn API (vat-control) | node PID 79899 |
| `3458` | Local Image Gen (SDXL) | ⚡ manual |
| `8088` | Main landing | ⚡ |
| `3099` | Aion sales site | ✅ (Python static) |
| `5173` | PWA app | ✅ |
| `5174` | WWW | ✅ |
| `5175` | Admin panel | ✅ |
| `11434` | Ollama (local LLMs) | ✅ |

---

## Database (Supabase)

- **URL**: `https://nrotgjdhumcmdwudingx.supabase.co`
- **Region**: US East
- **Tier**: Free (500MB DB, 2GB bandwidth)
- **Tables**: users, tenants, subscriptions, billing, memories, sessions

### Connection
```
SUPABASE_URL=https://nrotgjdhumcmdwudingx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_6IclsE6IuN5a-jvGbAk_tA_f6J5PHUg
SUPABASE_SERVICE_KEY=<from .config/nfinnite/supabase.env>
SUPABASE_JWKS_URL=https://nrotgjdhumcmdwudingx.supabase.co/auth/v1/.well-known/jwks.json
```

---

## Workers

| Worker | Runtime | Schedule | Purpose |
|--------|---------|----------|---------|
| **Health Check** | Cloudflare Workers | Every 2h | Monitor service uptime |
| **Price Alerts** | n8n | Every 4h | Watchlist price notifications |
| **Position Monitor** | n8n | Every 15min | Stop-loss watch |
| **Mission Control Push** | n8n | Every 15min | Push JSON → GitHub Pages |
| **Market Analysis** | n8n | 9AM/4PM ET | Daily picks + TA briefs |
| **Earnings Watch** | n8n | Sun/Wed 7PM | Earnings calendar |

---

## Key Files & Paths

| Resource | Path |
|----------|------|
| **Cloudflare config** | `/Users/nrgco/.cloudflared/config.yml` |
| **Tunnel credentials** | `/Users/nrgco/.cloudflared/4fa310f7-faca-404d-a1fa-d746cf986e5b.json` |
| **Cloudflare env** | `/Users/nrgco/.config/nfinnite/cloudflare.env` |
| **Supabase env** | `/Users/nrgco/.config/nfinnite/supabase.env` |
| **Stripe env** | `/Users/nrgco/.config/nfinnite/stripe.env` |
| **Groq env** | `/Users/nrgco/.config/nfinnite/groq.env` |
| **Sales site** | `/Users/nrgco/projects/nfinnite-landing` |
| **Static export** | `/Users/nrgco/projects/nfinnite-landing/out` |
| **Generated images** | `/Users/nrgco/projects/nfinnite-landing/public/generated` |
| **Local image server** | `/Users/nrgco/projects/aether/engines/local-image-server.py` |
| **Finn engine (OneDrive)** | `/Users/nrgco/Library/CloudStorage/OneDrive-Personal/NfinniteEngine` |

---

## Startup Commands

### Sales Site (Aion landing page)
```bash
cd /Users/nrgco/projects/nfinnite-landing
npm run build          # rebuild static export
cd out && python3 -m http.server 3099 &   # serve
```

### Local Image Generation
```bash
python3 /Users/nrgco/projects/aether/engines/local-image-server.py
# Listens on :3458, generates SDXL-Turbo via CPU
```

### Cloudflare Tunnel
```bash
cloudflared tunnel --config /Users/nrgco/.cloudflared/config.yml run
```

### Finn API Server
```bash
cd /Users/nrgco/Library/CloudStorage/OneDrive-Personal/NfinniteEngine/backend/api
npm run dev
```

### Ollama (local LLMs)
```bash
ollama serve
# Models: llama3.1:8b, qwen2.5-coder:1.5b
```
