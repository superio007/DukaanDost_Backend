import { DashboardStats } from "../types/dtos.js";
/**
 * Dashboard Service
 * Provides analytics and statistics for the dashboard
 */
export declare class DashboardService {
    /**
     * Get dashboard statistics using MongoDB aggregation
     * Calculates:
     * - totalSampleRequests: Count of all sample requests
     * - pendingSamples: Count of items with REQUESTED or IN_SAMPLING status
     * - sentToday: Count of items with SENT status updated today
     * - approvalRatePercentage: (APPROVED / (APPROVED + REJECTED)) * 100, or 0 if none
     * @returns Dashboard statistics
     */
    getStatistics(): Promise<DashboardStats>;
}
export declare const dashboardService: DashboardService;
//# sourceMappingURL=dashboardService.d.ts.map