/**
 * Environment Configuration Module
 *
 * This module exports a centralized configuration object and validates
 * that all required environment variables are present at startup.
 */

// List of required environment variables
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

/**
 * Validates that all required environment variables are present.
 * Exits the process with error code 1 if any required variables are missing.
 */
export const validateEnv = (): void => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error(
      "Missing required environment variables:",
      missing.join(", "),
    );
    console.error(
      "Please check your .env file and ensure all required variables are set.",
    );
    process.exit(1);
  }

  // Validate CORS_ORIGIN is set in production (not wildcard)
  if (process.env.NODE_ENV === "production" && !process.env.CORS_ORIGIN) {
    console.error(
      "CORS_ORIGIN must be set to a specific origin in production (not wildcard '*')",
    );
    console.error(
      "Please set CORS_ORIGIN in your .env file to your frontend application URL.",
    );
    process.exit(1);
  }
};

/**
 * Centralized configuration object
 * Exports all environment variables with appropriate defaults
 */
export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI!,
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },

  // ImageKit configuration
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  },

  // CORS configuration
  cors: {
    origin:
      process.env.CORS_ORIGIN ||
      (process.env.NODE_ENV === "production" ? undefined : "*"),
  },

  // Security configuration
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
  },
};
