import { Request, Response, NextFunction } from "express";
/**
 * Sample Request Controller
 * Handles HTTP requests for sample request endpoints
 */
export declare class SampleRequestController {
    /**
     * Create a new sample request
     * POST /api/sample-requests
     */
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get all sample requests with filtering and pagination
     * GET /api/sample-requests
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get sample request by ID
     * GET /api/sample-requests/:id
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update sample request
     * PUT /api/sample-requests/:id
     */
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update item status
     * PATCH /api/sample-requests/:requestId/items/:itemId/status
     */
    updateItemStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Delete sample request
     * DELETE /api/sample-requests/:id
     */
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const sampleRequestController: SampleRequestController;
//# sourceMappingURL=sampleRequestController.d.ts.map