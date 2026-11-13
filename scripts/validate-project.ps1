$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  EasyTemplate MERN Project Validation Suite" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$failed = 0

function Check-FileExists($path) {
    if (Test-Path $path) {
        Write-Host "  [OK] Found: $path" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing: $path" -ForegroundColor Red
        $script:failed++
    }
}

function Check-DirExists($path) {
    if (Test-Path $path) {
        Write-Host "  [OK] Found Directory: $path" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing Directory: $path" -ForegroundColor Red
        $script:failed++
    }
}

Write-Host "`n1. Checking Core Framework Files..." -ForegroundColor Yellow
Check-FileExists "AGENTS.md"
Check-FileExists "README.md"
Check-FileExists "HOW_TO_USE_BN.md"
Check-FileExists "HOW_TO_USE_EN.md"
Check-FileExists "PROJECT_STRUCTURE.md"
Check-FileExists "PROMPT_SHORTCUT.md"
Check-FileExists "project.config.md"

Write-Host "`n2. Checking Planning Governance (planning/)..." -ForegroundColor Yellow
Check-FileExists "planning/MEMORY.md"
Check-FileExists "planning/task.md"
Check-FileExists "planning/updateplanning.md"
Check-FileExists "planning/open-questions.md"
Check-FileExists "planning/decisions.md"
Check-DirExists "planning/tasks"

Write-Host "`n3. Checking Backend Core (backend/)..." -ForegroundColor Yellow
Check-FileExists "backend/package.json"
Check-FileExists "backend/tsconfig.json"
Check-FileExists "backend/.env"
Check-FileExists "backend/src/app.ts"
Check-FileExists "backend/src/server.ts"
Check-FileExists "backend/src/routes/index.ts"
Check-FileExists "backend/src/middlewares/globalErrorHandler.ts"
Check-FileExists "backend/src/utils/sendResponse.ts"

Write-Host "`n4. Checking Frontend Core (frontend/)..." -ForegroundColor Yellow
Check-FileExists "frontend/package.json"
Check-FileExists "frontend/tsconfig.json"
Check-FileExists "frontend/.env.local"
Check-FileExists "frontend/src/app/page.tsx"
Check-FileExists "frontend/src/app/layout.tsx"
Check-FileExists "frontend/src/app/globals.css"

Write-Host "`n5. Verifying Backend TypeScript Build..." -ForegroundColor Yellow
Push-Location "backend"
try {
    npm run build
    Write-Host "  [OK] Backend build compiled successfully with 0 errors!" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] Backend build failed." -ForegroundColor Red
    $failed++
} finally {
    Pop-Location
}

Write-Host "`n6. Verifying Frontend Next.js Build..." -ForegroundColor Yellow
Push-Location "frontend"
try {
    npm run build
    Write-Host "  [OK] Frontend build compiled successfully with 0 errors!" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] Frontend build failed." -ForegroundColor Red
    $failed++
} finally {
    Pop-Location
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($failed -eq 0) {
    Write-Host "  SUCCESS: All EasyTemplate MERN components are healthy!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "  FAILED: Encountered $failed issues. Please review above." -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 1
}
