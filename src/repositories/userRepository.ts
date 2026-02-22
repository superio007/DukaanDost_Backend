import { User } from "../models/User.js";
import { RegisterDTO } from "../types/dtos.js";
import { Types } from "mongoose";

export class UserRepository {
  /**
   * Create a new user
   * @param userData - User registration data
   * @returns Created user document
   * @throws ValidationError if validation fails
   * @throws ConflictError (code 11000) if email already exists
   */
  async create(userData: RegisterDTO) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error: any) {
      // Handle Mongoose ValidationError
      if (error.name === "ValidationError") {
        throw error;
      }
      // Handle duplicate key error (email already exists)
      if (error.code === 11000) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find user by email with password field explicitly selected
   * @param email - User email address
   * @returns User document with password field, or null if not found
   */
  async findByEmail(email: string) {
    try {
      // Explicitly select password field since it's set to select: false in schema
      const user = await User.findOne({ email }).select("+password");
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Find user by ID
   * @param id - User ID (ObjectId or string)
   * @returns User document without password field, or null if not found
   */
  async findById(id: string | Types.ObjectId) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
