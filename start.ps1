param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$taskRoot = $PSScriptRoot
$taskStatePath = Join-Path $taskRoot 'runtime/running.json'
$taskRunning = $false
if (Test-Path -LiteralPath $taskStatePath) {
    try {
        $taskState = Get-Content -LiteralPath $taskStatePath -Raw | ConvertFrom-Json
        $taskProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($taskState.supervisor)"
        $taskRunning = $taskProcess -and $taskProcess.ExecutablePath -eq (Join-Path $taskRoot 'runtime/node.exe') -and $taskProcess.CommandLine.Contains('supervisor.mjs')
    } catch { }
}
if (-not $taskRunning) {
    $taskListening = Get-NetTCPConnection -LocalPort 18765 -State Listen -ErrorAction SilentlyContinue
    if ($taskListening) { throw 'Port 18765 is already in use. Close the previous website first.' }
    Start-Process -FilePath (Join-Path $taskRoot 'runtime/node.exe') -ArgumentList @('--no-warnings', ('"' + (Join-Path $taskRoot 'supervisor.mjs') + '"')) -WorkingDirectory $taskRoot -WindowStyle Hidden
}
$taskReady = $false
for ($taskAttempt = 0; $taskAttempt -lt 25; $taskAttempt++) {
    try {
        $taskHealth = Invoke-RestMethod -Uri 'http://127.0.0.1:18765/api/health' -TimeoutSec 2
        $taskAdminHealth = Invoke-RestMethod -Uri 'http://127.0.0.1:18768/console/health' -TimeoutSec 2
        if ($taskHealth.app -eq '3DAlab' -and $taskAdminHealth.app -eq '3DAlab Admin') { $taskReady = $true; break }
    } catch { }
    Start-Sleep -Milliseconds 400
}
if (-not $taskReady) { throw 'Website did not start. Please inspect the logs folder.' }
if (-not $NoBrowser) { Start-Process 'http://127.0.0.1:18768/console/' }
Write-Host '3DAlab is running. Public URL: https://yongdian3d.asia'
Write-Host 'Keep this computer on and connected to the Internet.'
