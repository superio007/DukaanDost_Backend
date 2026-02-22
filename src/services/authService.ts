import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository.js";
import { RegisterDTO, LoginDTO } from "../types/dtos.js";
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
  async register(userData: RegisterDTO) {
    // Hash password with bcrypt using configured salt rounds
    const hashedPassword = await bcrypt.hash(
      userData.password,
      config.bcrypt.saltRounds,
    );

    // Create user with hashed password
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Return user without password field
    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
  }

  /**
   * Login user with credentials and return JWT token
   * @param credentials - Login credentials (email, password)
   * @returns Object containing user data (without password) and JWT token
   * @throws Error if credentials are invalid
   */
  async login(credentials: LoginDTO) {
    // Find user by email with password field
    const user = await userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user without password and token
    const userObject = user.toObject();
    delete userObject.password;

    return {
      user: userObject,
      token,
    };
  }

  /**
   * Generate JWT token for authenticated user
   * @param user - User document
   * @returns JWT token string
   */
  generateToken(user: any): string {
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

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
  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export const authService = new AuthService();
