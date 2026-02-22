import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";
/**
 * Validator for user registration
 * Requirements: 1.2, 1.4, 1.6, 2.2, 2.6, 14.1, 14.4, 30.1, 30.2
 */
export const registerValidator = [
    body("name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail()
        .toLowerCase(),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["ADMIN", "SAMPLING_HEAD", "SALES"])
        .withMessage("Role must be one of: ADMIN, SAMPLING_HEAD, SALES"),
    validateRequest,
];
/**
 * Validator for user login
 * Requirements: 2.2, 2.6, 14.1, 14.4, 30.1, 30.2
 */
export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail()
        .toLowerCase(),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest,
];
//# sourceMappingURL=authValidators.js.map