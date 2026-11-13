param (
    [string]$TargetPath = ""
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  EasyTemplate -> Existing Project Sync Utility" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if ([string]::IsNullOrWhiteSpace($TargetPath)) {
    $TargetPath = Read-Host "Enter the absolute path of your target project (e.g. C:\Users\Tofayel\Desktop\door)"
}

if (-not (Test-Path $TargetPath)) {
    Write-Host "Error: Target directory does not exist: $TargetPath" -ForegroundColor Red
    exit 1
}

$sourceDir = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$sourceDir\AGENTS.md")) {
    $sourceDir = (Get-Location).Path
}

Write-Host "`nSource Template : $sourceDir" -ForegroundColor Gray
Write-Host "Target Project  : $TargetPath`n" -ForegroundColor Gray

# 1. Sync Core Framework Documentation & Protocols
$coreFiles = @(
    "settings.json",
    "PROJECT_STATUS.md",
    "AGENTS.md",
    "HOW_TO_USE_BN.md",
    "HOW_TO_USE_EN.md",
    "PROJECT_STRUCTURE.md",
    "PROMPT_SHORTCUT.md"
)

Write-Host "1. Syncing Core Protocols, Settings & Guides..." -ForegroundColor Yellow
foreach ($file in $coreFiles) {
    $src = Join-Path $sourceDir $file
    $dst = Join-Path $TargetPath $file
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Force
        Write-Host "  [+] Synced: $file" -ForegroundColor Green
    }
}

# 2. Sync project.config.md (do not overwrite if already exists)
$configDst = Join-Path $TargetPath "project.config.md"
if (-not (Test-Path $configDst)) {
    Copy-Item -Path (Join-Path $sourceDir "project.config.md") -Destination $configDst -Force
    Write-Host "  [+] Created: project.config.md" -ForegroundColor Green
} else {
    Write-Host "  [i] Preserved existing: project.config.md" -ForegroundColor Cyan
}

# 3. Sync Scripts Folder
Write-Host "`n2. Syncing scripts/ Automation Suite..." -ForegroundColor Yellow
$targetScripts = Join-Path $TargetPath "scripts"
if (-not (Test-Path $targetScripts)) {
    New-Item -ItemType Directory -Path $targetScripts | Out-Null
}
Get-ChildItem -Path (Join-Path $sourceDir "scripts") | ForEach-Object {
    $dst = Join-Path $targetScripts $_.Name
    Copy-Item -Path $_.FullName -Destination $dst -Force
    Write-Host "  [+] Synced script: scripts/$($_.Name)" -ForegroundColor Green
}

# 4. Sync Planning Governance Directory
Write-Host "`n3. Syncing planning/ Governance Structure..." -ForegroundColor Yellow
$targetPlanning = Join-Path $TargetPath "planning"
$targetTasks = Join-Path $targetPlanning "tasks"
if (-not (Test-Path $targetTasks)) {
    New-Item -ItemType Directory -Path $targetTasks -Force | Out-Null
}

$planningFiles = @("task.md", "updateplanning.md", "open-questions.md", "decisions.md", "MEMORY.md")
foreach ($pFile in $planningFiles) {
    $src = Join-Path (Join-Path $sourceDir "planning") $pFile
    $dst = Join-Path $targetPlanning $pFile
    if (-not (Test-Path $dst)) {
        if (Test-Path $src) {
            Copy-Item -Path $src -Destination $dst -Force
            Write-Host "  [+] Initialized: planning/$pFile" -ForegroundColor Green
        }
    } else {
        Write-Host "  [i] Preserved existing: planning/$pFile" -ForegroundColor Cyan
    }
}

# Sync sample tasks if planning/tasks/ is empty in target
$existingTasks = Get-ChildItem -Path $targetTasks -Filter "TASK-*.md"
if ($existingTasks.Count -eq 0) {
    Get-ChildItem -Path (Join-Path (Join-Path $sourceDir "planning") "tasks") -Filter "TASK-*.md" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination (Join-Path $targetTasks $_.Name) -Force
        Write-Host "  [+] Seeded task: planning/tasks/$($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  [i] Target project already has $($existingTasks.Count) tasks in planning/tasks/. Preserved." -ForegroundColor Cyan
}

# 5. Ensure inputs/ structure exists & sync update templates
Write-Host "`n4. Verifying inputs/ Dropzone..." -ForegroundColor Yellow
$targetInputs = Join-Path $TargetPath "inputs"
$modDirs = @(
    "client_docs",
    "screenshots",
    "modifications\update_notes",
    "modifications\telegram_chats",
    "modifications\screenshots\ui_tweaks",
    "modifications\screenshots\new_sections",
    "modifications\screenshots\bug_fixes"
)

foreach ($sub in $modDirs) {
    $fullPath = Join-Path $targetInputs $sub
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "  [+] Created directory: inputs/$sub" -ForegroundColor Green
    }
}

$inputTemplates = @(
    @{ Src = "inputs/references.md"; Dst = "inputs/references.md" },
    @{ Src = "inputs/client_docs/requirements.md"; Dst = "inputs/client_docs/requirements.md" },
    @{ Src = "inputs/client_docs/telegram_chat.txt"; Dst = "inputs/client_docs/telegram_chat.txt" },
    @{ Src = "inputs/client_docs/updates.md"; Dst = "inputs/client_docs/updates.md" },
    @{ Src = "inputs/modifications/README.md"; Dst = "inputs/modifications/README.md" },
    @{ Src = "inputs/modifications/update_notes/updates.md"; Dst = "inputs/modifications/update_notes/updates.md" },
    @{ Src = "inputs/modifications/update_notes/README.md"; Dst = "inputs/modifications/update_notes/README.md" },
    @{ Src = "inputs/modifications/telegram_chats/telegram_chat.txt"; Dst = "inputs/modifications/telegram_chats/telegram_chat.txt" },
    @{ Src = "inputs/modifications/telegram_chats/README.md"; Dst = "inputs/modifications/telegram_chats/README.md" },
    @{ Src = "inputs/modifications/screenshots/README.md"; Dst = "inputs/modifications/screenshots/README.md" }
)
foreach ($item in $inputTemplates) {
    $s = Join-Path $sourceDir $item.Src
    $d = Join-Path $TargetPath $item.Dst
    if (-not (Test-Path $d) -and (Test-Path $s)) {
        Copy-Item -Path $s -Destination $d -Force
        Write-Host "  [+] Initialized template: $($item.Dst)" -ForegroundColor Green
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  SUCCESS: EasyTemplate framework synced to:" -ForegroundColor Green
Write-Host "  $TargetPath" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Next step in your project:" -ForegroundColor Yellow
Write-Host "  1. Run 'npm run settings' or node scripts/settings.js to pick Language (EN/BN)" -ForegroundColor Gray
Write-Host "  2. Use PROMPT_SHORTCUT.md to plan and execute tasks with zero regressions!`n" -ForegroundColor Gray
