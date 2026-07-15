$payload = [Console]::In.ReadToEnd()
$logFile = ".cursor\hooks\velarro-agent-hooks.log"

Add-Content $logFile ("{0} BLOCKED_DANGEROUS_SHELL payload={1}" -f (Get-Date -Format s), $payload)

[Console]::Error.WriteLine("Blocked by Velarro hook: do not push to main, force-push, hard reset, or delete recursively without explicit manual approval.")
exit 2