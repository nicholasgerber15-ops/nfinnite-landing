#!/bin/bash
# Aion Omni — One-Click Installer
# curl -fsSL https://nfinnite.ai/install.sh | bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "  ╔═══════════════════════════════════════╗"
echo "  ║       ⟁  AION OMNI  INSTALLER        ║"
echo "  ║   One ecosystem. All your AI tools.   ║"
echo "  ╚═══════════════════════════════════════╝"
echo -e "${NC}"

# ── Check prerequisites ──
echo -e "${CYAN}🔍 Checking prerequisites...${NC}"

command -v node >/dev/null 2>&1 || { echo -e "${RED}✗ Node.js required. Install: brew install node${NC}"; exit 1; }
echo -e "  ✓ Node.js $(node --version)"

command -v npm >/dev/null 2>&1 || { echo -e "${RED}✗ npm required${NC}"; exit 1; }
echo -e "  ✓ npm $(npm --version)"

command -v git >/dev/null 2>&1 || { echo -e "${RED}✗ git required. Install: brew install git${NC}"; exit 1; }
echo -e "  ✓ git $(git --version)"

if command -v python3 >/dev/null 2>&1; then
  echo -e "  ✓ Python $(python3 --version)"
fi

if command -v ollama >/dev/null 2>&1; then
  echo -e "  ✓ Ollama (local LLMs available)"
fi

# ── Clone repos ──
echo ""
echo -e "${CYAN}📦 Downloading Aion Omni...${NC}"

INSTALL_DIR="$HOME/aion-omni"
if [ -d "$INSTALL_DIR" ]; then
  echo -e "  ⚠️  $INSTALL_DIR already exists. Updating..."
  cd "$INSTALL_DIR" && git pull 2>/dev/null || true
else
  git clone --depth 1 https://github.com/nicholasgerber15-ops/nfinnite-landing.git "$INSTALL_DIR" 2>/dev/null || {
    echo -e "${RED}✗ Could not clone repository. Check internet connection.${NC}"
    exit 1
  }
fi

echo -e "  ✓ Downloaded to $INSTALL_DIR"

# ── Install dependencies ──
echo ""
echo -e "${CYAN}📦 Installing dependencies...${NC}"
cd "$INSTALL_DIR"
npm install --production 2>/dev/null && echo -e "  ✓ Dependencies installed"

# ── Pull default LLM model ──
echo ""
echo -e "${CYAN}🧠 Pulling default AI model (background)...${NC}"
if command -v ollama >/dev/null 2>&1; then
  ollama pull llama3.1:8b 2>/dev/null & 
  echo -e "  ✓ Started download of llama3.1:8b (~4.9GB)"
else
  echo -e "  ⚠️  Ollama not found. Install: brew install ollama"
  echo -e "     Then run: ollama pull llama3.1:8b"
fi

# ── Build ──
echo ""
echo -e "${CYAN}🔨 Building Aion Omni...${NC}"
npm run build 2>/dev/null && echo -e "  ✓ Build complete"

# ── Setup launchd auto-start (macOS) ──
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo ""
  echo -e "${CYAN}⚙️  Installing auto-start service...${NC}"
  PLIST="$HOME/Library/LaunchAgents/com.aion.omni.plist"
  cat > "$PLIST" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.aion.omni</string>
  <key>ProgramArguments</key>
  <array>
    <string>$(which node)</string>
    <string>$(which npm)</string>
    <string>run</string>
    <string>dev</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$INSTALL_DIR</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
EOF
  launchctl load "$PLIST" 2>/dev/null && echo -e "  ✓ Auto-start installed"
fi

# ── Done ──
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ AION OMNI INSTALLED           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
echo -e "  📁  Location:  ${CYAN}$INSTALL_DIR${NC}"
echo -e "  🌐  Dashboard: ${CYAN}http://localhost:3099${NC}"
echo -e "  📖  Docs:      ${CYAN}https://nfinnite.ai/docs${NC}"
echo ""
echo -e "  ${CYAN}Quick start:${NC}"
echo -e "    cd $INSTALL_DIR && npm run dev"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo -e "    1. Open http://localhost:3099"
echo -e "    2. Complete the onboarding wizard"
echo -e "    3. Connect your services"
echo -e "    4. Deploy Nfinny for autonomous operation"
echo ""
