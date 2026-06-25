# Aion System Policy

## 1. Core Principles

```
SECURITY FIRST  →  TEST BEFORE DEPLOY  →  SELF-HEALING  →  NEVER OFFLINE
```

Every service, agent, and deployment must satisfy these four guards:

### Guard 1: Security
- No secrets in code, env files `chmod 600`, `.gitignore` all `.env`
- All changes reviewed for exposed credentials before commit
- API tokens scoped to minimum required permissions
- 3x daily automated security audit (see §5)

### Guard 2: Test Before Deploy
- No change reaches production without verification
- Staging mirrors production exactly
- Health checks must pass before traffic is routed
- Rollback plan exists for every deployment

### Guard 3: Self-Healing
- Every service has an auto-restart supervisor
- Dead services are detected within 15s and restarted
- Tunnel re-establishes automatically on failure
- System reports degrade, doesn't fail silent

### Guard 4: Never Offline
- Cloudflare Tunnel runs as launchd service (boot + crash recovery)
- Static sites served independently of dynamic services
- Health checks every 30s across all endpoints
- DNS failover paths documented

---

## 2. Staging Environment

### Staging vs Production

| Aspect | Staging | Production |
|--------|---------|------------|
| **Purpose** | Test changes before deploy | Live user-facing |
| **Port range** | `4000-4020` | `3000-3020` |
| **Database** | Supabase dev project | Supabase prod project |
| **API keys** | Test/sandbox keys | Live keys |
| **Tunnel** | Local-only (`localhost:4xxx`) | Cloudflare tunnel |
| **URL** | `http://localhost:4xxx` | `https://*.nfinnite.ai` |

### Staging Workflow
1. Develop and test locally on staging ports
2. Run health checks against staging
3. Promote to production ports
4. Verify production health checks pass
5. Monitor for 5min post-deploy

### Branch Strategy
```
main        → Production (auto-deploys via GitHub Actions)
staging/    → Pre-production testing
feature/*   → Feature branches, tested locally
```

---

## 3. Backup Strategy

### Database (Supabase)
```bash
#!/bin/bash
# /Users/nrgco/scripts/backup-db.sh — Runs daily at 3AM via launchd

BACKUP_DIR="/Users/nrgco/.local/share/nfinnite/backups"
DB_URL="postgresql://..."  # from supabase.env
DATE=$(date +%Y-%m-%d)
mkdir -p "$BACKUP_DIR"

# Full backup
pg_dump "$DB_URL" | gzip > "$BACKUP_DIR/supabase-$DATE.sql.gz"

# Keep 7 daily, 4 weekly, 3 monthly
find "$BACKUP_DIR" -name "supabase-*" -mtime +7 -delete
```

### Config Files
- `~/.cloudflared/config.yml` — Version controlled in `nfinnite-landing` repo
- `~/.config/nfinnite/*.env` — Backed up to encrypted volume
- `~/.local/share/nfinnite/` — Full directory backed up daily

### Restore Drill
Tested first of every month:
1. Restore backup to staging DB
2. Verify data integrity
3. Document any issues

---

## 4. Deployment Pipeline

### CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
on: push to main
steps:
  1. Checkout
  2. Install dependencies
  3. Run lint
  4. Run tests  (if applicable)
  5. Build
  6. Deploy to GitHub Pages / staging
  7. Run health checks
  8. Promote to production
  9. Notify on success/failure
```

### Manual Deploy (if CI unavailable)
```bash
# 1. Test
cd ~/projects/nfinnite-landing
npm run lint && npm run build

# 2. Backup current state
cp -r out out.$(date +%s).bak

# 3. Deploy
rm -rf out && npm run build
cd out && python3 -m http.server 3099 &

# 4. Verify
curl -s http://localhost:3099 | head -5
curl -s http://localhost:3099/status/
```

---

## 5. Security Audit Schedule

Runs **3 times daily** at `06:00`, `14:00`, `22:00` via launchd.

### Audit Checks
```
┌─────────────────────────────────────────────┐
│         3x Daily Security Audit             │
├─────────────────────────────────────────────┤
│ 🔐 Permission check   → env files 600?     │
│ 🔐 Git leak check     → .env committed?    │
│ 🔐 Token rotation     → age check          │
│ 🔐 Config drift       → tunnel config vs   │
│                          running services   │
│ 🔐 Port changes       → new listeners?     │
│ 🔐 Dependency audit  → npm audit           │
│ 🔐 New features       → changelog scan     │
│ 🔐 Service health     → all ports up?      │
└─────────────────────────────────────────────┘
```

### Audit Script (`/Users/nrgco/scripts/security-audit.sh`)
Reports to `~/.local/share/nfinnite/logs/audit.log` and surfaces on `/status/` page.

---

## 6. Service Mesh Architecture

### Cross-Service Health
Every service exposes `/health` returning:
```json
{ "status": "ok", "uptime": 3600, "version": "1.0.0" }
```

### Mesh Network
```
Service → localhost:PORT  →  Cloudflare Tunnel  →  Internet
    ↓                                                       
Heartbeat broadcast every 30s via shared health state
```

### Failure Propagation
```
Service A dies  →  Supervisor detects within 15s
               →  Restarts Service A
               →  Logs to audit trail
               →  Health status updates on /status/
               →  If 3 restarts fail in 1min → alert
```

---

## 7. Log Management

### Log Locations
```
~/.local/share/nfinnite/logs/
├── tunnel.log          # Cloudflare tunnel
├── tunnel.err          # Tunnel errors
├── supervisor.log      # Service supervisor
├── supervisor.err      # Supervisor errors
├── audit.log           # Security audit reports
├── aether.log          # Per-service logs
├── vortex.log
├── ...
└── backups/            # DB backups
```

### Log Rotation
Logs rotated weekly, keep 4 weeks:
```bash
logrotate --config /Users/nrgco/.local/share/nfinnite/logrotate.conf
```

---

## 8. Agent Rules (for AI agents editing this system)

```
1. NEVER write secrets to files — use env vars or reference ~/.config/nfinnite/
2. ALWAYS run `chmod 600` on any new file containing credentials
3. ALWAYS check `.gitignore` includes `.env` before committing
4. NEVER expose internal ports (3000-3020) directly to internet
5. ALWAYS add `/health` endpoint to any new service
6. ALWAYS add new services to supervisor and tunnel config
7. TEST on staging ports (4000-4020) before promoting to production ports
8. DOCUMENT any new port, subdomain, or dependency in SERVICE_REGISTRY.md
9. BACKUP before any destructive operation
10. VERIFY health checks pass after any change
```

---

## 9. Quick Reference

### Startup Sequence (full system recovery)
```bash
# 1. Launchd auto-starts (on boot):
#    - com.nfinnite.tunnel      (Cloudflare tunnel)
#    - com.nfinnite.supervisor   (Service supervisor)

# 2. Supervisor starts all services:
#    - aether :3002  vortex :3003  atom :3009
#    - warden :3007  foundry :3010 forge :3004
#    - axis :3001    api :3456

# 3. Manual (optional):
#    - ollama serve              (local LLMs)
#    - local-image-server.py     (SDXL image gen)
#    - cd nfinnite-landing/out && python3 -m http.server 3099 &
```

### Emergency Shutdown
```bash
launchctl unload ~/Library/LaunchAgents/com.nfinnite.*
pkill -f "cloudflared|node|python3 -m http.server"
```

### Verify Everything
```bash
open http://localhost:3099/status/
```
