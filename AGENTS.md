# Aion Infrastructure — Agent Guide

## Service Architecture

All services run on localhost ports, exposed via Cloudflare Tunnel.

```
                        ┌─────────────────────────────┐
                        │     Cloudflare DNS + Tunnel   │
                        │    *.nfinnite.ai → localhost  │
                        └──────────┬──────────────────┘
                                   │
                        ┌──────────▼──────────────────┐
                        │    cloudflared tunnel run    │
                        │  (config: ~/.cloudflared/)  │
                        └──────────┬──────────────────┘
                                   │
     ┌──────────┬──────────┬───────┴───────┬──────────┬──────────┐
     │          │          │               │          │          │
  :3002      :3003      :3009           :3001      :3456      :3099
  Aether     Vortex     Atom            Axis       Finn API   Sales Site
```

## Port Assignments

### Core Service Nodes (3000-3020)
Each runs as a standalone Node.js service:
```
3000  Axis · Polymarket   3005  Chain (Aion L1)
3001  Axis · Trading      3006  Ego (Identity L2)
3002  Aether · Creative   3007  Warden · Security
3003  Vortex · Chat       3008  (spare)
3004  Forge · Billing     3009  Atom · Mesh Network
                         3010  Foundry · Training
```

### Web Apps (5173-5176)
```
5173  app.nfinnite.ai     Main PWA
5174  www.nfinnite.ai     WWW redirect
5175  admin.nfinnite.ai   Admin panel
5176  sales.nfinnite.ai   Sales site (legacy)
```

### Support Services
```
3099  Sales site (Aion)    Next.js static export
3456  Finn API             Core Express server
8088  Main landing         nfinnite.ai root
11434 Ollama               Local LLM inference
```

## Subdomain Map

| Subdomain | Local Port | Started Via | Notes |
|-----------|-----------|-------------|-------|
| `nfinnite.ai` | `:8088` | `node landing` | Main root |
| `www` | `:5174` | `npm run dev` | WWW |
| `app` | `:5173` | `npm run dev` | PWA |
| `api` | `:3456` | `npm run dev` | Core API |
| `admin` | `:5175` | `npm run dev` | Admin |
| `sales` | `:5176` | `python3 -m http.server` | Legacy sales |
| `aion` | `:8084` | `node aion-portal` | Aion portal |
| `chat` | `:8084` | `node aion-portal` | Chat UI |
| `aether` | `:3002` | `node projects/aether` | Creative gen |
| `vortex` | `:3003` | `node projects/vortex` | Chat runtime |
| `atom` | `:3009` | `node projects/atom` | Mesh network |
| `warden` | `:3007` | `node projects/warden` | Security |
| `foundry` | `:3010` | `node projects/foundry` | Training |
| `forge` | `:3004` | `node projects/forge` | Billing/Ops |
| `axis` | `:3001` | `node projects/axis` | Trading |
| `cluster` | `:3099` | `python3 -m http.server` | GPU status |
| `chain` | `:3005` | `node` | Aion L1 |
| `ego` | `:3006` | `node` | Identity L2 |

## Cloudflare Tunnel

The tunnel runs as a single daemon routing all subdomains:

```bash
# Start tunnel
cloudflared tunnel --config ~/.cloudflared/config.yml run

# Verify tunnel status
cloudflared tunnel info 4fa310f7-faca-404d-a1fa-d746cf986e5b

# Add new DNS route (after adding to config.yml)
cloudflared tunnel route dns 4fa310f7-faca-404d-a1fa-d746cf986e5b vortex.nfinnite.ai
```

### Config file: `~/.cloudflared/config.yml`
Lists all ingress rules. Add new services here. Tunnel auto-reloads within ~30s of config change (no restart needed when using `run`).

## Database (Supabase)

**URL**: `https://nrotgjdhumcmdwudingx.supabase.co`
**Credentials**: `~/.config/nfinnite/supabase.env`

Key tables:
- `users` — Auth + profiles
- `tenants` — Multi-tenant workspaces
- `subscriptions` — Plan tiers
- `billing` — Invoices/payments
- `memories` — Conversation history
- `sessions` — Auth sessions

## Workers

Workers run on n8n (local or cloud) + Cloudflare Workers:

### n8n Workflows (local)
```
Position Monitor   every 15min  Stop-loss checks
Mission Control    every 15min  Push data → GitHub Pages
Market Analysis    9AM/4PM ET   Daily picks + TA
Price Alerts       every 4h     Watchlist prices
Earnings Watch     Sun/Wed 7PM  Earnings calendar
```

### Cloudflare Workers
```
Health Check       every 2h     Service uptime monitoring
```

## Startup Sequence

```bash
# 1. Database (already running — Supabase managed)
# 2. Local LLMs
ollama serve

# 3. Finn API
cd ~/Library/CloudStorage/OneDrive-Personal/NfinniteEngine/backend/api
npm run dev          # → :3456

# 4. Service nodes (each in its own terminal/session)
cd ~/projects/aether && npm run dev    # → :3002
cd ~/projects/vortex && npm run dev    # → :3003
cd ~/projects/atom   && npm run dev    # → :3009
cd ~/projects/warden && npm run dev    # → :3007
cd ~/projects/foundry && npm run dev   # → :3010
cd ~/projects/forge  && npm run dev    # → :3004
cd ~/projects/axis   && npm run dev    # → :3001

# 5. Sales site
cd ~/projects/nfinnite-landing
npm run build
cd out && python3 -m http.server 3099 &

# 6. Image server (optional)
python3 ~/projects/aether/engines/local-image-server.py &

# 7. Cloudflare tunnel
cloudflared tunnel --config ~/.cloudflared/config.yml run
```

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Subdomain returns 404 | Is the tunnel running? Is the ingress rule in config.yml? DNS propagated? |
| Service unreachable | Is the local service running on the correct port? `lsof -i :PORT` |
| Tunnel won't start | `cloudflared tunnel validate --config ~/.cloudflared/config.yml` |
| Images not generating | Is `local-image-server.py` running? Check `curl localhost:3458/health` |
| Data not updating | Is the n8n workflow active? Check `registry.json` last commit time |
