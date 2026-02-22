import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "./errorHandler.js";

/**
 * Middleware to validate request using express-validator
 * Runs validation checks and returns 400 with field-specific errors if validation fails
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Transform express-validator errors to our format
    const formattedErrors = errors.array().map((error) => ({
      field: error.type === "field" ? error.path : "unknown",
      message: error.msg,
    }));

    // Throw ValidationError which will be caught by global error handler
    throw new ValidationError("Validation failed", formattedErrors);
  }

  next();
};
