import { Router } from "express";
import { inventoryController } from "../controllers/inventoryController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";
import { Role } from "../types/enums.js";
import {
  createInventoryValidator,
  updateInventoryValidator,
} from "../validators/inventoryValidators.js";

const router = Router();

/**
 * POST /api/inventory
 * Create a new inventory record
 * Auth: Required
 * Roles: ADMIN
 * Requirements: 9.1
 */
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  createInventoryValidator,
  inventoryController.create.bind(inventoryController),
);

/**
 * GET /api/inventory
 * Get all inventory records
 * Auth: Required
 * Roles: All authenticated users
 * Requirements: 9.4
 */
router.get(
  "/",
  authenticate,
  inventoryController.findAll.bind(inventoryController),
);

/**
 * GET /api/inventory/:id
 * Get a single inventory record by ID
 * Auth: Required
 * Roles: All authenticated users
 */
router.get(
  "/:id",
  authenticate,
  inventoryController.findById.bind(inventoryController),
);

/**
 * PUT /api/inventory/:id
 * Update inventory record
 * Auth: Required
 * Roles: ADMIN
 * Requirements: 9.5
 */
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  updateInventoryValidator,
  inventoryController.update.bind(inventoryController),
);

export default router;
