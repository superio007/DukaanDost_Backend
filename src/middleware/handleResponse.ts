import { Response } from "express";

/**
 * Centralized response handler for success responses
 * @param res - Express response object
 * @param statusCode - HTTP status code (200, 201, etc.)
 * @param message - Success message
 * @param data - Response payload data
 */
const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default handleResponse;
