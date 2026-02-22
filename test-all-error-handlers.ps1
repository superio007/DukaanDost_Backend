# Comprehensive Error Handler Verification Tests
$baseUrl = "http://localhost:5000"
$passCount = 0
$failCount = 0

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "ERROR HANDLER VERIFICATION TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Server: $baseUrl`n" -ForegroundColor Cyan

# TEST 1: Duplicate Email (409)
Write-Host "TEST 1: Duplicate Email Registration" -ForegroundColor Yellow
$body = '{"email":"admin@test.com","password":"password123","name":"Test User","role":"ADMIN"}'

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/register" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 409" -ForegroundColor Red
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
        Write-Host "  ❌ FAIL" -ForegroundColor Red
        $failCount++
    }
}

# TEST 2: Invalid Credentials - Wrong Password (401)
Write-Host "`nTEST 2: Invalid Credentials (Wrong Password)" -ForegroundColor Yellow
$body = '{"email":"admin@test.com","password":"wrongpassword"}'

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 401" -ForegroundColor Red
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
        Write-Host "  ❌ FAIL" -ForegroundColor Red
        $failCount++
    }
}

# TEST 3: Non-existent Email (401)
Write-Host "`nTEST 3: Non-existent Email Login" -ForegroundColor Yellow
$body = '{"email":"nonexistent@test.com","password":"password123"}'

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -ErrorAction Stop
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 401" -ForegroundColor Red
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
        Write-Host "  ❌ FAIL" -ForegroundColor Red
        $failCount++
    }
}

# TEST 4: Insufficient Stock (409)
Write-Host "`nTEST 4: Insufficient Stock Update" -ForegroundColor Yellow

# Login
$loginResp = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"testadmin@test.com","password":"Test@123"}' -UseBasicParsing
$token = ($loginResp.Content | ConvertFrom-Json).data.token
Write-Host "  ✓ Logged in"

# Get inventory
$invResp = Invoke-WebRequest -Uri "$baseUrl/api/inventory" -Method GET -Headers @{"Authorization"="Bearer $token"} -UseBasicParsing
$inv = ($invResp.Content | ConvertFrom-Json).data[0]
Write-Host "  ✓ Using: $($inv.fabricName) $($inv.color), Available: $($inv.availableMeters)m"

# Create sample request with insufficient stock
$required = [int]$inv.availableMeters + 100
$available = [int]$inv.availableMeters

$body = @"
{"buyerName":"Test","contactPerson":"Test","requiredByDate":"2025-12-31","priority":"HIGH","items":[{"fabricName":"$($inv.fabricName)","color":"$($inv.color)","gsm":$($inv.gsm),"requiredMeters":$required,"availableMeters":$available}]}
"@

$createResp = Invoke-WebRequest -Uri "$baseUrl/api/sample-requests" -Method POST -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} -Body $body -UseBasicParsing
$req = ($createResp.Content | ConvertFrom-Json).data
$requestId = $req._id
$itemId = $req.items[0]._id
Write-Host "  ✓ Created request (Required: $required m, Available: $available m)"

# Update to IN_SAMPLING
$url = "$baseUrl/api/sample-requests/$requestId/items/$itemId/status"
Invoke-WebRequest -Uri $url -Method PATCH -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} -Body '{"status":"IN_SAMPLING"}' -UseBasicParsing | Out-Null
Write-Host "  ✓ Updated to IN_SAMPLING"

# Try to update to SENT (should fail with 409)
Write-Host "  Attempting to update to SENT..."
try {
    Invoke-WebRequest -Uri $url -Method PATCH -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} -Body '{"status":"SENT"}' -UseBasicParsing -ErrorAction Stop | Out-Null
    Write-Host "  Status: 200" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 409" -ForegroundColor Red
    $failCount++
} catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $stream.Position = 0
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    
    Write-Host "  Status: $statusCode"
    Write-Host "  Body: $responseBody"
    
    if ($statusCode -eq 409 -and $responseBody -like "*Insufficient stock*") {
        Write-Host "  ✅ PASS" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ❌ FAIL" -ForegroundColor Red
        $failCount++
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passed: $passCount / 4" -ForegroundColor Green
Write-Host "Failed: $failCount / 4" -ForegroundColor Red

if ($failCount -eq 0) {
    Write-Host "`n✅ All error handler fixes verified!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n❌ Some tests failed" -ForegroundColor Red
    exit 1
}
