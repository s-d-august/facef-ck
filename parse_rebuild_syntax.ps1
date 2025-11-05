$t = Get-Content 'c:\Users\sincl\boydOral\rebuild.ps1' -Raw
try {
    [ScriptBlock]::Create($t) | Out-Null
    Write-Output 'PARSE_OK'
}
catch {
    Write-Output 'PARSE_ERROR'
    Write-Output $_.Exception.Message
    exit 1
}
