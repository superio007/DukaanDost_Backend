# Role-Based Access Control for Sample Requests

## Overview

Sample requests now have role-based filtering to ensure users only see the data they're authorized to access.

## Access Rules

### SALES Users

- **Can see**: Only their own sample requests (requests they created)
- **Cannot see**: Sample requests created by other sales users
- **Can create**: New sample requests
- **Cannot update/delete**: Any sample requests (even their own)

### SAMPLING_HEAD Users

- **Can see**: ALL sample requests from all users
- **Can update**: Sample request details and item statuses
- **Cannot delete**: Sample requests

### ADMIN Users

- **Can see**: ALL sample requests from all users
- **Can update**: Sample request details and item statuses
- **Can delete**: Any sample request (soft delete)

## Implementation Details

### Automatic Filtering

When a SALES user requests sample requests, the system automatically filters by their user ID:

```typescript
// SALES user makes request
GET / api / sample - requests;

// System automatically adds filter
query.createdBy = currentUserId;

// Result: Only shows requests created by this SALES user
```

### No Manual Filter Needed

Frontend developers don't need to add any special filters. The backend automatically handles role-based filtering based on the authenticated user's role.

## API Behavior

### GET /api/sample-requests

**For SALES Users:**

```bash
# Request
GET /api/sample-requests?page=1&limit=10
Authorization: Bearer <sales-user-token>

# Response: Only requests created by this sales user
{
  "success": true,
  "message": "Sample requests retrieved successfully",
  "data": {
    "requests": [
      // Only requests where createdBy = current user ID
    ],
    "total": 3,
    "page": 1,
    "totalPages": 1
  }
}
```

**For SAMPLING_HEAD or ADMIN:**

```bash
# Request
GET /api/sample-requests?page=1&limit=10
Authorization: Bearer <admin-token>

# Response: ALL requests from all users
{
  "success": true,
  "message": "Sample requests retrieved successfully",
  "data": {
    "requests": [
      // All requests from all users
    ],
    "total": 8,
    "page": 1,
    "totalPages": 1
  }
}
```

### GET /api/sample-requests/:id

**For SALES Users:**

```bash
# Request for their own request
GET /api/sample-requests/507f1f77bcf86cd799439011
Authorization: Bearer <sales-user-token>

# Response: Success (if they created it)
{
  "success": true,
  "message": "Sample request retrieved successfully",
  "data": { ... }
}

# Request for another user's request
GET /api/sample-requests/507f1f77bcf86cd799439012
Authorization: Bearer <sales-user-token>

# Response: 404 Not Found
{
  "success": false,
  "message": "Sample request not found"
}
```

**For SAMPLING_HEAD or ADMIN:**

```bash
# Request for any request
GET /api/sample-requests/507f1f77bcf86cd799439011
Authorization: Bearer <admin-token>

# Response: Success (can view any request)
{
  "success": true,
  "message": "Sample request retrieved successfully",
  "data": { ... }
}
```

## Frontend Implementation

### React Example

```typescript
// No special handling needed!
// Just call the API normally

const fetchSampleRequests = async () => {
  const response = await fetch("/api/sample-requests?page=1&limit=10", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  // For SALES: data.requests contains only their requests
  // For ADMIN/SAMPLING_HEAD: data.requests contains all requests

  return data;
};
```

### Display Logic

```typescript
// Show different UI based on role
const SampleRequestList = ({ userRole }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchSampleRequests().then(data => {
      setRequests(data.requests);
    });
  }, []);

  return (
    <div>
      <h1>
        {userRole === 'SALES'
          ? 'My Sample Requests'
          : 'All Sample Requests'}
      </h1>

      {requests.map(request => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  );
};
```

## Testing Scenarios

### Scenario 1: SALES User Views Their Requests

```bash
# 1. Login as sales user
POST /api/auth/login
{
  "email": "sales1@dukaandost.com",
  "password": "sales123"
}

# 2. Get sample requests
GET /api/sample-requests

# Expected: Only requests created by sales1@dukaandost.com
# Should see 4 requests (from seed data)
```

### Scenario 2: SALES User Cannot View Other's Requests

```bash
# 1. Login as sales1
POST /api/auth/login
{
  "email": "sales1@dukaandost.com",
  "password": "sales123"
}

# 2. Get all requests to find one created by sales2
GET /api/sample-requests
# Note the IDs of requests you see

# 3. Login as sales2
POST /api/auth/login
{
  "email": "sales2@dukaandost.com",
  "password": "sales123"
}

# 4. Get all requests
GET /api/sample-requests
# Note the IDs - they should be different from sales1's requests

# 5. Login back as sales1
POST /api/auth/login
{
  "email": "sales1@dukaandost.com",
  "password": "sales123"
}

# 6. Try to access sales2's request by ID
GET /api/sample-requests/{sales2-request-id}

# Expected: 404 Not Found
{
  "success": false,
  "message": "Sample request not found"
}
```

### Scenario 3: ADMIN Views All Requests

```bash
# 1. Login as admin
POST /api/auth/login
{
  "email": "admin@dukaandost.com",
  "password": "admin123"
}

# 2. Get all sample requests
GET /api/sample-requests

# Expected: ALL 8 requests from all users
# Should see requests from both sales1 and sales2
```

### Scenario 4: SAMPLING_HEAD Views All Requests

```bash
# 1. Login as sampling head
POST /api/auth/login
{
  "email": "sampling@dukaandost.com",
  "password": "sampling123"
}

# 2. Get all sample requests
GET /api/sample-requests

# Expected: ALL 8 requests from all users
```

## Postman Testing

### Test with Different Users

1. **Test as SALES User:**
   - Use "Login" endpoint with `sales1@dukaandost.com`
   - Run "Get All Sample Requests"
   - Count the results (should be 4)
   - Note the request IDs

2. **Test as Another SALES User:**
   - Use "Login" endpoint with `sales2@dukaandost.com`
   - Run "Get All Sample Requests"
   - Count the results (should be 4, different from sales1)
   - Try to access a request ID from sales1 (should fail)

3. **Test as ADMIN:**
   - Use "Login" endpoint with `admin@dukaandost.com`
   - Run "Get All Sample Requests"
   - Count the results (should be 8 - all requests)

4. **Test as SAMPLING_HEAD:**
   - Use "Login" endpoint with `sampling@dukaandost.com`
   - Run "Get All Sample Requests"
   - Count the results (should be 8 - all requests)

## Security Considerations

### 1. No Data Leakage

- SALES users cannot access other users' requests, even if they know the ID
- Returns 404 instead of 403 to avoid information disclosure

### 2. Automatic Filtering

- Filtering happens at the service layer, not in the frontend
- Cannot be bypassed by manipulating query parameters
- Based on authenticated user's JWT token

### 3. Consistent Behavior

- Same filtering applies to both list and detail endpoints
- No way for SALES users to circumvent the restrictions

## Database Query Examples

### SALES User Query

```javascript
// Automatically adds createdBy filter
{
  isDeleted: false,
  createdBy: "507f1f77bcf86cd799439011" // Current user's ID
}
```

### ADMIN/SAMPLING_HEAD Query

```javascript
// No additional filter
{
  isDeleted: false;
  // No createdBy filter - sees all requests
}
```

## Benefits

1. **Security**: Users can only access data they're authorized to see
2. **Privacy**: Sales users' data is isolated from each other
3. **Simplicity**: Frontend doesn't need complex filtering logic
4. **Scalability**: Works efficiently even with thousands of requests
5. **Maintainability**: Access control logic is centralized in the backend

## Migration Notes

### Existing Data

- All existing sample requests already have `createdBy` field
- No database migration needed
- Seed data includes proper `createdBy` relationships

### Frontend Changes Needed

- Update UI labels based on user role:
  - SALES: "My Sample Requests"
  - ADMIN/SAMPLING_HEAD: "All Sample Requests"
- Handle 404 errors gracefully when SALES users try to access unauthorized requests
- Consider hiding "View All" features for SALES users

## Summary

✅ SALES users see only their own requests
✅ SAMPLING_HEAD and ADMIN see all requests
✅ Automatic filtering based on JWT token
✅ No frontend changes required for filtering
✅ Secure - cannot be bypassed
✅ Works with existing seed data
✅ No database migration needed

The implementation is complete and ready to use!
