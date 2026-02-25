import { Inventory } from "../models/Inventory.js";
import {
  CreateInventoryDTO,
  UpdateInventoryDTO,
  PaginationDTO,
  InventoryFilters,
} from "../types/dtos.js";
import { Types } from "mongoose";

export class InventoryRepository {
  /**
   * Create a new inventory record
   * @param inventoryData - Inventory creation data
   * @returns Created inventory document
   * @throws ValidationError if validation fails
   * @throws ConflictError (code 11000) if duplicate fabricName/color/gsm combination exists
   */
  async create(inventoryData: CreateInventoryDTO) {
    try {
      const inventory = await Inventory.create(inventoryData);
      return inventory;
    } catch (error: any) {
      // Handle Mongoose ValidationError
      if (error.name === "ValidationError") {
        throw error;
      }
      // Handle duplicate key error (unique constraint violation)
      if (error.code === 11000) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find all inventory records with filtering and pagination
   * @param filters - Optional filters (fabricName, color, gsm)
   * @param pagination - Pagination parameters (page, limit)
   * @returns Object containing inventory array, total count, page, and totalPages
   */
  async findAll(filters: InventoryFilters, pagination: PaginationDTO) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const query: any = { isDeleted: false };

      // Apply filters
      if (filters.fabricName) {
        const sanitizedFabricName = filters.fabricName.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        query.fabricName = { $regex: sanitizedFabricName, $options: "i" };
      }
      if (filters.color) {
        const sanitizedColor = filters.color.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        query.color = { $regex: sanitizedColor, $options: "i" };
      }
      if (filters.gsm !== undefined) {
        query.gsm = filters.gsm;
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Execute query with pagination
      const inventory = await Inventory.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      // Get total count for pagination
      const total = await Inventory.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      return {
        inventory,
        total,
        page,
        totalPages,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Update inventory record
   * @param id - Inventory ID (ObjectId or string)
   * @param updateData - Fields to update
   * @returns Updated inventory document, or null if not found
   * @throws ValidationError if validation fails
   * @throws CastError if invalid ObjectId format
   */
  async update(id: string | Types.ObjectId, updateData: UpdateInventoryDTO) {
    try {
      const inventory = await Inventory.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updateData,
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        },
      );
      return inventory;
    } catch (error: any) {
      // Handle Mongoose ValidationError
      if (error.name === "ValidationError") {
        throw error;
      }
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Soft delete inventory record
   * @param id - Inventory ID (ObjectId or string)
   * @param deletedBy - User ID who is deleting the record
   * @returns Soft deleted inventory document, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async softDelete(id: string | Types.ObjectId, deletedBy: string) {
    try {
      const inventory = await Inventory.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy,
        },
        { new: true },
      );
      return inventory;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Deduct stock from inventory using atomic operations
   * This method uses MongoDB's atomic $inc operator with $gte check to prevent race conditions
   * @param fabricName - Fabric name
   * @param color - Fabric color
   * @param gsm - Fabric GSM (grams per square meter)
   * @param meters - Meters to deduct
   * @returns Updated inventory document, or null if not found or insufficient stock
   */
  async deductStock(
    fabricName: string,
    color: string,
    gsm: number,
    meters: number,
  ) {
    try {
      // Atomic operation to prevent race conditions
      // Only updates if availableMeters >= meters (sufficient stock)
      const inventory = await Inventory.findOneAndUpdate(
        {
          fabricName,
          color,
          gsm,
          isDeleted: false,
          availableMeters: { $gte: meters }, // Ensure sufficient stock
        },
        {
          $inc: { availableMeters: -meters }, // Atomic decrement
        },
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        },
      );
      return inventory;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Find inventory by ID
   * @param id - Inventory ID (ObjectId or string)
   * @returns Inventory document, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async findById(id: string | Types.ObjectId) {
    try {
      const inventory = await Inventory.findOne({ _id: id, isDeleted: false });
      return inventory;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find inventory by fabric specifications
   * @param fabricName - Fabric name
   * @param color - Fabric color
   * @param gsm - Fabric GSM (grams per square meter)
   * @returns Inventory document, or null if not found
   */
  async findByFabric(fabricName: string, color: string, gsm: number) {
    try {
      const inventory = await Inventory.findOne({
        fabricName,
        color,
        gsm,
        isDeleted: false,
      });
      return inventory;
    } catch (error: any) {
      throw error;
    }
  }
}

export const inventoryRepository = new InventoryRepository();
