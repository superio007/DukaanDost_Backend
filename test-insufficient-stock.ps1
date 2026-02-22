# Test Insufficient Stock Scenario
$baseUrl = "http://localhost:5000"

Write-Host "`n=== TEST 4: INSUFFICIENT STOCK ===" -ForegroundColor Cyan

# Step 1: Login
Write-Host "`nStep 1: Authentication..."
$loginBody = '{"email":"testadmin@test.com","password":"Test@123"}'

$loginResponse = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
$token = ($loginResponse.Content | ConvertFrom-Json).data.token
Write-Host "  ✓ Logged in successfully"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Step 2: Get inventory
Write-Host "`nStep 2: Fetching inventory..."
$invResponse = Invoke-WebRequest -Uri "$baseUrl/api/inventory" -Method GET -Headers $headers
$inventory = ($invResponse.Content | ConvertFrom-Json).data

if ($inventory.Count -eq 0) {
    Write-Host "  ❌ No inventory items found" -ForegroundColor Red
    exit 1
}

$testItem = $inventory[0]
Write-Host "  ✓ Using: $($testItem.fabricName) $($testItem.color)"
Write-Host "    Available: $($testItem.availableMeters) meters"

# Step 3: Create sample request with MORE than available stock
$requiredMeters = [int]$testItem.availableMeters + 100
Write-Host "`nStep 3: Creating sample request requiring $requiredMeters meters..."

$sampleRequestBody = @"
{
    "buyerName": "Insufficient Stock Test",
    "contactPerson": "Test",
    "requiredByDate": "2025-12-31",
    "priority": "HIGH",
    "items": [{
        "fabricName": "$($testItem.fabricName)",
        "color": "$($testItem.color)",
        "gsm": $($testItem.gsm),
        "requiredMeters": $requiredMeters
    }]
}
"@

$createResponse = Invoke-WebRequest -Uri "$baseUrl/api/sample-requests" -Method POST -Headers $headers -Body $sampleRequestBody
$sampleRequest = ($createResponse.Content | ConvertFrom-Json).data
$requestId = $sampleRequest._id
$itemId = $sampleRequest.items[0]._id

Write-Host "  ✓ Sample request created: $requestId"
Write-Host "    Required: $($sampleRequest.items[0].requiredMeters) meters"
Write-Host "    Available: $($sampleRequest.items[0].availableMeters) meters"

# Step 4: Update to IN_SAMPLING
Write-Host "`nStep 4: Updating status to IN_SAMPLING..."
$updateBody1 = "{`"status`":`"IN_SAMPLING`"}"

$update1Response = Invoke-WebRequest -Uri "$baseUrl/api/sample-requests/$requestId/items/$itemId/status" -Method PATCH -Headers $headers -Body $updateBody1
Write-Host "  ✓ Status updated to IN_SAMPLING"

# Step 5: Try to update to SENT (should fail with 409)
Write-Host "`nStep 5: Attempting to update to SENT (should fail)..."
$updateBody2 = "{`"status`":`"SENT`"}"

try {
    $update2Response = Invoke-WebRequest -Uri "$baseUrl/api/sample-requests/$requestId/items/$itemId/status" -Method PATCH -Headers $headers -Body $updateBody2 -ErrorAction Stop
    Write-Host "  Status: $($update2Response.StatusCode)" -ForegroundColor Red
    Write-Host "  ❌ FAIL - Expected 409" -ForegroundColor Red
    exit 1
} catch {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $stream.Position = 0
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    
    Write-Host "  Status: $statusCode"
    Write-Host "  Body: $responseBody"
    
    if ($statusCode -eq 409 -and $responseBody -like "*Insufficient stock*") {
        Write-Host "`n  ✅ PASS - Insufficient stock error correctly returned!" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "`n  ❌ FAIL - Expected 409 with 'Insufficient stock'" -ForegroundColor Red
        exit 1
    }
}
