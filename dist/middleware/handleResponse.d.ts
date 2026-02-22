import { Response } from "express";
/**
 * Centralized response handler for success responses
 * @param res - Express response object
 * @param statusCode - HTTP status code (200, 201, etc.)
 * @param message - Success message
 * @param data - Response payload data
 */
declare const handleResponse: (res: Response, statusCode: number, message: string, data?: any) => void;
export default handleResponse;
//# sourceMappingURL=handleResponse.d.ts.map