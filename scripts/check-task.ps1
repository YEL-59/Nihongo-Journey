param (
    [string]$TaskId = ""
)

$taskBoardFile = "planning/task.md"
$updateFile = "planning/updateplanning.md"

if (-not (Test-Path $taskBoardFile)) {
    Write-Host "Error: $taskBoardFile not found." -ForegroundColor Red
    exit 1
}

if ($TaskId -eq "") {
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  EasyTemplate Task Status Dashboard" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Cyan
    
    if (Test-Path $updateFile) {
        $activeLine = Get-Content $updateFile | Where-Object { $_ -match "\*\*Active Task\*\*:" }
        Write-Host "`n>> $activeLine" -ForegroundColor Yellow
    }
    
    Write-Host "`nTask Board Summary:" -ForegroundColor Cyan
    Get-Content $taskBoardFile | Where-Object { $_ -match '^\|\s*\[`?TASK-' } | ForEach-Object {
        Write-Host "  $_"
    }
    Write-Host "`nTip: Run .\scripts\check-task.ps1 TASK-001 to view full task details." -ForegroundColor Gray
} else {
    $specFile = "planning/tasks/$TaskId.md"
    if (Test-Path $specFile) {
        Write-Host "==========================================================" -ForegroundColor Cyan
        Write-Host "  Task Details: $TaskId" -ForegroundColor Cyan
        Write-Host "==========================================================" -ForegroundColor Cyan
        Get-Content $specFile | ForEach-Object { Write-Host $_ }
    } else {
        Write-Host "Task specification file not found: $specFile" -ForegroundColor Red
        exit 1
    }
}
