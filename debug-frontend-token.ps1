# Debug script to decode and verify a JWT token
param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

Write-Host "`n=== JWT Token Debugger ===" -ForegroundColor Cyan

# Remove "Bearer " prefix if present
$Token = $Token -replace "^Bearer\s+", ""

Write-Host "`nToken (first 50 chars): $($Token.Substring(0, [Math]::Min(50, $Token.Length)))..." -ForegroundColor Gray

try {
    # Split token into parts
    $tokenParts = $Token.Split('.')
    
    if ($tokenParts.Length -ne 3) {
        Write-Host "ERROR: Invalid JWT token format. Expected 3 parts, got $($tokenParts.Length)" -ForegroundColor Red
        exit 1
    }
    
    # Decode header
    Write-Host "`n--- Token Header ---" -ForegroundColor Yellow
    $header = $tokenParts[0]
    while ($header.Length % 4 -ne 0) { $header += "=" }
    $headerBytes = [System.Convert]::FromBase64String($header)
    $headerJson = [System.Text.Encoding]::UTF8.GetString($headerBytes)
    $headerData = $headerJson | ConvertFrom-Json
    Write-Host ($headerData | ConvertTo-Json) -ForegroundColor Gray
    
    # Decode payload
    Write-Host "`n--- Token Payload ---" -ForegroundColor Yellow
    $payload = $tokenParts[1]
    while ($payload.Length % 4 -ne 0) { $payload += "=" }
    $payloadBytes = [System.Convert]::FromBase64String($payload)
    $payloadJson = [System.Text.Encoding]::UTF8.GetString($payloadBytes)
    $tokenData = $payloadJson | ConvertFrom-Json
    
    Write-Host "User ID:  $($tokenData.userId)" -ForegroundColor White
    Write-Host "Email:    $($tokenData.email)" -ForegroundColor White
    Write-Host "Role:     $($tokenData.role)" -ForegroundColor $(if ($tokenData.role -eq "SAMPLING_HEAD") { "Green" } else { "Red" })
    
    # Check expiration
    if ($tokenData.exp) {
        $expDate = [DateTimeOffset]::FromUnixTimeSeconds($tokenData.exp).LocalDateTime
        $now = Get-Date
        $isExpired = $expDate -lt $now
        
        Write-Host "`nIssued:   $(if ($tokenData.iat) { [DateTimeOffset]::FromUnixTimeSeconds($tokenData.iat).LocalDateTime } else { 'N/A' })" -ForegroundColor Gray
        Write-Host "Expires:  $expDate" -ForegroundColor $(if ($isExpired) { "Red" } else { "Green" })
        Write-Host "Status:   $(if ($isExpired) { 'EXPIRED' } else { 'Valid' })" -ForegroundColor $(if ($isExpired) { "Red" } else { "Green" })
        
        if ($isExpired) {
            Write-Host "`nERROR: This token has expired! You need to login again." -ForegroundColor Red
        }
    }
    
    # Check role
    Write-Host "`n--- Role Check ---" -ForegroundColor Yellow
    if ($tokenData.role -eq "SAMPLING_HEAD") {
        Write-Host "✓ User has SAMPLING_HEAD role - should be able to update status" -ForegroundColor Green
    } elseif ($tokenData.role -eq "ADMIN") {
        Write-Host "✓ User has ADMIN role - should be able to update status" -ForegroundColor Green
    } else {
        Write-Host "✗ User has $($tokenData.role) role - CANNOT update status" -ForegroundColor Red
        Write-Host "  Only SAMPLING_HEAD and ADMIN roles can update item status" -ForegroundColor Yellow
    }
    
    Write-Host "`n--- Full Payload ---" -ForegroundColor Yellow
    Write-Host ($tokenData | ConvertTo-Json) -ForegroundColor Gray
    
} catch {
    Write-Host "`nERROR: Failed to decode token" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host "`n=== End of Token Analysis ===" -ForegroundColor Cyan
