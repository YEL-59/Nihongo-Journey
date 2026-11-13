#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "  EasyTemplate MERN Project Validation Suite"
echo "=========================================================="

FAILED=0

check_file() {
  if [ -f "$1" ]; then
    echo "  [OK] Found: $1"
  else
    echo "  [FAIL] MISSING: $1"
    FAILED=$((FAILED + 1))
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo "  [OK] Found Directory: $1"
  else
    echo "  [FAIL] MISSING Directory: $1"
    FAILED=$((FAILED + 1))
  fi
}

echo ""
echo "1. Checking Core Framework Files..."
check_file "AGENTS.md"
check_file "README.md"
check_file "HOW_TO_USE_BN.md"
check_file "HOW_TO_USE_EN.md"
check_file "PROJECT_STRUCTURE.md"
check_file "PROMPT_SHORTCUT.md"
check_file "project.config.md"

echo ""
echo "2. Checking Planning Governance (planning/)..."
check_file "planning/MEMORY.md"
check_file "planning/task.md"
check_file "planning/updateplanning.md"
check_file "planning/open-questions.md"
check_file "planning/decisions.md"
check_dir "planning/tasks"

echo ""
echo "3. Checking Backend Core (backend/)..."
check_file "backend/package.json"
check_file "backend/tsconfig.json"
check_file "backend/.env"
check_file "backend/src/app.ts"
check_file "backend/src/server.ts"
check_file "backend/src/routes/index.ts"
check_file "backend/src/middlewares/globalErrorHandler.ts"
check_file "backend/src/utils/sendResponse.ts"

echo ""
echo "4. Checking Frontend Core (frontend/)..."
check_file "frontend/package.json"
check_file "frontend/tsconfig.json"
check_file "frontend/.env.local"
check_file "frontend/src/app/page.tsx"
check_file "frontend/src/app/layout.tsx"
check_file "frontend/src/app/globals.css"

echo ""
echo "5. Verifying Backend TypeScript Build..."
(cd backend && npm run build)

echo ""
echo "6. Verifying Frontend Next.js Build..."
(cd frontend && npm run build)

echo ""
echo "=========================================================="
if [ "$FAILED" -eq 0 ]; then
  echo "  SUCCESS: All EasyTemplate MERN components are healthy!"
  echo "=========================================================="
  exit 0
else
  echo "  FAILED: Encountered $FAILED issues. Please fix missing files."
  echo "=========================================================="
  exit 1
fi
