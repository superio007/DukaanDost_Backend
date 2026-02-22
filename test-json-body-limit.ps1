# Test script for JSON body size limit
Write-Host "=== JSON Body Size Limit Test ===" -ForegroundColor Cyan

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

# Step 2: Test JSON body under 10MB (should succeed)
Write-Host ""
Write-Host "2. Testing valid JSON body (under 10MB)..." -ForegroundColor Yellow
$validItems = @()
for ($i = 0; $i -lt 100; $i++) {
    $validItems += @{
        fabricName = "Test Fabric $i"
        color = "Blue"
        gsm = 200
        requiredMeters = 10.5
        availableMeters = 100.0
    }
}
$validBody = @{
    buyerName = "Test Buyer"
    contactPerson = "John Doe"
    requiredByDate = "2024-12-31"
    priority = "HIGH"
    items = $validItems
} | ConvertTo-Json -Depth 10

Write-Host "  Payload size: $([math]::Round($validBody.Length / 1KB, 2)) KB" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/sample-requests" -Method POST -Body $validBody -ContentType "application/json" -Headers @{Authorization="Bearer $token"}
    Write-Host "  Valid JSON body accepted" -ForegroundColor Green
} catch {
    Write-Host "  Valid JSON body rejected unexpectedly" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Test JSON body over 10MB (should fail with 413)
Write-Host ""
Write-Host "3. Testing oversized JSON body (over 10MB)..." -ForegroundColor Yellow
Write-Host "  Creating large payload..." -ForegroundColor Gray

# Create a very large payload
$oversizedItems = @()
for ($i = 0; $i -lt 50000; $i++) {
    $oversizedItems += @{
        fabricName = "Test Fabric with very long name to increase payload size significantly and make it exceed the 10MB limit " * 10 + " Item $i"
        color = "Blue with additional text to make it larger and exceed the limit " * 5
        gsm = 200
        requiredMeters = 10.5
        availableMeters = 100.0
    }
}
$oversizedBody = @{
    buyerName = "Test Buyer"
    contactPerson = "John Doe"
    requiredByDate = "2024-12-31"
    priority = "HIGH"
    items = $oversizedItems
} | ConvertTo-Json -Depth 10

Write-Host "  Payload size: $([math]::Round($oversizedBody.Length / 1MB, 2)) MB" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/sample-requests" -Method POST -Body $oversizedBody -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -ErrorAction Stop
    Write-Host "  Oversized JSON body was accepted (should have been rejected)" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 413) {
        Write-Host "  Oversized JSON body correctly rejected with 413 Payload Too Large" -ForegroundColor Green
    } else {
        Write-Host "  Oversized JSON body rejected with status code $statusCode (expected 413)" -ForegroundColor Yellow
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan
