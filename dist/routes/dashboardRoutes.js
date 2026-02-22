import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
/**
 * GET /api/dashboard/stats
 * Get dashboard statistics
 * Auth: Required
 * Roles: All authenticated users
 * Requirements: 12.1
 */
router.get("/stats", authenticate, dashboardController.getStatistics.bind(dashboardController));
export default router;
//# sourceMappingURL=dashboardRoutes.js.map