import multer from "multer";
import { uploadService } from "../services/uploadService.js";
import handleResponse from "../middleware/handleResponse.js";
/**
 * Configure multer for memory storage
 * Files are stored in memory as Buffer objects for direct upload to ImageKit
 */
const storage = multer.memoryStorage();
/**
 * Multer middleware configuration
 * - Uses memory storage for temporary file handling
 * - Limits file size to 5MB per file
 */
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
    },
});
/**
 * Upload Controller
 * Handles HTTP requests for file upload endpoints
 */
export class UploadController {
    /**
     * Upload multiple files to ImageKit
     * POST /api/upload
     * @param req - Express request with files from multer
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    async uploadFiles(req, res, next) {
        try {
            // Check if files were uploaded
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No files uploaded",
                });
            }
            // Upload files to ImageKit
            const urls = await uploadService.uploadFiles(req.files);
            // Return array of ImageKit URLs
            handleResponse(res, 200, "Files uploaded successfully", urls);
        }
        catch (error) {
            next(error);
        }
    }
}
export const uploadController = new UploadController();
//# sourceMappingURL=uploadController.js.map