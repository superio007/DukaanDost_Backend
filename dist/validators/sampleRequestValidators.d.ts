/**
 * Validator for creating sample requests
 * Requirements: 4.2, 4.3, 4.4, 4.5, 14.1, 14.2, 14.3, 30.1, 30.2
 */
export declare const createSampleRequestValidator: (((req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void) | import("express-validator").ValidationChain)[];
/**
 * Validator for updating sample requests
 * Requirements: 6.2, 14.1, 14.2, 14.3, 30.1, 30.2
 */
export declare const updateSampleRequestValidator: (((req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void) | import("express-validator").ValidationChain)[];
/**
 * Validator for updating item status
 * Requirements: 7.2, 14.2, 14.6
 */
export declare const updateItemStatusValidator: (((req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void) | import("express-validator").ValidationChain)[];
/**
 * Validator for pagination parameters
 * Requirements: 23.1, 23.2, 23.3
 */
export declare const paginationValidator: (((req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void) | import("express-validator").ValidationChain)[];
/**
 * Validator for sample request filter parameters
 * Requirements: 30.1, 30.2, 30.3, 30.4
 */
export declare const filterValidator: (((req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void) | import("express-validator").ValidationChain)[];
//# sourceMappingURL=sampleRequestValidators.d.ts.map