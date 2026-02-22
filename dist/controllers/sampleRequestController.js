import { sampleRequestService } from "../services/sampleRequestService.js";
import handleResponse from "../middleware/handleResponse.js";
/**
 * Sample Request Controller
 * Handles HTTP requests for sample request endpoints
 */
export class SampleRequestController {
    /**
     * Create a new sample request
     * POST /api/sample-requests
     */
    async create(req, res, next) {
        try {
            const userId = req.user.userId;
            const sampleRequest = await sampleRequestService.create(req.body, userId);
            handleResponse(res, 201, "Sample request created successfully", sampleRequest);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get all sample requests with filtering and pagination
     * GET /api/sample-requests
     */
    async findAll(req, res, next) {
        try {
            const filters = {
                buyerName: req.query.buyerName,
                status: req.query.status,
                priority: req.query.priority,
            };
            const pagination = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
            };
            const result = await sampleRequestService.findAll(filters, pagination);
            handleResponse(res, 200, "Sample requests retrieved successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get sample request by ID
     * GET /api/sample-requests/:id
     */
    async findById(req, res, next) {
        try {
            const id = req.params.id;
            const sampleRequest = await sampleRequestService.findById(id);
            handleResponse(res, 200, "Sample request retrieved successfully", sampleRequest);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update sample request
     * PUT /api/sample-requests/:id
     */
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const sampleRequest = await sampleRequestService.update(id, req.body);
            handleResponse(res, 200, "Sample request updated successfully", sampleRequest);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update item status
     * PATCH /api/sample-requests/:requestId/items/:itemId/status
     */
    async updateItemStatus(req, res, next) {
        try {
            const requestId = req.params.requestId;
            const itemId = req.params.itemId;
            const { status } = req.body;
            const userId = req.user.userId;
            const sampleRequest = await sampleRequestService.updateItemStatus(requestId, itemId, status, userId);
            handleResponse(res, 200, "Item status updated successfully", sampleRequest);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Delete sample request
     * DELETE /api/sample-requests/:id
     */
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await sampleRequestService.delete(id);
            handleResponse(res, 200, "Sample request deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
export const sampleRequestController = new SampleRequestController();
//# sourceMappingURL=sampleRequestController.js.map