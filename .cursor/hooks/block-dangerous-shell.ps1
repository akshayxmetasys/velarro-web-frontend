$ErrorActionPreference = "Stop"

$raw = [Console]::In.ReadToEnd()
$logFile = Join-Path $PSScriptRoot "velarro-agent-hooks.log"

function Write-HookLog([string]$message) {
  # Avoid PowerShell -f formatting against JSON braces.
  Add-Content -Path $logFile -Value ("{0} {1}" -f (Get-Date -Format s), $message) -Encoding utf8
}

function Get-JsonObjectText([string]$text) {
  $start = $text.IndexOf("{")
  $end = $text.LastIndexOf("}")
  if ($start -lt 0 -or $end -le $start) {
    return $null
  }
  return $text.Substring($start, $end - $start + 1)
}

$jsonText = Get-JsonObjectText $raw
if (-not $jsonText) {
  Write-HookLog "BLOCKED_DANGEROUS_SHELL reason=malformed-json"
  [Console]::Out.Write('{"permission":"deny","user_message":"Malformed before-shell hook input for dangerous-shell matcher.","agent_message":"Malformed before-shell hook input for dangerous-shell matcher."}')
  exit 0
}

try {
  $event = $jsonText | ConvertFrom-Json
} catch {
  Write-HookLog "BLOCKED_DANGEROUS_SHELL reason=json-parse-failed"
  [Console]::Out.Write('{"permission":"deny","user_message":"Malformed before-shell hook input for dangerous-shell matcher.","agent_message":"Malformed before-shell hook input for dangerous-shell matcher."}')
  exit 0
}

$command = [string]$event.command
if (-not $command) {
  Write-HookLog "BLOCKED_DANGEROUS_SHELL reason=missing-command"
  [Console]::Out.Write('{"permission":"deny","user_message":"Missing shell command for dangerous-shell matcher.","agent_message":"Missing shell command for dangerous-shell matcher."}')
  exit 0
}

Write-HookLog ("BLOCKED_DANGEROUS_SHELL command=" + ($command -replace "[\r\n]+", " "))
[Console]::Error.WriteLine("Blocked by Velarro hook: do not push to main, force-push, hard reset, or delete recursively without explicit manual approval.")
[Console]::Out.Write('{"permission":"deny","user_message":"Blocked dangerous shell pattern.","agent_message":"Blocked dangerous shell pattern (push to main, force-push, hard reset, or recursive force delete)."}')
exit 0
