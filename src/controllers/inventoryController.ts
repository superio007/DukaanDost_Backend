import { Request, Response, NextFunction } from "express";
import { inventoryService } from "../services/inventoryService.js";
import handleResponse from "../middleware/handleResponse.js";

/**
 * Inventory Controller
 * Handles HTTP requests for inventory endpoints (create, findAll, update, delete)
 */
export class InventoryController {
  /**
   * Create a new inventory record
   * POST /api/inventory
   * @param req - Express request with CreateInventoryDTO in body
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await inventoryService.create(req.body);
      handleResponse(res, 201, "Inventory created successfully", inventory);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve all inventory records with filtering and pagination
   * GET /api/inventory
   * @param req - Express request with query params (page, limit, fabricName, color, gsm)
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

      const filters = {
        fabricName: req.query.fabricName as string,
        color: req.query.color as string,
        gsm: req.query.gsm ? parseInt(req.query.gsm as string) : undefined,
      };

      const result = await inventoryService.findAll(filters, { page, limit });
      handleResponse(res, 200, "Inventory retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve a single inventory record by ID
   * GET /api/inventory/:id
   * @param req - Express request with id in params
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const inventory = await inventoryService.findById(id);
      handleResponse(res, 200, "Inventory retrieved successfully", inventory);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update inventory record
   * PUT /api/inventory/:id
   * @param req - Express request with UpdateInventoryDTO in body and id in params
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const inventory = await inventoryService.update(id, req.body);
      handleResponse(res, 200, "Inventory updated successfully", inventory);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Soft delete inventory record
   * DELETE /api/inventory/:id
   * @param req - Express request with id in params
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user?.userId as string;
      await inventoryService.delete(id, userId);
      handleResponse(res, 200, "Inventory deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const inventoryController = new InventoryController();
