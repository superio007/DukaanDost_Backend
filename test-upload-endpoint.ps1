# Test script for file upload endpoint
Write-Host "=== File Upload Endpoint Test ===" -ForegroundColor Cyan

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

# Step 2: Create test files
Write-Host ""
Write-Host "2. Creating test files..." -ForegroundColor Yellow
"Test file content" | Out-File -FilePath "test-file.txt" -Encoding utf8
Write-Host "Test files created" -ForegroundColor Green

# Step 3: Test single file upload
Write-Host ""
Write-Host "3. Testing single file upload..." -ForegroundColor Yellow
$result = curl.exe -X POST http://localhost:5000/api/upload -H "Authorization: Bearer $token" -F "files=@test-file.txt" -s | ConvertFrom-Json
if ($result.success) {
    Write-Host "Single file upload successful" -ForegroundColor Green
    Write-Host "URL: $($result.data[0])" -ForegroundColor Gray
}

# Step 4: Test no files
Write-Host ""
Write-Host "4. Testing upload without files..." -ForegroundColor Yellow
$result = curl.exe -X POST http://localhost:5000/api/upload -H "Authorization: Bearer $token" -s | ConvertFrom-Json
if (!$result.success) {
    Write-Host "Correctly rejected request without files" -ForegroundColor Green
}

# Cleanup
Write-Host ""
Write-Host "5. Cleaning up..." -ForegroundColor Yellow
Remove-Item test-file.txt -ErrorAction SilentlyContinue
Write-Host "Cleanup complete" -ForegroundColor Green
Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan
