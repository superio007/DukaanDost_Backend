import { Request, Response, NextFunction } from "express";
import multer from "multer";
/**
 * Multer middleware configuration
 * - Uses memory storage for temporary file handling
 * - Limits file size to 5MB per file
 */
export declare const upload: multer.Multer;
/**
 * Upload Controller
 * Handles HTTP requests for file upload endpoints
 */
export declare class UploadController {
    /**
     * Upload multiple files to ImageKit
     * POST /api/upload
     * @param req - Express request with files from multer
     * @param res - Express response
     * @param next - Express next function for error handling
     */
    uploadFiles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const uploadController: UploadController;
//# sourceMappingURL=uploadController.d.ts.map