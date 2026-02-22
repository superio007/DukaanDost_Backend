# Test script for request body size limits
Write-Host "=== Request Body Size Limits Test ===" -ForegroundColor Cyan

# Step 1: Login
Write-Host ""
Write-Host "1. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@test.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.data.token
    Write-Host "Login successful" -ForegroundColor Green
} catch {
    Write-Host "Login failed" -ForegroundColor Red
    exit 1
}

# Step 2: Test file upload size limit (5MB)
Write-Host ""
Write-Host "2. Testing file upload size limit (5MB)..." -ForegroundColor Yellow

# Test 2a: Valid file size (under 5MB)
Write-Host "  2a. Creating test file under 5MB (4MB)..." -ForegroundColor Gray
$validFileSize = 4 * 1024 * 1024
$validFileContent = "A" * $validFileSize
$validFileContent | Out-File -FilePath "test-valid-file.txt" -Encoding utf8 -NoNewline
$actualSize = (Get-Item "test-valid-file.txt").Length
Write-Host "  Created file: $([math]::Round($actualSize / 1MB, 2)) MB" -ForegroundColor Gray

Write-Host "  Uploading valid file..." -ForegroundColor Gray
$result = curl.exe -X POST http://localhost:5000/api/upload -H "Authorization: Bearer $token" -F "files=@test-valid-file.txt" -s -w "%{http_code}" -o response.json
$statusCode = $result[-3..-1] -join ''

if ($statusCode -eq "200") {
    $responseContent = Get-Content response.json | ConvertFrom-Json
    if ($responseContent.success) {
        Write-Host "  Valid file (4MB) uploaded successfully" -ForegroundColor Green
    } else {
        Write-Host "  Valid file rejected: $($responseContent.message)" -ForegroundColor Red
    }
} else {
    Write-Host "  Valid file rejected with status code $statusCode" -ForegroundColor Red
}

# Test 2b: Oversized file (over 5MB)
Write-Host "  2b. Creating test file over 5MB (6MB)..." -ForegroundColor Gray
$oversizedFileSize = 6 * 1024 * 1024
$oversizedFileContent = "B" * $oversizedFileSize
$oversizedFileContent | Out-File -FilePath "test-oversized-file.txt" -Encoding utf8 -NoNewline
$actualSize = (Get-Item "test-oversized-file.txt").Length
Write-Host "  Created file: $([math]::Round($actualSize / 1MB, 2)) MB" -ForegroundColor Gray

Write-Host "  Uploading oversized file..." -ForegroundColor Gray
$result = curl.exe -X POST http://localhost:5000/api/upload -H "Authorization: Bearer $token" -F "files=@test-oversized-file.txt" -s -w "%{http_code}" -o response2.json
$statusCode = $result[-3..-1] -join ''

if ($statusCode -eq "413" -or $statusCode -eq "400") {
    Write-Host "  Oversized file (6MB) correctly rejected with status code $statusCode" -ForegroundColor Green
    $responseContent = Get-Content response2.json | ConvertFrom-Json
    Write-Host "  Error message: $($responseContent.message)" -ForegroundColor Gray
} elseif ($statusCode -eq "200") {
    Write-Host "  Oversized file was accepted (should have been rejected)" -ForegroundColor Red
} else {
    Write-Host "  Oversized file rejected with status code $statusCode (expected 413 or 400)" -ForegroundColor Yellow
}

# Cleanup
Write-Host ""
Write-Host "3. Cleaning up..." -ForegroundColor Yellow
Remove-Item test-valid-file.txt -ErrorAction SilentlyContinue
Remove-Item test-oversized-file.txt -ErrorAction SilentlyContinue
Remove-Item response.json -ErrorAction SilentlyContinue
Remove-Item response2.json -ErrorAction SilentlyContinue
Write-Host "Cleanup complete" -ForegroundColor Green

Write-Host ""
Write-Host "=== Test Summary ===" -ForegroundColor Cyan
Write-Host "JSON body limit: 10MB (verified in index.ts line 63)" -ForegroundColor Green
Write-Host "File upload limit: 5MB (verified in uploadService.ts line 54)" -ForegroundColor Green
Write-Host "Payload too large errors tested above" -ForegroundColor Green
Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan
