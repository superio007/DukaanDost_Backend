import { Router } from "express";
import { sampleRequestController } from "../controllers/sampleRequestController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";
import { Role } from "../types/enums.js";
import { createSampleRequestValidator, updateSampleRequestValidator, updateItemStatusValidator, paginationValidator, filterValidator, } from "../validators/sampleRequestValidators.js";
const router = Router();
/**
 * POST /api/sample-requests
 * Create a new sample request
 * Auth: Required
 * Roles: SALES, ADMIN
 * Requirements: 4.1, 5.1
 */
router.post("/", authenticate, authorize(Role.SALES, Role.ADMIN), createSampleRequestValidator, sampleRequestController.create.bind(sampleRequestController));
/**
 * GET /api/sample-requests
 * Get all sample requests with filtering and pagination
 * Auth: Required
 * Roles: All authenticated users
 * Requirements: 5.1, 5.5, 30.3, 30.4
 */
router.get("/", authenticate, paginationValidator, filterValidator, sampleRequestController.findAll.bind(sampleRequestController));
/**
 * GET /api/sample-requests/:id
 * Get sample request by ID
 * Auth: Required
 * Roles: All authenticated users
 * Requirements: 5.5
 */
router.get("/:id", authenticate, sampleRequestController.findById.bind(sampleRequestController));
/**
 * PUT /api/sample-requests/:id
 * Update sample request
 * Auth: Required
 * Roles: ADMIN
 * Requirements: 6.1
 */
router.put("/:id", authenticate, authorize(Role.ADMIN), updateSampleRequestValidator, sampleRequestController.update.bind(sampleRequestController));
/**
 * DELETE /api/sample-requests/:id
 * Delete sample request
 * Auth: Required
 * Roles: ADMIN
 * Requirements: 8.1
 */
router.delete("/:id", authenticate, authorize(Role.ADMIN), sampleRequestController.delete.bind(sampleRequestController));
/**
 * PATCH /api/sample-requests/:requestId/items/:itemId/status
 * Update item status
 * Auth: Required
 * Roles: SAMPLING_HEAD, ADMIN
 * Requirements: 7.1
 */
router.patch("/:requestId/items/:itemId/status", authenticate, authorize(Role.SAMPLING_HEAD, Role.ADMIN), updateItemStatusValidator, sampleRequestController.updateItemStatus.bind(sampleRequestController));
export default router;
//# sourceMappingURL=sampleRequestRoutes.js.map