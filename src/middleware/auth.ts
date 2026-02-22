import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AuthenticationError } from "./errorHandler.js";

/**
 * Authentication Middleware
 *
 * Extracts JWT token from Authorization header, verifies it, and attaches
 * decoded user information to the request object.
 *
 * Expected header format: "Bearer <token>"
 *
 * @throws {AuthenticationError} When token is missing, invalid, expired, or malformed
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Extract Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      console.warn(
        `⚠ Authentication failed: No token provided - ${req.method} ${req.path}`,
      );
      throw new AuthenticationError("No token provided");
    }

    // Check if header follows "Bearer <token>" format
    if (!authHeader.startsWith("Bearer ")) {
      console.warn(
        `⚠ Authentication failed: Invalid token format - ${req.method} ${req.path}`,
      );
      throw new AuthenticationError("Invalid token format");
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Check if token exists after "Bearer "
    if (!token) {
      console.warn(
        `⚠ Authentication failed: No token provided - ${req.method} ${req.path}`,
      );
      throw new AuthenticationError("No token provided");
    }

    // Verify token signature and expiration
    const decoded = jwt.verify(token, config.jwt.secret) as {
      userId: string;
      email: string;
      role: "ADMIN" | "SAMPLING_HEAD" | "SALES";
    };

    // Attach decoded user information to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    // Proceed to next middleware
    next();
  } catch (error) {
    // Handle JWT-specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      console.warn(
        `⚠ Authentication failed: Invalid token - ${req.method} ${req.path}`,
      );
      next(new AuthenticationError("Invalid token"));
    } else if (error instanceof jwt.TokenExpiredError) {
      console.warn(
        `⚠ Authentication failed: Token expired - ${req.method} ${req.path}`,
      );
      next(new AuthenticationError("Token expired"));
    } else if (error instanceof AuthenticationError) {
      // Pass through our custom authentication errors (already logged above)
      next(error);
    } else {
      // Handle unexpected errors
      console.error(
        `✗ Authentication error: ${error instanceof Error ? error.message : "Unknown error"} - ${req.method} ${req.path}`,
      );
      next(new AuthenticationError("Authentication failed"));
    }
  }
};
