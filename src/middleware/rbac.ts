import { Request, Response, NextFunction } from "express";
import { Role } from "../types/enums.js";
import { AuthorizationError } from "./errorHandler.js";

/**
 * Role-Based Access Control (RBAC) Middleware Factory
 *
 * Creates a middleware function that checks if the authenticated user has
 * one of the allowed roles. This middleware should be used after the
 * authenticate middleware, which attaches the user object to the request.
 *
 * @param roles - Variable number of Role enum values that are allowed to access the endpoint
 * @returns Express middleware function that validates user role
 * @throws {AuthorizationError} When user is not authenticated or lacks required role
 *
 * @example
 * // Allow only ADMIN users
 * router.post('/admin-only', authenticate, authorize(Role.ADMIN), controller);
 *
 * @example
 * // Allow ADMIN and SAMPLING_HEAD users
 * router.patch('/update-status', authenticate, authorize(Role.ADMIN, Role.SAMPLING_HEAD), controller);
 */
export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated (req.user should be set by authenticate middleware)
      if (!req.user) {
        throw new AuthorizationError("Authentication required");
      }

      // Debug logging
      console.log(
        `🔐 Authorization check: User role: ${req.user.role}, Allowed roles: ${roles.join(", ")}`,
      );

      // Check if user's role is in the allowed roles array
      if (!roles.includes(req.user.role)) {
        console.log(
          `❌ Authorization failed: ${req.user.role} not in [${roles.join(", ")}]`,
        );
        throw new AuthorizationError("Insufficient permissions");
      }

      console.log(`✓ Authorization successful for ${req.user.role}`);
      // User has required role, proceed to next middleware
      next();
    } catch (error) {
      // Pass error to error handler middleware
      next(error);
    }
  };
};
