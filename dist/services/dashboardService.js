import { SampleRequest } from "../models/SampleRequest.js";
import { ItemStatus } from "../types/enums.js";
/**
 * Dashboard Service
 * Provides analytics and statistics for the dashboard
 */
export class DashboardService {
    /**
     * Get dashboard statistics using MongoDB aggregation
     * Calculates:
     * - totalSampleRequests: Count of all sample requests
     * - pendingSamples: Count of items with REQUESTED or IN_SAMPLING status
     * - sentToday: Count of items with SENT status updated today
     * - approvalRatePercentage: (APPROVED / (APPROVED + REJECTED)) * 100, or 0 if none
     * @returns Dashboard statistics
     */
    async getStatistics() {
        try {
            // Get total sample requests count
            const totalSampleRequests = await SampleRequest.countDocuments();
            // Get start of today (midnight)
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            // Use aggregation pipeline for efficient calculation
            const stats = await SampleRequest.aggregate([
                // Unwind items array to work with individual items
                { $unwind: "$items" },
                // Project fields we need
                {
                    $project: {
                        status: "$items.status",
                        statusHistory: "$items.statusHistory",
                    },
                },
                // Group and calculate statistics
                {
                    $group: {
                        _id: null,
                        // Count pending samples (REQUESTED or IN_SAMPLING)
                        pendingSamples: {
                            $sum: {
                                $cond: [
                                    {
                                        $in: [
                                            "$status",
                                            [ItemStatus.REQUESTED, ItemStatus.IN_SAMPLING],
                                        ],
                                    },
                                    1,
                                    0,
                                ],
                            },
                        },
                        // Count items sent today
                        sentToday: {
                            $sum: {
                                $cond: [
                                    {
                                        $and: [
                                            { $eq: ["$status", ItemStatus.SENT] },
                                            {
                                                $gte: [
                                                    {
                                                        $arrayElemAt: [
                                                            "$statusHistory.timestamp",
                                                            { $subtract: [{ $size: "$statusHistory" }, 1] },
                                                        ],
                                                    },
                                                    startOfToday,
                                                ],
                                            },
                                        ],
                                    },
                                    1,
                                    0,
                                ],
                            },
                        },
                        // Count approved items
                        approvedCount: {
                            $sum: {
                                $cond: [{ $eq: ["$status", ItemStatus.APPROVED] }, 1, 0],
                            },
                        },
                        // Count rejected items
                        rejectedCount: {
                            $sum: {
                                $cond: [{ $eq: ["$status", ItemStatus.REJECTED] }, 1, 0],
                            },
                        },
                    },
                },
            ]);
            // Extract results or use defaults
            const result = stats[0] || {
                pendingSamples: 0,
                sentToday: 0,
                approvedCount: 0,
                rejectedCount: 0,
            };
            // Calculate approval rate percentage
            const totalDecided = result.approvedCount + result.rejectedCount;
            const approvalRatePercentage = totalDecided > 0 ? (result.approvedCount / totalDecided) * 100 : 0;
            return {
                totalSampleRequests,
                pendingSamples: result.pendingSamples,
                sentToday: result.sentToday,
                approvalRatePercentage: Math.round(approvalRatePercentage * 100) / 100, // Round to 2 decimal places
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export const dashboardService = new DashboardService();
//# sourceMappingURL=dashboardService.js.map