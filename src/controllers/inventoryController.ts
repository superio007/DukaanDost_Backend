import { Request, Response, NextFunction } from "express";
import { inventoryService } from "../services/inventoryService.js";
import handleResponse from "../middleware/handleResponse.js";

/**
 * Inventory Controller
 * Handles HTTP requests for inventory endpoints (create, findAll, update)
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
   * Retrieve all inventory records
   * GET /api/inventory
   * @param req - Express request
   * @param res - Express response
   * @param next - Express next function for error handling
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await inventoryService.findAll();
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
}

export const inventoryController = new InventoryController();
