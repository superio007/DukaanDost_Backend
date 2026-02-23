import { Inventory } from "../models/Inventory.js";
import { CreateInventoryDTO, UpdateInventoryDTO } from "../types/dtos.js";
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
   * Find all inventory records
   * @returns Array of all inventory documents
   */
  async findAll() {
    try {
      const inventory = await Inventory.find().sort({ createdAt: -1 });
      return inventory;
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
      const inventory = await Inventory.findByIdAndUpdate(id, updateData, {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      });
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
      const inventory = await Inventory.findById(id);
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
      });
      return inventory;
    } catch (error: any) {
      throw error;
    }
  }
}

export const inventoryRepository = new InventoryRepository();
