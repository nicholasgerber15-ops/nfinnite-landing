#!/bin/bash
# aion-deploy.sh — One-command deploy for Contabo/Hetzner
# curl -sL https://nfinnite.ai/install.sh | bash
set -e

echo "╔════════════════════════════════════════╗"
echo "║   ⟁ AION OMNI — PROVISION            ║"
echo "║   Janus + Vision + DeepSeek + Stack  ║"
echo "╚════════════════════════════════════════╝"

# ── Prerequisites ──
apt update && apt upgrade -y
apt install -y ufw curl git python3-pip 

# ── Firewall ──
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw --force enable

# Disable swap (privacy)
swapoff -a
sed -i '/swap/d' /etc/fstab

# ── Ollama + Models ──
curl -fsSL https://ollama.com/install.sh | sh
ollama pull janus:latest &
ollama pull qwen2.5-vl:7b &
wait

# ── Node.js ──
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# ── Clone Stack ──
mkdir -p /opt/aion
cd /opt/aion
git clone https://github.com/nicholasgerber15-ops/nfinnite-landing.git sales-site

# ── STT/TTS ──
pip3 install openai-whisper --break-system-packages 2>/dev/null &
pip3 install TTS --break-system-packages 2>/dev/null &
wait

# ── Cloudflare Tunnel ──
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# ── Systemd Services ──
# Sales site
cat > /etc/systemd/system/aion-sales.service << 'EOF'
[Unit]
Description=Aion Sales Site
After=network.target
[Service]
WorkingDirectory=/opt/aion/sales-site
ExecStart=/usr/bin/npx serve out -l 3099 -s
Restart=always
RestartSec=5
[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now ollama aion-sales 2>/dev/null

# ── Status ──
IP=$(curl -s ifconfig.me)
echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✅ AION OMNI — DEPLOYED             ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "  🌐 Sales:       http://$IP:3099"
echo "  🧠 Janus:       ollama run janus"
echo "  👁️  Vision:      qwen2.5-vl:7b (auto-routed)"
echo "  🎤 STT:         Whisper"
echo "  🔊 TTS:         Coqui"
echo ""
echo "  Next: cloudflared tunnel login → copy config"
echo "  Then your Mac can sleep — Aion runs here."
