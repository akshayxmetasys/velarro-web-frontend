$null = [Console]::In.ReadToEnd()
$logFile = ".cursor\hooks\velarro-agent-hooks.log"

$branch = git branch --show-current 2>$null
$statusLines = git status --short 2>$null
$status = if ($statusLines) { $statusLines -join " | " } else { "clean" }

Add-Content $logFile ("{0} SESSION_START branch={1} status={2}" -f (Get-Date -Format s), $branch, $status)

"{}"
exit 0