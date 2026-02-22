import { Router } from "express";
import { uploadController, upload } from "../controllers/uploadController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/upload
 * Upload multiple files to ImageKit
 * Auth: Required
 * Roles: All authenticated users
 * Requirements: 11.1
 */
router.post(
  "/",
  authenticate,
  upload.array("files"),
  uploadController.uploadFiles.bind(uploadController),
);

export default router;
