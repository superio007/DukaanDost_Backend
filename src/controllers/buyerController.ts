import { Request, Response, NextFunction } from "express";
import { buyerService } from "../services/buyerService.js";
import handleResponse from "../middleware/handleResponse.js";

/**
 * Buyer Controller
 * Handles HTTP requests for buyer endpoints
 */
export class BuyerController {
  /**
   * Create a new buyer
   * POST /api/buyers
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const buyer = await buyerService.create(req.body);
      handleResponse(res, 201, "Buyer created successfully", buyer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all buyers with filtering and pagination
   * GET /api/buyers
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

      const filters = {
        name: req.query.name as string,
        email: req.query.email as string,
      };

      const result = await buyerService.findAll(filters, { page, limit });
      handleResponse(res, 200, "Buyers retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get buyer by ID
   * GET /api/buyers/:id
   */
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const buyer = await buyerService.findById(id);
      handleResponse(res, 200, "Buyer retrieved successfully", buyer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update buyer
   * PUT /api/buyers/:id
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const buyer = await buyerService.update(id, req.body);
      handleResponse(res, 200, "Buyer updated successfully", buyer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete buyer (soft delete)
   * DELETE /api/buyers/:id
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user?.userId as string;
      await buyerService.delete(id, userId);
      handleResponse(res, 200, "Buyer deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get active buyers (for dropdown)
   * GET /api/buyers/active
   */
  async findActive(req: Request, res: Response, next: NextFunction) {
    try {
      const buyers = await buyerService.findActive();
      handleResponse(res, 200, "Active buyers retrieved successfully", buyers);
    } catch (error) {
      next(error);
    }
  }
}

export const buyerController = new BuyerController();
