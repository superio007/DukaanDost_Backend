import { Request, Response, NextFunction } from "express";
import { Role } from "../types/enums.js";
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
export declare const authorize: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=rbac.d.ts.map