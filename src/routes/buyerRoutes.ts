import { Router } from "express";
import { buyerController } from "../controllers/buyerController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";
import { Role } from "../types/enums.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get active buyers (all authenticated users can access)
router.get("/active", buyerController.findActive.bind(buyerController));

// Admin-only routes
router.post(
  "/",
  authorize(Role.ADMIN),
  buyerController.create.bind(buyerController),
);

router.get(
  "/",
  authorize(Role.ADMIN),
  buyerController.findAll.bind(buyerController),
);

router.get(
  "/:id",
  authorize(Role.ADMIN),
  buyerController.findById.bind(buyerController),
);

router.put(
  "/:id",
  authorize(Role.ADMIN),
  buyerController.update.bind(buyerController),
);

router.delete(
  "/:id",
  authorize(Role.ADMIN),
  buyerController.delete.bind(buyerController),
);

export default router;
