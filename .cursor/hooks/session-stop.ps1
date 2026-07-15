$null = [Console]::In.ReadToEnd()
$logFile = ".cursor\hooks\velarro-agent-hooks.log"

$branch = git branch --show-current 2>$null
$statusLines = git status --short 2>$null
$status = if ($statusLines) { $statusLines -join " | " } else { "clean" }

Add-Content $logFile ("{0} SESSION_STOP branch={1} status={2} reminder=Run npm run lint, npm run test, npm run build, npm run test:e2e -- --list before claiming completion." -f (Get-Date -Format s), $branch, $status)

"{}"
exit 0