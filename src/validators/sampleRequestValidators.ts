import { body, param, query } from "express-validator";
import { Priority, ItemStatus } from "../types/enums.js";
import { validateRequest } from "../middleware/validateRequest.js";

/**
 * Validator for creating sample requests
 * Requirements: 4.2, 4.3, 4.4, 4.5, 14.1, 14.2, 14.3
 */
export const createSampleRequestValidator = [
  body("buyerName")
    .trim()
    .notEmpty()
    .withMessage("Buyer name is required")
    .isString()
    .withMessage("Buyer name must be a string"),

  body("contactPerson")
    .trim()
    .notEmpty()
    .withMessage("Contact person is required")
    .isString()
    .withMessage("Contact person must be a string"),

  body("requiredByDate")
    .notEmpty()
    .withMessage("Required by date is required")
    .isISO8601()
    .withMessage("Required by date must be a valid ISO 8601 date"),

  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(Object.values(Priority))
    .withMessage(
      `Priority must be one of: ${Object.values(Priority).join(", ")}`,
    ),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items array must contain at least one item"),

  body("items.*.fabricName")
    .trim()
    .notEmpty()
    .withMessage("Fabric name is required for each item")
    .isString()
    .withMessage("Fabric name must be a string"),

  body("items.*.color")
    .trim()
    .notEmpty()
    .withMessage("Color is required for each item")
    .isString()
    .withMessage("Color must be a string"),

  body("items.*.gsm")
    .notEmpty()
    .withMessage("GSM is required for each item")
    .isNumeric()
    .withMessage("GSM must be a number")
    .custom((value) => value >= 0)
    .withMessage("GSM must be non-negative"),

  body("items.*.requiredMeters")
    .notEmpty()
    .withMessage("Required meters is required for each item")
    .isNumeric()
    .withMessage("Required meters must be a number")
    .custom((value) => value > 0)
    .withMessage("Required meters must be positive"),

  body("items.*.availableMeters")
    .notEmpty()
    .withMessage("Available meters is required for each item")
    .isNumeric()
    .withMessage("Available meters must be a number")
    .custom((value) => value >= 0)
    .withMessage("Available meters must be non-negative"),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array"),

  body("attachments.*")
    .optional()
    .isString()
    .withMessage("Each attachment must be a string URL"),

  validateRequest,
];

/**
 * Validator for updating sample requests
 * Requirements: 6.2, 14.1, 14.2, 14.3
 */
export const updateSampleRequestValidator = [
  body("buyerName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Buyer name cannot be empty")
    .isString()
    .withMessage("Buyer name must be a string"),

  body("contactPerson")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Contact person cannot be empty")
    .isString()
    .withMessage("Contact person must be a string"),

  body("requiredByDate")
    .optional()
    .isISO8601()
    .withMessage("Required by date must be a valid ISO 8601 date"),

  body("priority")
    .optional()
    .isIn(Object.values(Priority))
    .withMessage(
      `Priority must be one of: ${Object.values(Priority).join(", ")}`,
    ),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array"),

  body("attachments.*")
    .optional()
    .isString()
    .withMessage("Each attachment must be a string URL"),

  validateRequest,
];

/**
 * Validator for updating item status
 * Requirements: 7.2, 14.2, 14.6
 */
export const updateItemStatusValidator = [
  param("requestId")
    .notEmpty()
    .withMessage("Request ID is required")
    .isMongoId()
    .withMessage("Request ID must be a valid MongoDB ObjectId"),

  param("itemId")
    .notEmpty()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Item ID must be a valid MongoDB ObjectId"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(ItemStatus))
    .withMessage(
      `Status must be one of: ${Object.values(ItemStatus).join(", ")}`,
    ),

  validateRequest,
];

/**
 * Validator for pagination parameters
 * Requirements: 23.1, 23.2, 23.3
 */
export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a positive integer with maximum of 100"),

  validateRequest,
];
