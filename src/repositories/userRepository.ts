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
      const user = await User.findOne({ email, isDeleted: false }).select(
        "+password",
      );
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
      const user = await User.findOne({ _id: id, isDeleted: false });
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Soft delete user
   * @param id - User ID (ObjectId or string)
   * @param deletedBy - User ID who is deleting the record
   * @returns Soft deleted user document, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async softDelete(id: string | Types.ObjectId, deletedBy: string) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy,
        },
        { new: true },
      );
      return user;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
