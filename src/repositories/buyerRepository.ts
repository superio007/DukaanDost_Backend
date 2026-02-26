import { Buyer } from "../models/Buyer.js";
import {
  CreateBuyerDTO,
  UpdateBuyerDTO,
  PaginationDTO,
  BuyerFilters,
} from "../types/dtos.js";
import { Types } from "mongoose";

export class BuyerRepository {
  /**
   * Create a new buyer record
   */
  async create(buyerData: CreateBuyerDTO) {
    try {
      const buyer = await Buyer.create(buyerData);
      return buyer;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        throw error;
      }
      if (error.code === 11000) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find all buyers with filtering and pagination
   */
  async findAll(filters: BuyerFilters, pagination: PaginationDTO) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const query: any = { isDeleted: false };

      // Apply filters
      if (filters.name) {
        const sanitizedName = filters.name.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        query.name = { $regex: sanitizedName, $options: "i" };
      }
      if (filters.email) {
        const sanitizedEmail = filters.email.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        query.email = { $regex: sanitizedEmail, $options: "i" };
      }

      const skip = (page - 1) * limit;

      const buyers = await Buyer.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 });

      const total = await Buyer.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      return {
        buyers,
        total,
        page,
        totalPages,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Find buyer by ID
   */
  async findById(id: string | Types.ObjectId) {
    try {
      const buyer = await Buyer.findOne({ _id: id, isDeleted: false });
      return buyer;
    } catch (error: any) {
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Update buyer record
   */
  async update(id: string | Types.ObjectId, updateData: UpdateBuyerDTO) {
    try {
      const buyer = await Buyer.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );
      return buyer;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        throw error;
      }
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Soft delete buyer record
   */
  async softDelete(id: string | Types.ObjectId, deletedBy: string) {
    try {
      const buyer = await Buyer.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy,
        },
        { new: true },
      );
      return buyer;
    } catch (error: any) {
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find all active buyers (for dropdown)
   */
  async findActive() {
    try {
      const buyers = await Buyer.find({ isDeleted: false })
        .select("_id name contactPerson")
        .sort({ name: 1 });
      return buyers;
    } catch (error: any) {
      throw error;
    }
  }
}

export const buyerRepository = new BuyerRepository();
