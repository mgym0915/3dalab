$ErrorActionPreference = 'Stop'
$taskRoot = $PSScriptRoot
$taskStatePath = Join-Path $taskRoot 'runtime/running.json'
if (-not (Test-Path -LiteralPath $taskStatePath)) { Write-Host '3DAlab is already stopped.'; exit }
Set-Content -LiteralPath (Join-Path $taskRoot 'runtime/stop.flag') -Value 'stop'
for ($taskAttempt = 0; $taskAttempt -lt 30; $taskAttempt++) {
    if (-not (Test-Path -LiteralPath $taskStatePath)) { Write-Host '3DAlab stopped.'; exit }
    Start-Sleep -Milliseconds 400
}
Write-Host 'Stop signal sent. Check logs/launcher.log if needed.'
