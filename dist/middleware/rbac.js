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
export const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            // Check if user is authenticated (req.user should be set by authenticate middleware)
            if (!req.user) {
                throw new AuthorizationError("Authentication required");
            }
            // Check if user's role is in the allowed roles array
            if (!roles.includes(req.user.role)) {
                throw new AuthorizationError("Insufficient permissions");
            }
            // User has required role, proceed to next middleware
            next();
        }
        catch (error) {
            // Pass error to error handler middleware
            next(error);
        }
    };
};
//# sourceMappingURL=rbac.js.map