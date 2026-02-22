import { authService } from "../services/authService.js";
import handleResponse from "../middleware/handleResponse.js";
/**
 * Auth Controller
 * Handles HTTP requests for authentication endpoints (register, login)
 */
export class AuthController {
    /**
     * Register a new user
     * POST /api/auth/register
     * @param req - Express request with RegisterDTO in body
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);
            handleResponse(res, 201, "User registered successfully", user);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Login user and return JWT token
     * POST /api/auth/login
     * @param req - Express request with LoginDTO in body
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            handleResponse(res, 200, "Login successful", result);
        }
        catch (error) {
            next(error);
        }
    }
}
export const authController = new AuthController();
//# sourceMappingURL=authController.js.map