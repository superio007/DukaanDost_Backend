# Test script to verify SAMPLING_HEAD authentication and authorization
$baseUrl = "http://localhost:3000"

Write-Host "`n=== Testing SAMPLING_HEAD Authentication ===" -ForegroundColor Cyan

# Step 1: Register a SAMPLING_HEAD user
Write-Host "`n1. Registering SAMPLING_HEAD user..." -ForegroundColor Yellow
$registerBody = @{
    name = "Sampling Head User"
    email = "samplinghead@dukaandost.com"
    password = "sampling123"
    role = "SAMPLING_HEAD"
} | ConvertTo-Json

$token = $null

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $registerBody `
        -ErrorAction Stop
    
    Write-Host "Registration successful" -ForegroundColor Green
    Write-Host "User: $($registerResponse.data.name)" -ForegroundColor Gray
    Write-Host "Role: $($registerResponse.data.role)" -ForegroundColor Gray
    
    # Now login to get token
    Write-Host "Logging in to get token..." -ForegroundColor Yellow
    $loginBody = @{
        email = "samplinghead@dukaandost.com"
        password = "sampling123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -ErrorAction Stop
    
    $token = $loginResponse.data.token
}
catch {
    Write-Host "User already exists, attempting login..." -ForegroundColor Yellow
    
    # Step 2: Login if user exists
    $loginBody = @{
        email = "samplinghead@dukaandost.com"
        password = "sampling123"
    } | ConvertTo-Json
    
    try {
        $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" `
            -Method POST `
            -ContentType "application/json" `
            -Body $loginBody `
            -ErrorAction Stop
        
        Write-Host "Login successful" -ForegroundColor Green
        Write-Host "User: $($loginResponse.data.user.name)" -ForegroundColor Gray
        Write-Host "Role: $($loginResponse.data.user.role)" -ForegroundColor Gray
        $token = $loginResponse.data.token
    }
    catch {
        Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

if (-not $token) {
    Write-Host "Failed to get token" -ForegroundColor Red
    exit 1
}

# Decode JWT to verify role
Write-Host "`n2. Decoding JWT token..." -ForegroundColor Yellow
$tokenParts = $token.Split('.')
$payload = $tokenParts[1]
# Add padding if needed
while ($payload.Length % 4 -ne 0) {
    $payload += "="
}
$decodedBytes = [System.Convert]::FromBase64String($payload)
$decodedJson = [System.Text.Encoding]::UTF8.GetString($decodedBytes)
$tokenData = $decodedJson | ConvertFrom-Json

Write-Host "Token Payload:" -ForegroundColor Gray
Write-Host "  User ID: $($tokenData.userId)" -ForegroundColor Gray
Write-Host "  Email: $($tokenData.email)" -ForegroundColor Gray
Write-Host "  Role: $($tokenData.role)" -ForegroundColor Gray

if ($tokenData.role -ne "SAMPLING_HEAD") {
    Write-Host "ERROR: Token role is not SAMPLING_HEAD!" -ForegroundColor Red
    exit 1
}

# Step 3: Create a sample request (as SALES user first)
Write-Host "`n3. Creating sample request (as SALES user)..." -ForegroundColor Yellow

# Register/Login as SALES user
$salesLoginBody = @{
    email = "sales@dukaandost.com"
    password = "sales123"
} | ConvertTo-Json

$salesToken = $null

try {
    $salesResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $salesLoginBody `
        -ErrorAction Stop
    $salesToken = $salesResponse.data.token
    Write-Host "SALES user logged in" -ForegroundColor Green
}
catch {
    Write-Host "SALES user doesn't exist, registering..." -ForegroundColor Yellow
    # Register if doesn't exist
    $salesRegisterBody = @{
        name = "Sales User"
        email = "sales@dukaandost.com"
        password = "sales123"
        role = "SALES"
    } | ConvertTo-Json
    
    try {
        $salesRegResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" `
            -Method POST `
            -ContentType "application/json" `
            -Body $salesRegisterBody `
            -ErrorAction Stop
        
        Write-Host "SALES user registered, logging in..." -ForegroundColor Yellow
        
        # Now login to get token
        $salesResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" `
            -Method POST `
            -ContentType "application/json" `
            -Body $salesLoginBody `
            -ErrorAction Stop
        $salesToken = $salesResponse.data.token
        Write-Host "SALES user logged in" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to create SALES user: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Create sample request
$sampleRequestBody = @{
    buyerName = "Test Buyer"
    contactPerson = "Test Contact"
    requiredByDate = "2026-03-15"
    priority = "HIGH"
    items = @(
        @{
            fabricName = "Cotton"
            color = "White"
            gsm = 150
            requiredMeters = 10
            availableMeters = 100
        }
    )
} | ConvertTo-Json -Depth 10

$headers = @{
    "Authorization" = "Bearer $salesToken"
    "Content-Type" = "application/json"
}

try {
    $sampleRequest = Invoke-RestMethod -Uri "$baseUrl/api/sample-requests" `
        -Method POST `
        -Headers $headers `
        -Body $sampleRequestBody `
        -ErrorAction Stop

    Write-Host "Sample request created" -ForegroundColor Green
    $requestId = $sampleRequest.data._id
    $itemId = $sampleRequest.data.items[0]._id
    Write-Host "Request ID: $requestId" -ForegroundColor Gray
    Write-Host "Item ID: $itemId" -ForegroundColor Gray
}
catch {
    Write-Host "Failed to create sample request: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 4: Test status update as SAMPLING_HEAD
Write-Host "`n4. Testing status update as SAMPLING_HEAD..." -ForegroundColor Yellow

$statusUpdateBody = @{
    status = "IN_SAMPLING"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Write-Host "Request URL: $baseUrl/api/sample-requests/$requestId/items/$itemId/status" -ForegroundColor Gray
Write-Host "Authorization: Bearer $($token.Substring(0, 20))..." -ForegroundColor Gray

try {
    $updateResponse = Invoke-RestMethod -Uri "$baseUrl/api/sample-requests/$requestId/items/$itemId/status" `
        -Method PATCH `
        -Headers $headers `
        -Body $statusUpdateBody `
        -ErrorAction Stop
    
    Write-Host "Status update successful!" -ForegroundColor Green
    Write-Host "New status: $($updateResponse.data.items[0].status)" -ForegroundColor Gray
}
catch {
    Write-Host "Status update failed!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try to get error details
    try {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response Body: $errorBody" -ForegroundColor Red
    }
    catch {
        Write-Host "Could not read error response" -ForegroundColor Red
    }
    exit 1
}

Write-Host "`n=== All tests passed! ===" -ForegroundColor Green
