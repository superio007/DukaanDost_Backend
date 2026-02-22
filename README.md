# Fabric Sample ERP Backend

A production-ready RESTful API system for managing fabric sample requests. Built with Node.js, Express, TypeScript, and MongoDB Atlas, this system enables sales teams to create sample requests, sampling heads to update item statuses, and administrators to manage the entire workflow.

## Features

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing and role-based access control (ADMIN, SAMPLING_HEAD, SALES)
- **Sample Request Management**: Complete CRUD operations with status workflow tracking and history
- **Inventory Management**: Real-time stock tracking with atomic deduction operations to prevent race conditions
- **File Upload Integration**: Seamless ImageKit integration for document attachments
- **Dashboard Analytics**: MongoDB aggregation-based statistics for monitoring system activity
- **Security**: Helmet middleware, CORS configuration, input sanitization, and secure password storage
- **Clean Architecture**: Strict layer separation (controllers, services, repositories, validators) for maintainability

## Technology Stack

- **Runtime**: Node.js with TypeScript for type safety
- **Framework**: Express.js for RESTful API
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with bcrypt for password hashing
- **File Storage**: ImageKit for cloud-based file management
- **Security**: Helmet, CORS, express-validator
- **Development**: ESLint, Prettier, nodemon

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/cloud/atlas)
- **ImageKit Account**: [Sign up here](https://imagekit.io/)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/superio007/DukaanDost_Backend.git
cd DukaanDost_Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration values (see Environment Variables section below).

## Environment Variables

Configure the following environment variables in your `.env` file:

### Server Configuration

| Variable   | Description        | Default       | Required |
| ---------- | ------------------ | ------------- | -------- |
| `PORT`     | Server port number | `5000`        | No       |
| `NODE_ENV` | Environment mode   | `development` | No       |

### Database

| Variable      | Description                     | Required |
| ------------- | ------------------------------- | -------- |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes      |

**Example**: `mongodb+srv://username:password@cluster.mongodb.net/fabric-erp?retryWrites=true&w=majority`

### JWT Configuration

| Variable         | Description                       | Default | Required |
| ---------------- | --------------------------------- | ------- | -------- |
| `JWT_SECRET`     | Secret key for signing JWT tokens | -       | Yes      |
| `JWT_EXPIRES_IN` | Token expiration time             | `24h`   | No       |

**Important**: Use a strong, random secret key in production. Never commit this to version control.

### ImageKit Configuration

| Variable                | Description           | Required |
| ----------------------- | --------------------- | -------- |
| `IMAGEKIT_PUBLIC_KEY`   | ImageKit public key   | Yes      |
| `IMAGEKIT_PRIVATE_KEY`  | ImageKit private key  | Yes      |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | Yes      |

Get these credentials from your [ImageKit Dashboard](https://imagekit.io/dashboard).

### CORS Configuration

| Variable      | Description             | Default | Required |
| ------------- | ----------------------- | ------- | -------- |
| `CORS_ORIGIN` | Allowed origin for CORS | `*`     | No       |

**Production**: Set this to your frontend application URL (e.g., `https://yourdomain.com`). Do NOT use wildcard `*` in production.

### Security

| Variable             | Description                             | Default | Required |
| -------------------- | --------------------------------------- | ------- | -------- |
| `BCRYPT_SALT_ROUNDS` | Bcrypt salt rounds for password hashing | `10`    | No       |

## Running the Application

### Development Mode

Run the application with hot-reload enabled:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

### Production Build

1. **Build the TypeScript code**

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist/` directory.

2. **Start the production server**

```bash
npm start
```

### Other Scripts

- **Lint code**: `npm run lint`
- **Fix linting issues**: `npm run lint:fix`
- **Format code**: `npm run format`
- **Check formatting**: `npm run format:check`

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "SALES"
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "SALES",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "SALES"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Sample Requests

All sample request endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### Create Sample Request

**Roles**: SALES, ADMIN

```http
POST /api/sample-requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "buyerName": "ABC Textiles",
  "contactPerson": "Jane Smith",
  "requiredByDate": "2024-02-15",
  "priority": "HIGH",
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
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Sample request created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "buyerName": "ABC Textiles",
    "contactPerson": "Jane Smith",
    "requiredByDate": "2024-02-15T00:00:00.000Z",
    "priority": "HIGH",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "fabricName": "Cotton Blend",
        "color": "Blue",
        "gsm": 180,
        "requiredMeters": 5,
        "availableMeters": 100,
        "status": "REQUESTED",
        "statusHistory": [
          {
            "status": "REQUESTED",
            "timestamp": "2024-01-15T10:30:00.000Z",
            "updatedBy": "507f1f77bcf86cd799439011"
          }
        ]
      }
    ],
    "attachments": ["https://ik.imagekit.io/your-id/sample.pdf"],
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### List Sample Requests

**Roles**: All authenticated users

```http
GET /api/sample-requests?page=1&limit=10&buyerName=ABC&status=REQUESTED&priority=HIGH
Authorization: Bearer <token>
```

**Query Parameters**:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `buyerName` (optional): Filter by buyer name (partial match)
- `status` (optional): Filter by item status (REQUESTED, IN_SAMPLING, SENT, APPROVED, REJECTED)
- `priority` (optional): Filter by priority (LOW, MEDIUM, HIGH)

**Response** (200 OK):

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
```

#### Get Sample Request by ID

**Roles**: All authenticated users

```http
GET /api/sample-requests/:id
Authorization: Bearer <token>
```

#### Update Sample Request

**Roles**: ADMIN

```http
PUT /api/sample-requests/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "buyerName": "ABC Textiles Ltd",
  "priority": "MEDIUM"
}
```

#### Update Item Status

**Roles**: SAMPLING_HEAD, ADMIN

```http
PATCH /api/sample-requests/:requestId/items/:itemId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_SAMPLING"
}
```

**Status Workflow**:

- REQUESTED → IN_SAMPLING
- IN_SAMPLING → SENT (triggers inventory deduction)
- SENT → APPROVED or REJECTED

#### Delete Sample Request

**Roles**: ADMIN

```http
DELETE /api/sample-requests/:id
Authorization: Bearer <token>
```

### Inventory

#### Create Inventory

**Roles**: ADMIN

```http
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "fabricName": "Cotton Blend",
  "color": "Blue",
  "gsm": 180,
  "availableMeters": 1000
}
```

#### List Inventory

**Roles**: All authenticated users

```http
GET /api/inventory
Authorization: Bearer <token>
```

#### Update Inventory

**Roles**: ADMIN

```http
PUT /api/inventory/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "availableMeters": 950
}
```

### File Upload

#### Upload Files

**Roles**: All authenticated users

```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: [file1.pdf, file2.jpg]
```

**Response** (200 OK):

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

**Limits**:

- Maximum file size: 5MB per file
- Supported formats: All common file types

### Dashboard

#### Get Statistics

**Roles**: All authenticated users

```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

**Response** (200 OK):

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

## Folder Structure

```
fabric-sample-erp-backend/
├── src/
│   ├── config/
│   │   ├── index.ts              # Configuration module
│   │   └── mongooseDb.ts         # Database connection
│   ├── controllers/              # HTTP request handlers
│   │   ├── authController.ts
│   │   ├── dashboardController.ts
│   │   ├── inventoryController.ts
│   │   ├── sampleRequestController.ts
│   │   └── uploadController.ts
│   ├── middleware/               # Express middleware
│   │   ├── auth.ts               # JWT authentication
│   │   ├── errorHandler.ts       # Global error handler
│   │   ├── handleResponse.ts     # Response formatter
│   │   ├── rbac.ts               # Role-based access control
│   │   └── validateRequest.ts    # Request validation
│   ├── models/                   # Mongoose models
│   │   ├── Inventory.ts
│   │   ├── SampleRequest.ts
│   │   └── User.ts
│   ├── repositories/             # Data access layer
│   │   ├── inventoryRepository.ts
│   │   ├── sampleRequestRepository.ts
│   │   └── userRepository.ts
│   ├── routes/                   # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── dashboardRoutes.ts
│   │   ├── inventoryRoutes.ts
│   │   ├── sampleRequestRoutes.ts
│   │   └── uploadRoutes.ts
│   ├── schemas/                  # Mongoose schemas
│   │   ├── authSchemas.ts
│   │   ├── inventorySchemas.ts
│   │   └── sampleRequestSchemas.ts
│   ├── services/                 # Business logic layer
│   │   ├── authService.ts
│   │   ├── dashboardService.ts
│   │   ├── inventoryService.ts
│   │   ├── sampleRequestService.ts
│   │   └── uploadService.ts
│   ├── types/                    # TypeScript types
│   │   ├── dtos.ts               # Data Transfer Objects
│   │   ├── enums.ts              # Enums (Role, Status, Priority)
│   │   └── express.d.ts          # Extended Express types
│   ├── validators/               # Request validators
│   │   ├── authValidators.ts
│   │   ├── inventoryValidators.ts
│   │   └── sampleRequestValidators.ts
│   └── index.ts                  # Application entry point
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                 # Dependencies (generated)
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

### Architecture Layers

1. **Controllers**: Handle HTTP requests/responses, extract parameters, call services
2. **Services**: Implement business logic, orchestrate operations across repositories
3. **Repositories**: Abstract database operations, provide clean data access interface
4. **Validators**: Centralized validation logic using express-validator
5. **Middleware**: Cross-cutting concerns (auth, error handling, logging)

## Error Responses

All errors follow a consistent format:

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

| Code | Type                  | Description                             |
| ---- | --------------------- | --------------------------------------- |
| 200  | Success               | Request succeeded                       |
| 201  | Created               | Resource created successfully           |
| 400  | Bad Request           | Validation errors, invalid input        |
| 401  | Unauthorized          | Missing or invalid token                |
| 403  | Forbidden             | Insufficient permissions                |
| 404  | Not Found             | Resource doesn't exist                  |
| 409  | Conflict              | Duplicate entry, insufficient stock     |
| 413  | Payload Too Large     | Request body or file exceeds size limit |
| 500  | Internal Server Error | Unhandled exceptions                    |

## Testing

### Manual Testing

You can test the API using tools like:

- **Postman**: Import the API endpoints and test manually
- **cURL**: Use command-line HTTP requests
- **Thunder Client**: VS Code extension for API testing

### Example cURL Request

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "SALES"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Create sample request (replace <token> with actual JWT)
curl -X POST http://localhost:5000/api/sample-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "buyerName": "ABC Textiles",
    "contactPerson": "Jane Smith",
    "requiredByDate": "2024-02-15",
    "priority": "HIGH",
    "items": [{
      "fabricName": "Cotton Blend",
      "color": "Blue",
      "gsm": 180,
      "requiredMeters": 5,
      "availableMeters": 100
    }]
  }'
```

## Deployment

### Prerequisites

- Node.js 18+ installed on server
- MongoDB Atlas cluster configured
- ImageKit account set up
- Environment variables configured

### Deployment Steps

1. **Build the application**

```bash
npm run build
```

2. **Set environment variables**

Configure all required environment variables on your hosting platform (Heroku, AWS, DigitalOcean, etc.).

3. **Start the server**

```bash
npm start
```

### Deployment Platforms

#### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
# ... set other variables

# Deploy
git push heroku main
```

#### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t fabric-erp-backend .
docker run -p 5000:5000 --env-file .env fabric-erp-backend
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (minimum 32 characters)
- [ ] Configure `CORS_ORIGIN` to your frontend URL (not wildcard)
- [ ] Enable HTTPS/SSL
- [ ] Set up MongoDB Atlas IP whitelist
- [ ] Configure proper logging
- [ ] Set up monitoring and alerts
- [ ] Enable rate limiting (if needed)
- [ ] Regular database backups
- [ ] Keep dependencies updated

## Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use strong JWT secrets** - Minimum 32 random characters
3. **Configure CORS properly** - Don't use wildcard in production
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS in production** - Never send credentials over HTTP
6. **Validate all inputs** - The system uses express-validator
7. **Rate limiting** - Consider adding rate limiting for production
8. **MongoDB security** - Use strong passwords, enable IP whitelist

## Troubleshooting

### Common Issues

**Issue**: Server won't start - "Missing required environment variables"

**Solution**: Ensure all required variables in `.env` are set correctly.

---

**Issue**: Database connection failed

**Solution**:

- Check MongoDB Atlas connection string
- Verify network access settings in MongoDB Atlas
- Ensure your IP is whitelisted

---

**Issue**: File upload fails

**Solution**:

- Verify ImageKit credentials are correct
- Check file size (max 5MB)
- Ensure ImageKit account is active

---

**Issue**: JWT token invalid or expired

**Solution**:

- Login again to get a new token
- Check `JWT_EXPIRES_IN` configuration
- Verify `JWT_SECRET` is consistent

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For issues and questions:

- GitHub Issues: [https://github.com/superio007/DukaanDost_Backend/issues](https://github.com/superio007/DukaanDost_Backend/issues)
- Repository: [https://github.com/superio007/DukaanDost_Backend](https://github.com/superio007/DukaanDost_Backend)

## Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- ImageKit for file storage
- All contributors and maintainers
