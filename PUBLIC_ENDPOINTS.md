# Public-Facing Endpoints

All routed through Cloudflare Tunnel → `nfinnite.ai`

## 🌐 Web Apps

| URL | Local Port | Purpose | Status |
|-----|-----------|---------|--------|
| `https://nfinnite.ai` | `:8088` | Main landing page | ✅ |
| `https://www.nfinnite.ai` | `:5174` | WWW redirect | ✅ |
| `https://app.nfinnite.ai` | `:5173` | Main PWA application | ✅ |
| `https://admin.nfinnite.ai` | `:5175` | Admin panel | ✅ |
| `https://sales.nfinnite.ai` | `:5176` | Sales site (legacy) | ✅ |
| `https://aion.nfinnite.ai` | `:8084` | Aion portal | ✅ |
| `https://chat.nfinnite.ai` | `:8084` | Chat interface | ✅ |

## ⚙️ Service Nodes

| URL | Local Port | Service | Status |
|-----|-----------|---------|--------|
| `https://api.nfinnite.ai` | `:3456` | Core Finn API (Express) | ✅ |
| `https://aether.nfinnite.ai` | `:3002` | Creative generation engine | ✅ |
| `https://vortex.nfinnite.ai` | `:3003` | Chat & gaming runtime | ✅ |
| `https://atom.nfinnite.ai` | `:3009` | Mesh networking layer | ✅ |
| `https://warden.nfinnite.ai` | `:3007` | Cybersecurity & threat analysis | ✅ |
| `https://foundry.nfinnite.ai` | `:3010` | Model training & fusion | ✅ |
| `https://forge.nfinnite.ai` | `:3004` | Billing, ops & compliance | ✅ |
| `https://axis.nfinnite.ai` | `:3001` | Trading & risk platform | ✅ |
| `https://cluster.nfinnite.ai` | `:3099` | GPU inference cluster | ✅ |

## 🔗 Blockchain Layer

| URL | Local Port | Service | Status |
|-----|-----------|---------|--------|
| `https://chain.nfinnite.ai` | `:3005` | Aion Chain L1 | ✅ |
| `https://ego.nfinnite.ai` | `:3006` | Ego Chain L2 identity | ✅ |

## 🧠 Internal (Not Public)

| Service | Port | Notes |
|---------|------|-------|
| Ollama (local LLMs) | `:11434` | Local only — not tunneled |
| SDXL Image Server | `:3458` | Manual start, no tunnel |
| Supabase (managed) | — | Cloud hosted, direct SDK |
| Stripe (managed) | — | Cloud hosted, API-only |
| n8n workflows | — | Internal automation |

## DNS Records Needed

Subdomains already in tunnel config but need Cloudflare DNS records:

```bash
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b vortex.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b atom.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b warden.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b foundry.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b forge.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b axis.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b chain.nfinnite.ai
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b ego.nfinnite.ai
```
