import { Request, Response, NextFunction } from "express";
import { sampleRequestService } from "../services/sampleRequestService.js";
import handleResponse from "../middleware/handleResponse.js";
import { ItemStatus } from "../types/enums.js";

/**
 * Sample Request Controller
 * Handles HTTP requests for sample request endpoints
 */
export class SampleRequestController {
  /**
   * Create a new sample request
   * POST /api/sample-requests
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const sampleRequest = await sampleRequestService.create(req.body, userId);
      handleResponse(
        res,
        201,
        "Sample request created successfully",
        sampleRequest,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all sample requests with filtering and pagination
   * GET /api/sample-requests
   * Role-based filtering: SALES users see only their own requests
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        buyerName: req.query.buyerName as string,
        status: req.query.status as ItemStatus,
        priority: req.query.priority as any,
      };

      const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
      };

      const userId = req.user!.userId;
      const userRole = req.user!.role;

      const result = await sampleRequestService.findAll(
        filters,
        pagination,
        userId,
        userRole,
      );
      handleResponse(
        res,
        200,
        "Sample requests retrieved successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get sample request by ID
   * GET /api/sample-requests/:id
   * Role-based access: SALES users can only view their own requests
   */
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.userId;
      const userRole = req.user!.role;

      const sampleRequest = await sampleRequestService.findById(
        id,
        userId,
        userRole,
      );
      handleResponse(
        res,
        200,
        "Sample request retrieved successfully",
        sampleRequest,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update sample request
   * PUT /api/sample-requests/:id
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const sampleRequest = await sampleRequestService.update(id, req.body);
      handleResponse(
        res,
        200,
        "Sample request updated successfully",
        sampleRequest,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update item status
   * PATCH /api/sample-requests/:requestId/items/:itemId/status
   */
  async updateItemStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const requestId = req.params.requestId as string;
      const itemId = req.params.itemId as string;
      const { status } = req.body;
      const userId = req.user!.userId;

      const sampleRequest = await sampleRequestService.updateItemStatus(
        requestId,
        itemId,
        status,
        userId,
      );
      handleResponse(
        res,
        200,
        "Item status updated successfully",
        sampleRequest,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete sample request
   * DELETE /api/sample-requests/:id
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.userId;
      await sampleRequestService.delete(id, userId);
      handleResponse(res, 200, "Sample request deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const sampleRequestController = new SampleRequestController();
