// Base error class for operational errors
export class AppError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errors = errors;
        // Maintains proper stack trace for where error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}
// 400 - Validation Error
export class ValidationError extends AppError {
    constructor(message = "Validation failed", errors) {
        super(message, 400, errors);
    }
}
// 401 - Authentication Error
export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed") {
        super(message, 401);
    }
}
// 403 - Authorization Error
export class AuthorizationError extends AppError {
    constructor(message = "Insufficient permissions") {
        super(message, 403);
    }
}
// 404 - Not Found Error
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}
// 409 - Conflict Error
export class ConflictError extends AppError {
    constructor(message = "Resource conflict") {
        super(message, 409);
    }
}
// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    // Handle custom AppError instances
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
        });
    }
    // Handle MongoDB duplicate key errors (11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0];
        const message = field === "email" ? "Email already exists" : `Duplicate ${field} value`;
        return res.status(409).json({
            success: false,
            message,
        });
    }
    // Handle Mongoose ValidationError
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors || {}).map((error) => ({
            field: error.path,
            message: error.message,
        }));
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }
    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
        });
    }
    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired",
        });
    }
    // Handle generic "Invalid credentials" error
    if (err.message === "Invalid credentials") {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }
    // Handle insufficient stock errors
    if (err.message && err.message.includes("Insufficient stock")) {
        return res.status(409).json({
            success: false,
            message: err.message,
        });
    }
    // Handle unexpected errors
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map