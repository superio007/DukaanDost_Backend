import { Request, Response, NextFunction } from "express";

// Base error class for operational errors
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    statusCode: number,
    errors?: Array<{ field: string; message: string }>,
  ) {
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
  constructor(
    message: string = "Validation failed",
    errors?: Array<{ field: string; message: string }>,
  ) {
    super(message, 400, errors);
  }
}

// 401 - Authentication Error
export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
  }
}

// 403 - Authorization Error
export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, 403);
  }
}

// 404 - Not Found Error
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

// 409 - Conflict Error
export class ConflictError extends AppError {
  constructor(message: string = "Resource conflict") {
    super(message, 409);
  }
}

// 413 - Payload Too Large Error
export class PayloadTooLargeError extends AppError {
  constructor(message: string = "Payload too large") {
    super(message, 413);
  }
}

// Global error handler middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  // Log error details
  console.error("✗ Error occurred:");
  console.error(`  Path: ${req.method} ${req.path}`);
  console.error(`  Message: ${err.message || "Unknown error"}`);

  // Log stack trace only in development mode
  if (isDevelopment && err.stack) {
    console.error(`  Stack trace:\n${err.stack}`);
  }

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
    const message =
      field === "email" ? "Email already exists" : `Duplicate ${field} value`;
    console.error(`  Type: MongoDB duplicate key error (field: ${field})`);
    return res.status(409).json({
      success: false,
      message,
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((error: any) => ({
      field: error.path,
      message: error.message,
    }));
    console.error(`  Type: Mongoose validation error`);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    console.error(`  Type: Mongoose CastError (invalid ObjectId)`);
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    console.error(`  Type: JWT error - Invalid token`);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    console.error(`  Type: JWT error - Token expired`);
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Handle generic "Invalid credentials" error
  if (err.message === "Invalid credentials") {
    console.error(`  Type: Authentication error - Invalid credentials`);
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Handle insufficient stock errors
  if (err.message && err.message.includes("Insufficient stock")) {
    console.error(`  Type: Conflict error - Insufficient stock`);
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Multer errors (file upload errors)
  if (err.name === "MulterError") {
    console.error(`  Type: Multer error - ${err.message}`);
    if (err.code === "LIMIT_FILE_SIZE" || err.message === "File too large") {
      return res.status(413).json({
        success: false,
        message: "File size exceeds the maximum limit of 5MB",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || "File upload error",
    });
  }

  // Handle unexpected errors
  console.error(`  Type: Unhandled error`);

  // Handle Express payload too large error (entity.too.large)
  if (err.type === "entity.too.large" || err.status === 413) {
    return res.status(413).json({
      success: false,
      message: "Payload too large",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
