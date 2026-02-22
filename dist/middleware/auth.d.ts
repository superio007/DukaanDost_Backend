import { Request, Response, NextFunction } from "express";
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
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map