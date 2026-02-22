/**
 * Environment Configuration Module
 *
 * This module exports a centralized configuration object and validates
 * that all required environment variables are present at startup.
 */
/**
 * Validates that all required environment variables are present.
 * Exits the process with error code 1 if any required variables are missing.
 */
export declare const validateEnv: () => void;
/**
 * Centralized configuration object
 * Exports all environment variables with appropriate defaults
 */
export declare const config: {
    port: number;
    nodeEnv: string;
    mongodb: {
        uri: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    imagekit: {
        publicKey: string;
        privateKey: string;
        urlEndpoint: string;
    };
    cors: {
        origin: string | undefined;
    };
    bcrypt: {
        saltRounds: number;
    };
};
//# sourceMappingURL=index.d.ts.map