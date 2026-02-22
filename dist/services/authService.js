import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository.js";
import { config } from "../config/index.js";
/**
 * Authentication Service
 * Handles user registration, login, JWT token generation, and password verification
 */
export class AuthService {
    /**
     * Register a new user with hashed password
     * @param userData - User registration data (name, email, password, role)
     * @returns Created user document (without password)
     * @throws Error if email already exists or validation fails
     */
    async register(userData) {
        // Hash password with bcrypt using configured salt rounds
        const hashedPassword = await bcrypt.hash(userData.password, config.bcrypt.saltRounds);
        // Create user with hashed password
        const user = await userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        // Return user without password field
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;
        return userWithoutPassword;
    }
    /**
     * Login user with credentials and return JWT token
     * @param credentials - Login credentials (email, password)
     * @returns Object containing user data (without password) and JWT token
     * @throws Error if credentials are invalid
     */
    async login(credentials) {
        // Find user by email with password field
        const user = await userRepository.findByEmail(credentials.email);
        if (!user) {
            // Log authentication failure without exposing credentials
            console.warn(`⚠ Login failed: User not found - Email: ${credentials.email}`);
            throw new Error("Invalid credentials");
        }
        // Verify password
        const isPasswordValid = await this.verifyPassword(credentials.password, user.password);
        if (!isPasswordValid) {
            // Log authentication failure without exposing password
            console.warn(`⚠ Login failed: Invalid password - Email: ${credentials.email}`);
            throw new Error("Invalid credentials");
        }
        // Generate JWT token
        const token = this.generateToken(user);
        // Return user without password and token
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    /**
     * Generate JWT token for authenticated user
     * @param user - User document
     * @returns JWT token string
     */
    generateToken(user) {
        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        // @ts-ignore - JWT type definitions have complex overloads
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });
    }
    /**
     * Verify plain password against bcrypt hash
     * @param plainPassword - Plain text password
     * @param hashedPassword - Bcrypt hashed password
     * @returns true if password matches, false otherwise
     */
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
export const authService = new AuthService();
//# sourceMappingURL=authService.js.map