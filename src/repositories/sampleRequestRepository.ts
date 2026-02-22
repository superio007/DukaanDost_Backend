import { SampleRequest } from "../models/SampleRequest.js";
import {
  CreateSampleRequestDTO,
  UpdateSampleRequestDTO,
  SampleRequestFilters,
  PaginationDTO,
} from "../types/dtos.js";
import { Types } from "mongoose";
import { ItemStatus } from "../types/enums.js";

export class SampleRequestRepository {
  /**
   * Create a new sample request
   * @param requestData - Sample request creation data
   * @returns Created sample request document
   * @throws ValidationError if validation fails
   */
  async create(requestData: any) {
    try {
      const sampleRequest = await SampleRequest.create(requestData);
      return sampleRequest;
    } catch (error: any) {
      // Handle Mongoose ValidationError
      if (error.name === "ValidationError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Find all sample requests with filtering and pagination
   * @param filters - Optional filters (buyerName, status, priority)
   * @param pagination - Pagination parameters (page, limit)
   * @returns Object containing requests array, total count, page, and totalPages
   */
  async findAll(filters: SampleRequestFilters, pagination: PaginationDTO) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const query: any = {};

      // Apply filters with sanitization to prevent NoSQL injection
      if (filters.buyerName) {
        // Escape special regex characters to prevent regex injection
        const sanitizedBuyerName = filters.buyerName.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        query.buyerName = { $regex: sanitizedBuyerName, $options: "i" }; // Case-insensitive partial match
      }
      if (filters.priority) {
        query.priority = filters.priority;
      }
      if (filters.status) {
        query["items.status"] = filters.status;
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Execute query with pagination
      const requests = await SampleRequest.find(query)
        .populate("createdBy", "name email role")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sort by newest first

      // Get total count for pagination
      const total = await SampleRequest.countDocuments(query);
      const totalPages = Math.ceil(total / limit);

      return {
        requests,
        total,
        page,
        totalPages,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Find sample request by ID with population
   * @param id - Sample request ID (ObjectId or string)
   * @returns Sample request document with populated fields, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async findById(id: string | Types.ObjectId) {
    try {
      const sampleRequest = await SampleRequest.findById(id)
        .populate("createdBy", "name email role")
        .populate("items.statusHistory.updatedBy", "name email role");
      return sampleRequest;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Update sample request
   * @param id - Sample request ID (ObjectId or string)
   * @param updateData - Fields to update
   * @returns Updated sample request document, or null if not found
   * @throws ValidationError if validation fails
   * @throws CastError if invalid ObjectId format
   */
  async update(
    id: string | Types.ObjectId,
    updateData: UpdateSampleRequestDTO,
  ) {
    try {
      const sampleRequest = await SampleRequest.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        },
      ).populate("createdBy", "name email role");

      return sampleRequest;
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
   * Update item status using atomic operations
   * @param requestId - Sample request ID
   * @param itemId - Item ID within the sample request
   * @param status - New status value
   * @param userId - ID of user making the update
   * @returns Updated sample request document, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async updateItemStatus(
    requestId: string | Types.ObjectId,
    itemId: string | Types.ObjectId,
    status: ItemStatus,
    userId: string | Types.ObjectId,
  ) {
    try {
      // Use atomic operations to prevent race conditions
      // $set updates the status field
      // $push appends to statusHistory array
      const sampleRequest = await SampleRequest.findOneAndUpdate(
        {
          _id: requestId,
          "items._id": itemId,
        },
        {
          $set: {
            "items.$.status": status,
          },
          $push: {
            "items.$.statusHistory": {
              status,
              timestamp: new Date(),
              updatedBy: userId,
            },
          },
        },
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        },
      )
        .populate("createdBy", "name email role")
        .populate("items.statusHistory.updatedBy", "name email role");

      return sampleRequest;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Delete sample request
   * @param id - Sample request ID (ObjectId or string)
   * @returns Deleted sample request document, or null if not found
   * @throws CastError if invalid ObjectId format
   */
  async delete(id: string | Types.ObjectId) {
    try {
      const sampleRequest = await SampleRequest.findByIdAndDelete(id);
      return sampleRequest;
    } catch (error: any) {
      // Handle CastError for invalid ObjectId
      if (error.name === "CastError") {
        throw error;
      }
      throw error;
    }
  }
}

export const sampleRequestRepository = new SampleRequestRepository();
