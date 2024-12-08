param (
    [string]$ip
)

ping -n 1 -w 1 -l 1 -i 1 $ip
