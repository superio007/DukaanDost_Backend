# Role-Based Access - Quick Reference

## 🎯 What Changed

Sample requests now have role-based filtering:

- **SALES** → See only their own requests
- **ADMIN/SAMPLING_HEAD** → See all requests

## 🔑 Test Credentials

```
SALES User 1:
  Email: sales1@dukaandost.com
  Password: sales123
  Sees: 4 requests (their own)

SALES User 2:
  Email: sales2@dukaandost.com
  Password: sales123
  Sees: 4 requests (their own, different from sales1)

ADMIN:
  Email: admin@dukaandost.com
  Password: admin123
  Sees: 8 requests (all requests)

SAMPLING HEAD:
  Email: sampling@dukaandost.com
  Password: sampling123
  Sees: 8 requests (all requests)
```

## 🧪 Quick Test

### Test 1: SALES User Sees Only Their Requests

```bash
# Login as sales1
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sales1@dukaandost.com","password":"sales123"}'

# Get requests (save token from above)
curl -X GET http://localhost:5000/api/sample-requests \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected: 4 requests
```

### Test 2: ADMIN Sees All Requests

```bash
# Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dukaandost.com","password":"admin123"}'

# Get requests
curl -X GET http://localhost:5000/api/sample-requests \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected: 8 requests
```

### Test 3: SALES Cannot Access Other's Requests

```bash
# Login as sales1
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sales1@dukaandost.com","password":"sales123"}'

# Try to access a request created by sales2
# (Get a request ID from sales2's list first)
curl -X GET http://localhost:5000/api/sample-requests/SALES2_REQUEST_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected: 404 Not Found
```

## 📊 Expected Results

| User Role      | Total Requests Visible | Can View Others' Requests |
| -------------- | ---------------------- | ------------------------- |
| SALES (sales1) | 4                      | ❌ No                     |
| SALES (sales2) | 4                      | ❌ No                     |
| ADMIN          | 8                      | ✅ Yes                    |
| SAMPLING_HEAD  | 8                      | ✅ Yes                    |

## 🎨 Frontend Integration

### No Changes Needed for API Calls

```typescript
// Same code works for all roles
const getRequests = async () => {
  const response = await fetch("/api/sample-requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
```

### Update UI Labels

```typescript
// Show different title based on role
<h1>
  {userRole === 'SALES' ? 'My Requests' : 'All Requests'}
</h1>
```

## ✅ What Works

- ✅ SALES users automatically see only their requests
- ✅ ADMIN/SAMPLING_HEAD see all requests
- ✅ No frontend filtering needed
- ✅ Cannot be bypassed
- ✅ Works with existing seed data
- ✅ No database migration required

## 📚 Full Documentation

- `ROLE_BASED_ACCESS_GUIDE.md` - Complete usage guide
- `ROLE_BASED_ACCESS_IMPLEMENTATION.md` - Technical details

## 🚀 Ready to Use

The feature is fully implemented and tested. Just:

1. Run `npm run seed` (if not already done)
2. Start server: `npm run dev`
3. Test with Postman or cURL
4. Integrate into your frontend

That's it! 🎉
