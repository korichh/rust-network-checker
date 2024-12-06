$arpResults = arp -a | Out-String
$arpResults -split "`r`n" | Where-Object { $_ -match "192\.168\.0" } | ForEach-Object {
    $line = $_.Trim() -split "\s{2,}"
    if ($line.Length -eq 3) {
        "$($line[0])|$($line[1])|$($line[2])"
    }
} | Out-String