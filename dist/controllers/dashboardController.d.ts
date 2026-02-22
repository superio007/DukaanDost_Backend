import { Request, Response, NextFunction } from "express";
/**
 * Dashboard Controller
 * Handles HTTP requests for dashboard endpoints (statistics)
 */
export declare class DashboardController {
    /**
     * Get dashboard statistics
     * GET /api/dashboard/statistics
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    getStatistics(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const dashboardController: DashboardController;
//# sourceMappingURL=dashboardController.d.ts.map