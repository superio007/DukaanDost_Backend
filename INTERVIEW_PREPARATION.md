# DukaanDost Backend - Interview Preparation Guide

## 📋 Project Overview

**DukaanDost** is a Fabric Sample ERP (Enterprise Resource Planning) system that manages fabric sample requests for textile businesses. It's a production-ready RESTful API built with Node.js, Express, TypeScript, and MongoDB.

### Business Problem It Solves

- Sales teams need to request fabric samples for buyers
- Sampling heads need to track and update sample statuses
- Admins need to manage inventory and monitor the entire workflow
- The system prevents inventory conflicts and provides real-time analytics

---

## 🏗️ Architecture & Design Patterns

### Clean Architecture (Layered Architecture)

Your project follows a **strict separation of concerns** with 5 distinct layers:

```
Request Flow: Client → Routes → Controllers → Services → Repositories → Database
Response Flow: Database → Repositories → Services → Controllers → Client
```

#### 1. **Routes Layer** (`src/routes/`)

- **Purpose**: Define API endpoints and attach middleware
- **Responsibility**: URL mapping, middleware chaining (auth, validation, RBAC)
- **Example**: `POST /api/sample-requests` → authenticate → authorize(SALES, ADMIN) → validate → controller

#### 2. **Controllers Layer** (`src/controllers/`)

- **Purpose**: Handle HTTP requests/responses
- **Responsibility**: Extract request data, call services, format responses
- **No business logic** - just orchestration
- **Example**: `authController.register()` extracts `req.body`, calls `authService.register()`, returns formatted response

#### 3. **Services Layer** (`src/services/`)

- **Purpose**: Business logic and workflow orchestration
- **Responsibility**: Validation, status transitions, coordinating multiple repositories
- **Example**: `sampleRequestService.updateItemStatus()` validates status transitions AND triggers inventory deduction

#### 4. **Repositories Layer** (`src/repositories/`)

- **Purpose**: Data access abstraction
- **Responsibility**: Direct database operations, query building
- **No business logic** - just CRUD operations
- **Example**: `inventoryRepository.deductStock()` performs atomic MongoDB operations

#### 5. **Models/Schemas Layer** (`src/models/`, `src/schemas/`)

- **Purpose**: Database schema definition
- **Responsibility**: Data structure, validation rules, indexes
- **Example**: `InventorySchema` defines unique compound index on `fabricName + color + gsm`

---

## 🔐 Security Implementation

### 1. Authentication (JWT)

**File**: `src/middleware/auth.ts`

**How it works**:

1. Client sends `Authorization: Bearer <token>` header
2. Middleware extracts token from header
3. Verifies token signature using `JWT_SECRET`
4. Decodes payload: `{ userId, email, role }`
5. Attaches `req.user` for downstream middleware

**Why JWT?**

- Stateless (no server-side session storage)
- Scalable (works across multiple servers)
- Contains user info (reduces database queries)

### 2. Authorization (RBAC - Role-Based Access Control)

**File**: `src/middleware/rbac.ts`

**Three Roles**:

- `ADMIN`: Full access (create inventory, delete requests, update anything)
- `SAMPLING_HEAD`: Update sample statuses, manage workflow
- `SALES`: Create sample requests

**How it works**:

```typescript
authorize(Role.ADMIN, Role.SAMPLING_HEAD); // Only these roles can access
```

### 3. Password Security

**File**: `src/services/authService.ts`

- **Bcrypt hashing** with configurable salt rounds (default: 10)
- Passwords never stored in plain text
- `select: false` in schema prevents accidental password exposure
- Only explicitly selected when needed for login

### 4. Input Validation & Sanitization

**Files**: `src/validators/*.ts`, `src/middleware/validateRequest.ts`

**express-validator** chain:

- `.trim()` - Remove whitespace
- `.escape()` - Prevent XSS attacks
- `.normalizeEmail()` - Standardize email format
- Custom validators for business rules

**NoSQL Injection Prevention**:

```typescript
// In sampleRequestRepository.ts
const sanitizedBuyerName = filters.buyerName.replace(
  /[.*+?^${}()|[\]\\]/g,
  "\\$&",
);
```

### 5. Security Headers (Helmet)

**File**: `src/index.ts`

- Content Security Policy (CSP)
- X-Frame-Options: DENY (prevents clickjacking)
- Strict-Transport-Security (HTTPS enforcement)
- X-Content-Type-Options: nosniff

### 6. CORS Configuration

- Development: Allows all origins (`*`)
- Production: Must specify exact frontend URL
- Credentials support enabled
- Specific HTTP methods allowed

---

## 🔄 Key Workflows & Business Logic

### Workflow 1: Sample Request Creation

**Endpoint**: `POST /api/sample-requests`

**Flow**:

1. **Route** → Authenticate → Authorize(SALES, ADMIN) → Validate → Controller
2. **Controller** → Extract `req.body` and `req.user.userId`
3. **Service** → Initialize items with `REQUESTED` status and statusHistory
4. **Repository** → Create document in MongoDB
5. **Response** → Return created sample request with 201 status

**Key Code** (`sampleRequestService.ts`):

```typescript
const itemsWithStatus = requestData.items.map((item) => ({
  ...item,
  status: ItemStatus.REQUESTED,
  statusHistory: [
    {
      status: ItemStatus.REQUESTED,
      timestamp: new Date(),
      updatedBy: userId,
    },
  ],
}));
```

### Workflow 2: Status Update with Inventory Deduction

**Endpoint**: `PATCH /api/sample-requests/:requestId/items/:itemId/status`

**Status Transition Rules**:

```
REQUESTED → IN_SAMPLING → SENT → APPROVED/REJECTED
```

**Flow**:

1. Validate current status allows transition
2. Update item status atomically (prevents race conditions)
3. **If status = SENT**: Trigger inventory deduction
4. Add entry to statusHistory

**Critical Code** (`sampleRequestService.ts`):

```typescript
// Validate status transition
this.validateStatusTransition(item.status, status);

// Update status
const updatedRequest = await sampleRequestRepository.updateItemStatus(...);

// Trigger inventory deduction ONLY when SENT
if (status === ItemStatus.SENT) {
  await inventoryService.deductStock(
    item.fabricName,
    item.color,
    item.gsm,
    item.requiredMeters,
  );
}
```

### Workflow 3: Atomic Inventory Deduction

**Why Atomic Operations?**
Prevents race conditions when multiple users try to deduct stock simultaneously.

**Implementation** (`inventoryRepository.ts`):

```typescript
const inventory = await Inventory.findOneAndUpdate(
  {
    fabricName,
    color,
    gsm,
    availableMeters: { $gte: meters }, // Check sufficient stock
  },
  {
    $inc: { availableMeters: -meters }, // Atomic decrement
  },
  { new: true },
);

if (!inventory) {
  throw new Error("Insufficient stock or concurrent deduction");
}
```

**MongoDB's `$inc` operator** ensures:

- Check and update happen in single atomic operation
- No other operation can modify the value in between
- Returns `null` if condition not met (insufficient stock)

---

## 📊 Database Design

### Collections & Indexes

#### 1. Users Collection

**Schema**: `src/schemas/authSchemas.ts`

```typescript
{
  name: String,
  email: String (unique index),
  password: String (select: false),
  role: Enum(ADMIN, SAMPLING_HEAD, SALES),
  timestamps: true
}
```

**Index**: `{ email: 1 }` (unique) - Fast login lookups

#### 2. Inventory Collection

**Schema**: `src/schemas/inventorySchemas.ts`

```typescript
{
  fabricName: String,
  color: String,
  gsm: Number,
  availableMeters: Number,
  timestamps: true
}
```

**Compound Unique Index**: `{ fabricName: 1, color: 1, gsm: 1 }`

- Prevents duplicate fabric entries
- Enables fast lookup for inventory deduction
- Ensures data integrity

#### 3. SampleRequest Collection

**Schema**: `src/schemas/sampleRequestSchemas.ts`

```typescript
{
  buyerName: String,
  contactPerson: String,
  requiredByDate: Date,
  priority: Enum(LOW, MEDIUM, HIGH),
  items: [{
    fabricName: String,
    color: String,
    gsm: Number,
    requiredMeters: Number,
    availableMeters: Number,
    status: Enum(REQUESTED, IN_SAMPLING, SENT, APPROVED, REJECTED),
    statusHistory: [{
      status: String,
      timestamp: Date,
      updatedBy: ObjectId (ref: User)
    }]
  }],
  attachments: [String],
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

**Indexes**:

- `{ createdBy: 1 }` - Fast user-specific queries
- `{ priority: 1, "items.status": 1 }` - Filter by priority and status
- `{ requiredByDate: 1 }` - Sort by deadline

**Why Embedded Documents (items array)?**

- Items always accessed with parent request
- Atomic updates (update request and items together)
- Better performance (no joins needed)

---

## 🚀 Advanced Features

### 1. Pagination & Filtering

**File**: `src/repositories/sampleRequestRepository.ts`

```typescript
const skip = (page - 1) * limit;
const requests = await SampleRequest.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await SampleRequest.countDocuments(query);
const totalPages = Math.ceil(total / limit);
```

**Benefits**:

- Reduces memory usage
- Faster response times
- Better user experience

### 2. Dashboard Analytics with Aggregation

**File**: `src/services/dashboardService.ts`

**MongoDB Aggregation Pipeline**:

```typescript
SampleRequest.aggregate([
  { $unwind: "$items" },  // Flatten items array
  { $project: { status: "$items.status", ... } },  // Select fields
  { $group: {  // Calculate statistics
      _id: null,
      pendingSamples: { $sum: { $cond: [...] } },
      sentToday: { $sum: { $cond: [...] } },
      approvedCount: { $sum: { $cond: [...] } },
      rejectedCount: { $sum: { $cond: [...] } }
    }
  }
])
```

**Why Aggregation?**

- Single database query (vs multiple queries)
- Server-side computation (faster than client-side)
- Efficient for large datasets

### 3. File Upload with ImageKit CDN

**File**: `src/services/uploadService.ts`

**Flow**:

1. Multer middleware stores file in memory (Buffer)
2. Validate file size (max 5MB)
3. Convert buffer to base64
4. Upload to ImageKit CDN
5. Return public URL

**Why ImageKit?**

- CDN delivery (fast global access)
- Automatic image optimization
- No server storage needed
- Scalable

### 4. Error Handling Strategy

**File**: `src/middleware/errorHandler.ts`

**Custom Error Classes**:

- `ValidationError` (400) - Invalid input
- `AuthenticationError` (401) - Invalid/missing token
- `AuthorizationError` (403) - Insufficient permissions
- `NotFoundError` (404) - Resource doesn't exist
- `ConflictError` (409) - Duplicate entry, insufficient stock
- `PayloadTooLargeError` (413) - File/request too large

**Global Error Handler**:

- Catches all errors from routes/controllers/services
- Formats consistent error responses
- Logs errors with context
- Hides sensitive info in production

---

## 🛠️ Technology Stack Justification

### Why TypeScript?

- **Type safety**: Catch errors at compile time
- **Better IDE support**: Autocomplete, refactoring
- **Self-documenting**: Types serve as documentation
- **Easier maintenance**: Refactoring is safer

### Why Express?

- **Mature ecosystem**: Lots of middleware available
- **Flexible**: Doesn't force specific patterns
- **Performance**: Fast and lightweight
- **Community**: Large community, lots of resources

### Why MongoDB?

- **Flexible schema**: Easy to evolve data model
- **Embedded documents**: Items within requests (no joins)
- **Atomic operations**: `$inc`, `$push` for race condition prevention
- **Aggregation framework**: Powerful analytics
- **Horizontal scaling**: Sharding support

### Why Mongoose?

- **Schema validation**: Enforce data structure
- **Middleware hooks**: Pre/post save operations
- **Population**: Easy reference resolution
- **Type safety**: Works well with TypeScript

---

## 🎯 Interview Questions & Answers

### Q1: "Walk me through the request flow when a user creates a sample request"

**Answer**:

1. Client sends `POST /api/sample-requests` with JWT token
2. `authenticate` middleware verifies token, attaches `req.user`
3. `authorize(SALES, ADMIN)` checks if user has required role
4. `createSampleRequestValidator` validates request body
5. `sampleRequestController.create()` extracts data, calls service
6. `sampleRequestService.create()` adds status and statusHistory to items
7. `sampleRequestRepository.create()` inserts document into MongoDB
8. Response flows back with 201 status and created document

### Q2: "How do you prevent race conditions in inventory deduction?"

**Answer**:
We use MongoDB's atomic operations with the `$inc` operator:

```typescript
Inventory.findOneAndUpdate(
  { fabricName, color, gsm, availableMeters: { $gte: meters } },
  { $inc: { availableMeters: -meters } },
  { new: true },
);
```

The `$gte` check and `$inc` decrement happen atomically in a single operation. If two requests try to deduct simultaneously, MongoDB ensures only one succeeds if there's insufficient stock. The operation returns `null` if the condition isn't met, allowing us to throw an error.

### Q3: "Why did you separate services and repositories?"

**Answer**:

- **Repositories**: Pure data access, no business logic. Easy to test, easy to swap databases
- **Services**: Business logic, workflow orchestration. Can use multiple repositories
- **Example**: `sampleRequestService.updateItemStatus()` validates status transitions (business logic) AND calls `inventoryService.deductStock()` (orchestration). The repository just does the database update.

This separation makes code more maintainable, testable, and follows Single Responsibility Principle.

### Q4: "How does your authentication work?"

**Answer**:

1. **Registration**: Password hashed with bcrypt (10 salt rounds), stored in database
2. **Login**: Compare plain password with hash using `bcrypt.compare()`
3. **Token Generation**: Create JWT with payload `{ userId, email, role }`, signed with secret
4. **Token Verification**: Middleware extracts token from `Authorization: Bearer <token>`, verifies signature, attaches `req.user`
5. **Authorization**: RBAC middleware checks if `req.user.role` is in allowed roles

JWT is stateless, so no server-side session storage needed. Token expires after 24 hours (configurable).

### Q5: "What would you improve in this project?"

**Great answer showing initiative**:

1. **Testing**: Add unit tests (Jest), integration tests (Supertest), test coverage
2. **Rate Limiting**: Prevent abuse with express-rate-limit
3. **Logging**: Structured logging with Winston or Pino
4. **Caching**: Redis for frequently accessed data (inventory, dashboard stats)
5. **API Documentation**: Swagger/OpenAPI for auto-generated docs
6. **Monitoring**: APM tools (New Relic, Datadog) for performance tracking
7. **Database Transactions**: For complex multi-document operations
8. **Soft Deletes**: Add `deletedAt` field instead of hard deletes
9. **Audit Trail**: Track all changes for compliance
10. **Webhooks**: Notify external systems on status changes
11. **Background Jobs**: Bull/BullMQ for async tasks (email notifications)
12. **GraphQL**: Alternative to REST for flexible queries
13. **Microservices**: Split into auth, inventory, sample-request services
14. **Docker**: Containerization for consistent deployments
15. **CI/CD**: GitHub Actions for automated testing and deployment

### Q6: "How do you handle errors in your application?"

**Answer**:
We have a centralized error handling strategy:

1. **Custom Error Classes**: `ValidationError`, `AuthenticationError`, `NotFoundError`, etc. with appropriate HTTP status codes
2. **Global Error Handler**: Middleware that catches all errors, formats responses consistently
3. **Error Propagation**: Services/repositories throw errors, controllers catch and pass to error handler via `next(error)`
4. **Logging**: All errors logged with context (path, method, message)
5. **Security**: Sensitive info hidden in production (no stack traces)

Example:

```typescript
// Service throws
if (!user) throw new NotFoundError("User not found");

// Controller catches
try {
  await service.method();
} catch (error) {
  next(error); // Pass to global error handler
}

// Error handler formats response
res.status(404).json({ success: false, message: "User not found" });
```

### Q7: "Explain your database indexing strategy"

**Answer**:
We have strategic indexes for performance:

1. **User.email** (unique): Fast login lookups, prevents duplicate emails
2. **Inventory (fabricName, color, gsm)** (compound unique): Fast inventory deduction, prevents duplicates
3. **SampleRequest.createdBy**: Filter requests by user
4. **SampleRequest.priority + items.status**: Filter by priority and status
5. **SampleRequest.requiredByDate**: Sort by deadline

Indexes speed up queries but slow down writes. We only index fields used in queries/filters. Compound indexes support multiple query patterns.

### Q8: "How would you scale this application?"

**Answer**:

**Horizontal Scaling**:

- Stateless design (JWT) allows multiple server instances
- Load balancer (Nginx, AWS ALB) distributes traffic
- MongoDB replica sets for read scaling

**Caching**:

- Redis for session data, frequently accessed inventory
- CDN for static assets (already using ImageKit)

**Database Optimization**:

- Sharding for large datasets
- Read replicas for analytics queries
- Connection pooling (already configured: maxPoolSize: 20)

**Async Processing**:

- Message queue (RabbitMQ, AWS SQS) for background tasks
- Separate worker processes for heavy operations

**Monitoring**:

- APM tools for bottleneck identification
- Database query profiling
- Auto-scaling based on metrics

---

## 💡 Using GPT in Development (Honest Answer)

**When interviewer asks about GPT usage**:

"Yes, I used GPT as a learning and problem-solving tool, which I believe is a modern best practice:

**How I used it**:

1. **Understanding concepts**: Asked GPT to explain JWT, bcrypt, MongoDB aggregation
2. **Debugging**: When stuck on errors, asked for potential causes
3. **Best practices**: Verified if my approach follows industry standards
4. **Code review**: Asked GPT to review my code for security issues
5. **Alternative approaches**: Explored different ways to solve problems

**What I learned**:

- Clean architecture and separation of concerns
- Security best practices (bcrypt, JWT, input validation)
- MongoDB atomic operations and indexing strategies
- Error handling patterns
- TypeScript type safety

**My approach**:

- I don't blindly copy code - I understand every line
- I can explain the 'why' behind every decision
- I modified GPT suggestions to fit my specific needs
- I tested everything thoroughly

**Why this is valuable**:

- In real work, developers use Stack Overflow, documentation, and now AI tools
- What matters is understanding the code, not memorizing syntax
- GPT helped me learn faster and build better code
- I can maintain and extend this codebase confidently"

---

## 📝 Key Takeaways for Interview

### Technical Strengths to Highlight:

1. ✅ Clean architecture with clear separation of concerns
2. ✅ Security-first approach (JWT, bcrypt, RBAC, input validation)
3. ✅ Race condition prevention with atomic operations
4. ✅ Scalable design (stateless, pagination, indexing)
5. ✅ Production-ready (error handling, logging, validation)
6. ✅ Type safety with TypeScript
7. ✅ RESTful API design
8. ✅ Database optimization (indexes, aggregation)

### Be Ready to Discuss:

- Trade-offs in your design decisions
- How you would test this application
- How you would deploy to production
- How you would monitor and debug issues
- How you would add new features
- How you would handle increased load

### Show Growth Mindset:

- Acknowledge what you'd improve
- Discuss what you learned
- Show enthusiasm for learning more
- Ask questions about their tech stack

---

## 🎓 Study These Concepts Deeper

1. **JWT vs Session-based auth**: Trade-offs, when to use each
2. **MongoDB transactions**: ACID properties, when needed
3. **Microservices**: When to split, communication patterns
4. **Testing strategies**: Unit, integration, e2e tests
5. **CI/CD pipelines**: Automated testing and deployment
6. **Docker & Kubernetes**: Containerization and orchestration
7. **API versioning**: Strategies for backward compatibility
8. **Database migrations**: Schema evolution strategies
9. **Monitoring & Observability**: Metrics, logs, traces
10. **Security**: OWASP Top 10, common vulnerabilities

---

Good luck with your interview! 🚀
