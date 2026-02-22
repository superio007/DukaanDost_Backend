import { dashboardService } from "../services/dashboardService.js";
import handleResponse from "../middleware/handleResponse.js";
/**
 * Dashboard Controller
 * Handles HTTP requests for dashboard endpoints (statistics)
 */
export class DashboardController {
    /**
     * Get dashboard statistics
     * GET /api/dashboard/statistics
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    async getStatistics(req, res, next) {
        try {
            const stats = await dashboardService.getStatistics();
            handleResponse(res, 200, "Dashboard statistics retrieved successfully", stats);
        }
        catch (error) {
            next(error);
        }
    }
}
export const dashboardController = new DashboardController();
//# sourceMappingURL=dashboardController.js.map