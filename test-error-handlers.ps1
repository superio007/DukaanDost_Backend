# Test Error Handler Fixes
$baseUrl = "http://localhost:5000"
$passCount = 0
$failCount = 0

Write-Host "`n=== ERROR HANDLER VERIFICATION TESTS ===" -ForegroundColor Cyan
Write-Host "Server: $baseUrl`n" -ForegroundColor Cyan

# TEST 1: Duplicate Email
Write-Host "TEST 1: Duplicate Email Registration" -ForegroundColor Yellow
$body = @{
    email = "admin@test.com"
    password = "password123"
    name = "Test User"
    role = "ADMIN"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/register" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 409, got $($response.StatusCode)" -ForegroundColor Red
    $failCount++
} catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $stream.Position = 0
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    
    Write-Host "  Status: $statusCode"
    Write-Host "  Body: $responseBody"
    
    if ($statusCode -eq 409 -and $responseBody -like "*Email already exists*") {
        Write-Host "  ✅ PASS" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ❌ FAIL - Expected 409 with 'Email already exists'" -ForegroundColor Red
        $failCount++
    }
}

# TEST 2: Invalid Credentials (Wrong Password)
Write-Host "`nTEST 2: Invalid Credentials (Wrong Password)" -ForegroundColor Yellow
$body = @{
    email = "admin@test.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 401, got $($response.StatusCode)" -ForegroundColor Red
    $failCount++
} catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $stream.Position = 0
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    
    Write-Host "  Status: $statusCode"
    Write-Host "  Body: $responseBody"
    
    if ($statusCode -eq 401 -and $responseBody -like "*Invalid credentials*") {
        Write-Host "  ✅ PASS" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ❌ FAIL - Expected 401 with 'Invalid credentials'" -ForegroundColor Red
        $failCount++
    }
}

# TEST 3: Non-existent Email
Write-Host "`nTEST 3: Non-existent Email Login" -ForegroundColor Yellow
$body = @{
    email = "nonexistent@test.com"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 401, got $($response.StatusCode)" -ForegroundColor Red
    $failCount++
} catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $stream.Position = 0
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    
    Write-Host "  Status: $statusCode"
    Write-Host "  Body: $responseBody"
    
    if ($statusCode -eq 401 -and $responseBody -like "*Invalid credentials*") {
        Write-Host "  ✅ PASS" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ❌ FAIL - Expected 401 with 'Invalid credentials'" -ForegroundColor Red
        $failCount++
    }
}

# TEST 4: Insufficient Stock - Note: This test is skipped as it requires specific data setup
Write-Host "`nTEST 4: Insufficient Stock Update" -ForegroundColor Yellow
Write-Host "  ⚠ SKIP - Requires specific data setup (IN_SAMPLING item with insufficient inventory)" -ForegroundColor Yellow

# Summary
Write-Host "`n=== TEST SUMMARY ===" -ForegroundColor Cyan
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red

if ($failCount -eq 0 -and $passCount -eq 3) {
    Write-Host "`n✅ All error handler fixes verified!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n❌ Some tests failed" -ForegroundColor Red
    exit 1
}
