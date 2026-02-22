/**
 * Upload Service
 * Handles file uploads to ImageKit CDN
 */
declare class UploadService {
    private imagekit;
    constructor();
    /**
     * Upload multiple files to ImageKit
     * @param files - Array of multer files
     * @returns Promise<string[]> - Array of ImageKit URLs
     */
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
    /**
     * Upload a single file to ImageKit
     * @param file - Multer file object
     * @returns Promise with ImageKit upload response
     */
    private uploadSingleFile;
    /**
     * Validate file type and size
     * @param file - Multer file object
     * @throws Error if validation fails
     */
    validateFile(file: Express.Multer.File): void;
}
export declare const uploadService: UploadService;
export {};
//# sourceMappingURL=uploadService.d.ts.map