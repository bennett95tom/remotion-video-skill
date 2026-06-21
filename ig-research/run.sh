#!/bin/bash
# =============================================================================
# Dark D'oh Bros — Instagram Research, One-Command Runner
# Run this from inside the ig-research/ folder:
#   bash run.sh
# =============================================================================

set -e

PROJECT="dark-doh-bros"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "=============================================="
echo "  Dark D'oh Bros — Instagram Research Tool"
echo "=============================================="
echo ""

# --- Check prerequisites ---
echo "Checking prerequisites..."

if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js not found. Install from https://nodejs.org"
  exit 1
fi

NODE_VER=$(node -e "process.exit(parseInt(process.version.slice(1)) < 18 ? 1 : 0)" 2>/dev/null && echo "ok" || echo "old")
if [ "$NODE_VER" = "old" ]; then
  echo "ERROR: Node.js v18+ required. Update at https://nodejs.org"
  exit 1
fi

if ! command -v python3 &>/dev/null; then
  echo "ERROR: Python 3 not found."
  exit 1
fi

if ! command -v ffmpeg &>/dev/null; then
  echo "Installing ffmpeg..."
  if command -v brew &>/dev/null; then
    brew install ffmpeg
  elif command -v winget &>/dev/null; then
    winget install ffmpeg
  else
    echo "ERROR: Please install ffmpeg manually: https://ffmpeg.org/download.html"
    exit 1
  fi
fi

if ! python3 -m yt_dlp --version &>/dev/null 2>&1; then
  echo "Installing yt-dlp..."
  if command -v brew &>/dev/null; then
    brew install yt-dlp
  else
    pip3 install --break-system-packages yt-dlp 2>/dev/null || pip3 install yt-dlp
  fi
fi

if ! python3 -m whisper --help &>/dev/null 2>&1; then
  echo "Installing openai-whisper..."
  pip3 install --break-system-packages setuptools 2>/dev/null || true
  pip3 install --break-system-packages openai-whisper 2>/dev/null || pip3 install openai-whisper
fi

echo "All prerequisites OK."
echo ""

# --- Install npm deps if needed ---
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
  echo "Installing Node dependencies..."
  cd "$SCRIPT_DIR" && npm install
  echo ""
fi

# --- Confirm Chrome is ready ---
echo "----------------------------------------------"
echo "  BEFORE CONTINUING:"
echo ""
echo "  Make sure Chrome is open with remote debugging:"
echo "  Mac:  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222"
echo "  Win:  \"C:\Program Files\Google\Chrome\Application\chrome.exe\" --remote-debugging-port=9222"
echo ""
echo "  And you're logged into Instagram in that Chrome window."
echo "  Keep the Instagram tab VISIBLE (not minimised)."
echo "----------------------------------------------"
echo ""
read -p "Press ENTER when Chrome is ready and Instagram is logged in..."
echo ""

# --- Step 1: Scrape ---
echo "=============================================="
echo "  Step 1: Scraping Instagram posts..."
echo "=============================================="
cd "$SCRIPT_DIR"
node scripts/scrape.js "$PROJECT"

echo ""

# --- Step 2: Transcribe ---
echo "=============================================="
echo "  Step 2: Transcribing audio..."
echo "=============================================="
bash scripts/transcribe.sh "$PROJECT"

echo ""

# --- Step 3: Generate HTML report ---
echo "=============================================="
echo "  Step 3: Generating report..."
echo "=============================================="
node scripts/report-html.js "$PROJECT"

echo ""

# --- Open the report ---
REPORT="$SCRIPT_DIR/projects/$PROJECT/report.html"
echo "=============================================="
echo "  DONE! Opening your report..."
echo "  $REPORT"
echo "=============================================="
echo ""

if command -v open &>/dev/null; then
  open "$REPORT"
elif command -v xdg-open &>/dev/null; then
  xdg-open "$REPORT"
elif command -v start &>/dev/null; then
  start "$REPORT"
else
  echo "Open this file in your browser:"
  echo "  $REPORT"
fi
