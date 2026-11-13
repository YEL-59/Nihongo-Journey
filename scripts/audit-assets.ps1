$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  EasyTemplate Image Asset & Fidelity Audit" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$projectRoot = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$projectRoot\frontend")) {
    $projectRoot = (Get-Location).Path
}

$imagesDir = Join-Path $projectRoot "frontend/public/images"
$srcDir = Join-Path $projectRoot "frontend/src"

$issues = 0

Write-Host "`n1. Inspecting Local Visual Assets (frontend/public/images)..." -ForegroundColor Yellow
if (Test-Path $imagesDir) {
    $images = Get-ChildItem -Path $imagesDir -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp|svg|gif)$" }
    if ($images.Count -gt 0) {
        Write-Host "  [OK] Found $($images.Count) visual assets across semantic subfolders:" -ForegroundColor Green
        foreach ($img in $images) {
            $relPath = $img.FullName.Substring($imagesDir.Length).TrimStart("\/")
            $sizeKb = [math]::Round($img.Length / 1KB, 1)
            Write-Host "    - $relPath ($sizeKb KB)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  [WARN] No image assets found in $imagesDir" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [INFO] Creating missing directory: $imagesDir" -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
}

Write-Host "`n2. Scanning Frontend Code for Dummy/Broken Placeholders..." -ForegroundColor Yellow
$placeholderPatterns = @(
    "placeholder\.com",
    "via\.placeholder",
    "dummyimage\.com",
    "picsum\.photos",
    "src=['\`"]{2}"
)

if (Test-Path $srcDir) {
    $codeFiles = Get-ChildItem -Path $srcDir -Recurse -File | Where-Object { $_.Extension -match "\.(tsx|jsx|ts|js)$" }
    $placeholderCount = 0
    foreach ($file in $codeFiles) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        foreach ($pattern in $placeholderPatterns) {
            if ($content -match $pattern) {
                Write-Host "  [!] Potential placeholder found in: $($file.Name) (matches $pattern)" -ForegroundColor Yellow
                $placeholderCount++
                $issues++
            }
        }
    }
    if ($placeholderCount -eq 0) {
        Write-Host "  [OK] Zero dummy placeholders detected in frontend components!" -ForegroundColor Green
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($issues -eq 0) {
    Write-Host "  SUCCESS: Visual assets are healthy with ZERO dummy placeholders!" -ForegroundColor Green
} else {
    Write-Host "  NOTICE: $issues visual asset notices found. Review above." -ForegroundColor Yellow
}
Write-Host "==========================================================" -ForegroundColor Cyan
