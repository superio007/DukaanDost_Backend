import { Request, Response, NextFunction } from "express";
/**
 * Inventory Controller
 * Handles HTTP requests for inventory endpoints (create, findAll, update)
 */
export declare class InventoryController {
    /**
     * Create a new inventory record
     * POST /api/inventory
     * @param req - Express request with CreateInventoryDTO in body
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Retrieve all inventory records
     * GET /api/inventory
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update inventory record
     * PUT /api/inventory/:id
     * @param req - Express request with UpdateInventoryDTO in body and id in params
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const inventoryController: InventoryController;
//# sourceMappingURL=inventoryController.d.ts.map