import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { registerValidator, loginValidator, } from "../validators/authValidators.js";
const router = Router();
/**
 * POST /api/auth/register
 * Register a new user
 * Auth: Not required
 * Requirements: 1.1
 */
router.post("/register", registerValidator, authController.register.bind(authController));
/**
 * POST /api/auth/login
 * Login user and get JWT token
 * Auth: Not required
 * Requirements: 2.1
 */
router.post("/login", loginValidator, authController.login.bind(authController));
export default router;
//# sourceMappingURL=authRoutes.js.map