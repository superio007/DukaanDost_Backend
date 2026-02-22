import { Request, Response, NextFunction } from "express";
/**
 * Middleware to validate request using express-validator
 * Runs validation checks and returns 400 with field-specific errors if validation fails
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6
 */
export declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map