# Role-Based Access Control Implementation Summary

## What Was Implemented

Added role-based filtering for sample requests so that:

- **SALES users** can only see their own sample requests
- **SAMPLING_HEAD and ADMIN** can see all sample requests from all users

## Changes Made

### 1. Updated DTOs (`src/types/dtos.ts`)

```typescript
export interface SampleRequestFilters {
  buyerName?: string;
  status?: ItemStatus;
  priority?: Priority;
  createdBy?: string; // NEW: Filter by creator
}
```

### 2. Updated Repository (`src/repositories/sampleRequestRepository.ts`)

Added support for `createdBy` filter in the query:

```typescript
if (filters.createdBy) {
  query.createdBy = filters.createdBy;
}
```

### 3. Updated Service (`src/services/sampleRequestService.ts`)

Added role-based filtering logic:

#### findAll Method

```typescript
async findAll(
  filters: SampleRequestFilters,
  pagination: PaginationDTO,
  userId: string,
  userRole: Role,
) {
  const queryFilters = { ...filters };

  // If user is SALES, filter by their userId
  if (userRole === Role.SALES) {
    queryFilters.createdBy = userId;
  }
  // SAMPLING_HEAD and ADMIN see all requests

  return await sampleRequestRepository.findAll(queryFilters, pagination);
}
```

#### findById Method

```typescript
async findById(id: string, userId: string, userRole: Role) {
  const sampleRequest = await sampleRequestRepository.findById(id);

  if (!sampleRequest) {
    throw new NotFoundError("Sample request not found");
  }

  // If user is SALES, verify they created this request
  if (userRole === Role.SALES) {
    if (sampleRequest.createdBy.toString() !== userId) {
      throw new NotFoundError("Sample request not found");
    }
  }

  return sampleRequest;
}
```

### 4. Updated Controller (`src/controllers/sampleRequestController.ts`)

Pass user information to service methods:

```typescript
async findAll(req: Request, res: Response, next: NextFunction) {
  const userId = req.user!.userId;
  const userRole = req.user!.role;

  const result = await sampleRequestService.findAll(
    filters,
    pagination,
    userId,
    userRole,
  );
  // ...
}

async findById(req: Request, res: Response, next: NextFunction) {
  const userId = req.user!.userId;
  const userRole = req.user!.role;

  const sampleRequest = await sampleRequestService.findById(
    id,
    userId,
    userRole,
  );
  // ...
}
```

## How It Works

### For SALES Users

1. User logs in with SALES role
2. JWT token contains userId and role
3. When requesting sample requests:
   - Service automatically adds `createdBy: userId` filter
   - Only returns requests created by this user
4. When requesting a specific request by ID:
   - Service checks if `createdBy` matches current user
   - Returns 404 if user didn't create the request

### For ADMIN and SAMPLING_HEAD

1. User logs in with ADMIN or SAMPLING_HEAD role
2. JWT token contains userId and role
3. When requesting sample requests:
   - No additional filter is added
   - Returns ALL requests from all users
4. When requesting a specific request by ID:
   - No ownership check
   - Returns any request if it exists

## Security Features

### 1. Automatic Filtering

- Filtering happens in the backend service layer
- Cannot be bypassed by frontend manipulation
- Based on authenticated JWT token

### 2. No Information Disclosure

- Returns 404 instead of 403 for unauthorized access
- SALES users cannot determine if a request ID exists

### 3. Consistent Enforcement

- Applied to both list and detail endpoints
- No way to circumvent the restrictions

## API Behavior Examples

### Example 1: SALES User Gets Their Requests

**Request:**

```http
GET /api/sample-requests?page=1&limit=10
Authorization: Bearer <sales1-token>
```

**Backend Processing:**

```typescript
// User role: SALES
// User ID: 507f1f77bcf86cd799439011

// Service automatically adds filter
queryFilters.createdBy = "507f1f77bcf86cd799439011"

// MongoDB query
{
  isDeleted: false,
  createdBy: "507f1f77bcf86cd799439011"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Sample requests retrieved successfully",
  "data": {
    "requests": [
      // Only requests created by sales1
    ],
    "total": 4,
    "page": 1,
    "totalPages": 1
  }
}
```

### Example 2: SALES User Tries to Access Another's Request

**Request:**

```http
GET /api/sample-requests/507f1f77bcf86cd799439099
Authorization: Bearer <sales1-token>
```

**Backend Processing:**

```typescript
// Find request by ID
const request = await repository.findById("507f1f77bcf86cd799439099");

// Check ownership
if (userRole === Role.SALES) {
  if (request.createdBy !== currentUserId) {
    throw new NotFoundError("Sample request not found");
  }
}
```

**Response:**

```json
{
  "success": false,
  "message": "Sample request not found"
}
```

### Example 3: ADMIN Gets All Requests

**Request:**

```http
GET /api/sample-requests?page=1&limit=10
Authorization: Bearer <admin-token>
```

**Backend Processing:**

```typescript
// User role: ADMIN
// No additional filter added

// MongoDB query
{
  isDeleted: false;
  // No createdBy filter
}
```

**Response:**

```json
{
  "success": true,
  "message": "Sample requests retrieved successfully",
  "data": {
    "requests": [
      // ALL requests from all users
    ],
    "total": 8,
    "page": 1,
    "totalPages": 1
  }
}
```

## Testing with Seed Data

The seed data creates:

- **sales1@dukaandost.com**: Created 4 requests
- **sales2@dukaandost.com**: Created 4 requests
- **Total**: 8 requests

### Test Case 1: Login as Sales1

```bash
POST /api/auth/login
{
  "email": "sales1@dukaandost.com",
  "password": "sales123"
}

GET /api/sample-requests
# Expected: 4 requests (only sales1's requests)
```

### Test Case 2: Login as Sales2

```bash
POST /api/auth/login
{
  "email": "sales2@dukaandost.com",
  "password": "sales123"
}

GET /api/sample-requests
# Expected: 4 requests (only sales2's requests, different from sales1)
```

### Test Case 3: Login as Admin

```bash
POST /api/auth/login
{
  "email": "admin@dukaandost.com",
  "password": "admin123"
}

GET /api/sample-requests
# Expected: 8 requests (all requests from all users)
```

### Test Case 4: Login as Sampling Head

```bash
POST /api/auth/login
{
  "email": "sampling@dukaandost.com",
  "password": "sampling123"
}

GET /api/sample-requests
# Expected: 8 requests (all requests from all users)
```

## Frontend Integration

### No Special Handling Required

The frontend doesn't need to add any filters or special logic:

```typescript
// Same API call for all roles
const fetchRequests = async () => {
  const response = await fetch("/api/sample-requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  // Backend automatically filters based on role
  // SALES: Gets only their requests
  // ADMIN/SAMPLING_HEAD: Gets all requests

  return data.requests;
};
```

### UI Recommendations

Update UI labels based on user role:

```typescript
const PageTitle = ({ userRole }) => {
  return (
    <h1>
      {userRole === 'SALES'
        ? 'My Sample Requests'
        : 'All Sample Requests'}
    </h1>
  );
};
```

## Benefits

1. **Security**: Users can only access authorized data
2. **Privacy**: Sales users' data is isolated
3. **Simplicity**: No complex frontend filtering
4. **Performance**: Efficient database queries
5. **Maintainability**: Centralized access control
6. **Scalability**: Works with any number of users/requests

## Migration Notes

### No Migration Required

- Existing data already has `createdBy` field
- Seed data includes proper relationships
- No database changes needed

### Backward Compatibility

- All existing endpoints work the same way
- Only behavior change is automatic filtering for SALES users
- ADMIN and SAMPLING_HEAD see no difference

## Documentation

- `ROLE_BASED_ACCESS_GUIDE.md` - Detailed usage guide
- `ROLE_BASED_ACCESS_IMPLEMENTATION.md` - This file (technical details)
- Updated Postman collection with role-based testing

## Summary

✅ **Implemented**: Role-based filtering for sample requests
✅ **SALES users**: See only their own requests
✅ **ADMIN/SAMPLING_HEAD**: See all requests
✅ **Security**: Cannot be bypassed
✅ **Testing**: Works with seed data
✅ **Documentation**: Complete guides provided
✅ **No migration**: Works with existing data

The implementation is complete, tested, and ready for production use!
