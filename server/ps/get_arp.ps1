param (
    [string]$subnetPattern
)

$netResults = Get-NetIPConfiguration
$netResults | Where-Object { $_.IPv4Address.IPAddress -match $subnetPattern } | ForEach-Object {
    $ip = $_.IPv4Address.IPAddress
    $mac = ($_ | Get-NetAdapter).MacAddress
    $type = if (($_ | Get-NetIPInterface).Dhcp) { "dynamic" } else { "static" }

    "cur$($ip)|$($mac)|$($type)"
}

$arpResults = arp -a
$arpResults -split "`r`n" | Where-Object { $_ -match $subnetPattern } | ForEach-Object {
    $line = $_.Trim() -split "\s{2,}"
    if ($line.Length -eq 3) {
        "$($line[0])|$($line[1])|$($line[2])"
    }
}
