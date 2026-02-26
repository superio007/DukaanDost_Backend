import ImageKit from "imagekit";
import { config } from "../config/index.js";
import { PayloadTooLargeError } from "../middleware/errorHandler.js";

/**
 * Upload Service
 * Handles file uploads to ImageKit CDN
 */
class UploadService {
  private imagekit: ImageKit;

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
  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadSingleFile(file));
    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.url);
  }

  /**
   * Upload a single file to ImageKit
   * @param file - Multer file object
   * @returns Promise with ImageKit upload response
   */
  private async uploadSingleFile(file: Express.Multer.File) {
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
   * Delete a single file from ImageKit
   * @param fileUrl - ImageKit file URL
   * @returns Promise<void>
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract fileId from URL
      const fileId = this.extractFileIdFromUrl(fileUrl);

      if (!fileId) {
        console.warn(`Could not extract fileId from URL: ${fileUrl}`);
        return;
      }

      await this.imagekit.deleteFile(fileId);
    } catch (error: any) {
      console.error(`Failed to delete file from ImageKit: ${fileUrl}`, error);
      // Don't throw error - log and continue
      // This prevents deletion failures from blocking the main operation
    }
  }

  /**
   * Delete multiple files from ImageKit
   * @param fileUrls - Array of ImageKit file URLs
   * @returns Promise<void>
   */
  async deleteFiles(fileUrls: string[]): Promise<void> {
    const deletePromises = fileUrls.map((url) => this.deleteFile(url));
    await Promise.allSettled(deletePromises);
  }

  /**
   * Extract fileId from ImageKit URL
   * @param fileUrl - ImageKit file URL
   * @returns fileId or null
   */
  private extractFileIdFromUrl(fileUrl: string): string | null {
    try {
      // ImageKit URL format: https://ik.imagekit.io/your_imagekit_id/path/to/file.jpg
      // We need to extract the path after the imagekit_id
      const urlObj = new URL(fileUrl);
      const pathname = urlObj.pathname;

      // Remove leading slash and get the path after imagekit_id
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        // Join all parts after the imagekit_id
        return parts.slice(1).join("/");
      }

      return null;
    } catch (error) {
      console.error("Error extracting fileId from URL:", error);
      return null;
    }
  }

  /**
   * Validate file type and size
   * @param file - Multer file object
   * @throws PayloadTooLargeError if file exceeds size limit
   */
  validateFile(file: Express.Multer.File): void {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    // Check file size
    if (file.size > maxSize) {
      throw new PayloadTooLargeError(
        `File ${file.originalname} exceeds maximum size of 5MB`,
      );
    }

    // Optional: Add file type validation if needed
    // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    // if (!allowedTypes.includes(file.mimetype)) {
    //   throw new Error(`File type ${file.mimetype} is not allowed`);
    // }
  }
}

export const uploadService = new UploadService();
