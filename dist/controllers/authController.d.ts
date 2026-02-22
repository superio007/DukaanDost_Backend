import { Request, Response, NextFunction } from "express";
/**
 * Auth Controller
 * Handles HTTP requests for authentication endpoints (register, login)
 */
export declare class AuthController {
    /**
     * Register a new user
     * POST /api/auth/register
     * @param req - Express request with RegisterDTO in body
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Login user and return JWT token
     * POST /api/auth/login
     * @param req - Express request with LoginDTO in body
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const authController: AuthController;
//# sourceMappingURL=authController.d.ts.map