import ImageKit from "imagekit";
import { config } from "../config/index.js";
/**
 * Upload Service
 * Handles file uploads to ImageKit CDN
 */
class UploadService {
    constructor() {
        // Initialize ImageKit client with environment variables
        this.imagekit = new ImageKit({
            publicKey: config.imagekit.publicKey,
            privateKey: config.imagekit.privateKey,
            urlEndpoint: config.imagekit.urlEndpoint,
        });
    }
    /**
     * Upload multiple files to ImageKit
     * @param files - Array of multer files
     * @returns Promise<string[]> - Array of ImageKit URLs
     */
    async uploadFiles(files) {
        const uploadPromises = files.map((file) => this.uploadSingleFile(file));
        const results = await Promise.all(uploadPromises);
        return results.map((result) => result.url);
    }
    /**
     * Upload a single file to ImageKit
     * @param file - Multer file object
     * @returns Promise with ImageKit upload response
     */
    async uploadSingleFile(file) {
        // Validate file before upload
        this.validateFile(file);
        // Upload to ImageKit
        const result = await this.imagekit.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname,
            folder: "/fabric-samples",
        });
        return result;
    }
    /**
     * Validate file type and size
     * @param file - Multer file object
     * @throws Error if validation fails
     */
    validateFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        // Check file size
        if (file.size > maxSize) {
            throw new Error(`File ${file.originalname} exceeds maximum size of 5MB`);
        }
        // Optional: Add file type validation if needed
        // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        // if (!allowedTypes.includes(file.mimetype)) {
        //   throw new Error(`File type ${file.mimetype} is not allowed`);
        // }
    }
}
export const uploadService = new UploadService();
//# sourceMappingURL=uploadService.js.map