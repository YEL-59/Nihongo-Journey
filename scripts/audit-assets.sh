#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "  EasyTemplate Image Asset & Fidelity Audit"
echo "=========================================================="

IMAGES_DIR="frontend/public/images"
SRC_DIR="frontend/src"

echo ""
echo "1. Inspecting Local Visual Assets ($IMAGES_DIR)..."
if [ -d "$IMAGES_DIR" ]; then
  COUNT=$(find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" \) 2>/dev/null | wc -l)
  echo "  [OK] Found $COUNT visual assets in $IMAGES_DIR"
else
  mkdir -p "$IMAGES_DIR"
  echo "  [INFO] Created directory: $IMAGES_DIR"
fi

echo ""
echo "2. Scanning Frontend Code for Dummy/Broken Placeholders..."
PLACEHOLDERS=$(grep -rnE "(placeholder\.com|via\.placeholder|dummyimage\.com|picsum\.photos)" "$SRC_DIR" 2>/dev/null || true)

if [ -n "$PLACEHOLDERS" ]; then
  echo "  [!] Potential placeholders found:"
  echo "$PLACEHOLDERS"
else
  echo "  [OK] Zero dummy placeholders detected in frontend components!"
fi

echo ""
echo "=========================================================="
echo "  Visual asset audit complete."
echo "=========================================================="
