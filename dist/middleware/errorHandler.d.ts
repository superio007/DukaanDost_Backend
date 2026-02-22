import { Request, Response, NextFunction } from "express";
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly errors?: Array<{
        field: string;
        message: string;
    }>;
    constructor(message: string, statusCode: number, errors?: Array<{
        field: string;
        message: string;
    }>);
}
export declare class ValidationError extends AppError {
    constructor(message?: string, errors?: Array<{
        field: string;
        message: string;
    }>);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class PayloadTooLargeError extends AppError {
    constructor(message?: string);
}
declare const errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map