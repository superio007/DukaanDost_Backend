import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";

/**
 * Validator for creating inventory records
 * Requirements: 9.2, 9.3, 14.1, 14.3, 30.1, 30.2
 */
export const createInventoryValidator = [
  body("fabricName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fabric name is required")
    .isString()
    .withMessage("Fabric name must be a string"),

  body("color")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Color is required")
    .isString()
    .withMessage("Color must be a string"),

  body("gsm")
    .notEmpty()
    .withMessage("GSM is required")
    .isNumeric()
    .withMessage("GSM must be a number")
    .custom((value) => value >= 0)
    .withMessage("GSM must be non-negative"),

  body("availableMeters")
    .notEmpty()
    .withMessage("Available meters is required")
    .isNumeric()
    .withMessage("Available meters must be a number")
    .custom((value) => value > 0)
    .withMessage("Available meters must be positive"),

  validateRequest,
];

/**
 * Validator for updating inventory records
 * Requirements: 9.6, 14.1, 14.3
 */
export const updateInventoryValidator = [
  body("availableMeters")
    .notEmpty()
    .withMessage("Available meters is required")
    .isNumeric()
    .withMessage("Available meters must be a number")
    .custom((value) => value >= 0)
    .withMessage("Available meters must be non-negative"),

  validateRequest,
];
