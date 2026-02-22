import { RegisterDTO, LoginDTO } from "../types/dtos.js";
/**
 * Authentication Service
 * Handles user registration, login, JWT token generation, and password verification
 */
export declare class AuthService {
    /**
     * Register a new user with hashed password
     * @param userData - User registration data (name, email, password, role)
     * @returns Created user document (without password)
     * @throws Error if email already exists or validation fails
     */
    register(userData: RegisterDTO): Promise<{
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    /**
     * Login user with credentials and return JWT token
     * @param credentials - Login credentials (email, password)
     * @returns Object containing user data (without password) and JWT token
     * @throws Error if credentials are invalid
     */
    login(credentials: LoginDTO): Promise<{
        user: {
            email: string;
            name: string;
            password: string;
            role: import("../types/enums.js").Role;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        token: string;
    }>;
    /**
     * Generate JWT token for authenticated user
     * @param user - User document
     * @returns JWT token string
     */
    generateToken(user: any): string;
    /**
     * Verify plain password against bcrypt hash
     * @param plainPassword - Plain text password
     * @param hashedPassword - Bcrypt hashed password
     * @returns true if password matches, false otherwise
     */
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
export declare const authService: AuthService;
//# sourceMappingURL=authService.d.ts.map