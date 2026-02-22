# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Token) for authentication.

### Token Format

```
Authorization: Bearer <your-jwt-token>
```

### Register User

**POST** `/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "SALES"
}
```

**Roles:** `ADMIN`, `SAMPLING_HEAD`, `SALES`

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "SALES",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Sample Requests

All endpoints require authentication.

### Create Sample Request

**POST** `/sample-requests`

**Roles:** SALES, ADMIN

**Request Body:**

```json
{
  "buyerName": "ABC Textiles",
  "contactPerson": "Jane Smith",
  "requiredByDate": "2024-02-15",
  "priority": "HIGH",
```

"items": [
{
"fabricName": "Cotton Blend",
"color": "Blue",
"gsm": 180,
"requiredMeters": 5,
"availableMeters": 100
}
],
"attachments": ["https://ik.imagekit.io/your-id/sample.pdf"]
}

````

**Priority:** `LOW`, `MEDIUM`, `HIGH`

**Response (201):** Returns created sample request with initial status `REQUESTED`

### List Sample Requests

**GET** `/sample-requests?page=1&limit=10&buyerName=ABC&status=REQUESTED&priority=HIGH`

**Roles:** All authenticated users

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `buyerName` (optional): Filter by buyer name
- `status` (optional): Filter by status
- `priority` (optional): Filter by priority

**Response (200):**
```json
{
  "success": true,
  "message": "Sample requests retrieved successfully",
  "data": {
    "requests": [...],
    "total": 25,
    "page": 1,
    "totalPages": 3
  }
}
````

### Get Sample Request by ID

**GET** `/sample-requests/:id`

**Roles:** All authenticated users

**Response (200):** Returns complete sample request with all items and status history

### Update Sample Request

**PUT** `/sample-requests/:id`

**Roles:** ADMIN

**Request Body (all optional):**

```json
{
  "buyerName": "ABC Textiles Ltd",
  "contactPerson": "Jane Smith",
  "requiredByDate": "2024-02-20",
  "priority": "MEDIUM",
  "attachments": [...]
}
```

### Update Item Status

**PATCH** `/sample-requests/:requestId/items/:itemId/status`

**Roles:** SAMPLING_HEAD, ADMIN

**Request Body:**

```json
{
  "status": "IN_SAMPLING"
}
```

**Status Values:** `REQUESTED`, `IN_SAMPLING`, `SENT`, `APPROVED`, `REJECTED`

**Valid Transitions:**

- REQUESTED → IN_SAMPLING
- IN_SAMPLING → SENT (triggers inventory deduction)
- SENT → APPROVED or REJECTED

### Delete Sample Request

**DELETE** `/sample-requests/:id`

**Roles:** ADMIN

## Inventory

### Create Inventory

**POST** `/inventory`

**Roles:** ADMIN

**Request Body:**

```json
{
  "fabricName": "Cotton Blend",
  "color": "Blue",
  "gsm": 180,
  "availableMeters": 1000
}
```

### List Inventory

**GET** `/inventory`

**Roles:** All authenticated users

**Response (200):** Returns array of all inventory records

### Update Inventory

**PUT** `/inventory/:id`

**Roles:** ADMIN

**Request Body:**

```json
{
  "availableMeters": 950
}
```

## File Upload

### Upload Files

**POST** `/upload`

**Roles:** All authenticated users

**Request:** Multipart form data with `files` field

**Limits:** Max 5MB per file

**Response (200):**

```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": [
    "https://ik.imagekit.io/your-id/file1.pdf",
    "https://ik.imagekit.io/your-id/file2.jpg"
  ]
}
```

## Dashboard

### Get Statistics

**GET** `/dashboard/stats`

**Roles:** All authenticated users

**Response (200):**

```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalSampleRequests": 150,
    "pendingSamples": 45,
    "sentToday": 12,
    "approvalRatePercentage": 78.5
  }
}
```

**Statistics:**

- `totalSampleRequests`: Total count of all requests
- `pendingSamples`: Items with REQUESTED or IN_SAMPLING status
- `sentToday`: Items with SENT status updated today
- `approvalRatePercentage`: (APPROVED / (APPROVED + REJECTED)) × 100

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

| Code | Type                  | Description                         |
| ---- | --------------------- | ----------------------------------- |
| 200  | Success               | Request succeeded                   |
| 201  | Created               | Resource created                    |
| 400  | Bad Request           | Validation errors                   |
| 401  | Unauthorized          | Missing/invalid token               |
| 403  | Forbidden             | Insufficient permissions            |
| 404  | Not Found             | Resource not found                  |
| 409  | Conflict              | Duplicate entry, insufficient stock |
| 413  | Payload Too Large     | File/body too large                 |
| 500  | Internal Server Error | Server error                        |

## Status Workflow

Sample items follow this workflow:

```
REQUESTED → IN_SAMPLING → SENT → APPROVED
                            ↓
                         REJECTED
```

### Inventory Deduction

When status changes to `SENT`:

1. System finds matching inventory by fabricName, color, and gsm
2. Verifies sufficient stock (availableMeters >= requiredMeters)
3. Atomically deducts requiredMeters from availableMeters
4. Returns 409 Conflict if insufficient stock
5. Returns 404 Not Found if no matching inventory

### Status History

Every status change is recorded with:

- `status`: The new status
- `timestamp`: When the change occurred
- `updatedBy`: User ID who made the change

All previous entries are preserved (immutable).

## Example cURL Requests

### Register and Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"SALES"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create Sample Request

```bash
curl -X POST http://localhost:5000/api/sample-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "buyerName":"ABC Textiles",
    "contactPerson":"Jane Smith",
    "requiredByDate":"2024-02-15",
    "priority":"HIGH",
    "items":[{
      "fabricName":"Cotton Blend",
      "color":"Blue",
      "gsm":180,
      "requiredMeters":5,
      "availableMeters":100
    }]
  }'
```

### Update Item Status

```bash
curl -X PATCH http://localhost:5000/api/sample-requests/<requestId>/items/<itemId>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"status":"IN_SAMPLING"}'
```

### Upload Files

```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "files=@/path/to/file.pdf"
```

## Postman Collection

Import these endpoints into Postman for easier testing:

1. Set environment variable `baseUrl` = `http://localhost:5000/api`
2. Set environment variable `token` (will be auto-set after login)
3. Add pre-request script for authenticated endpoints:

```javascript
pm.request.headers.add({
  key: "Authorization",
  value: "Bearer " + pm.environment.get("token"),
});
```

4. Add test script for login endpoint:

```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set("token", response.data.token);
}
```

## Role Permissions Matrix

| Endpoint                    | ADMIN | SAMPLING_HEAD | SALES |
| --------------------------- | ----- | ------------- | ----- |
| POST /auth/register         | ✓     | ✓             | ✓     |
| POST /auth/login            | ✓     | ✓             | ✓     |
| POST /sample-requests       | ✓     | ✗             | ✓     |
| GET /sample-requests        | ✓     | ✓             | ✓     |
| GET /sample-requests/:id    | ✓     | ✓             | ✓     |
| PUT /sample-requests/:id    | ✓     | ✗             | ✗     |
| DELETE /sample-requests/:id | ✓     | ✗             | ✗     |
| PATCH .../status            | ✓     | ✓             | ✗     |
| POST /inventory             | ✓     | ✗             | ✗     |
| GET /inventory              | ✓     | ✓             | ✓     |
| PUT /inventory/:id          | ✓     | ✗             | ✗     |
| POST /upload                | ✓     | ✓             | ✓     |
| GET /dashboard/stats        | ✓     | ✓             | ✓     |

## Support

For issues and questions:

- GitHub Issues: https://github.com/superio007/DukaanDost_Backend/issues
- Repository: https://github.com/superio007/DukaanDost_Backend
