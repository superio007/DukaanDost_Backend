import { buyerRepository } from "../repositories/buyerRepository.js";
import {
  CreateBuyerDTO,
  UpdateBuyerDTO,
  PaginationDTO,
  BuyerFilters,
} from "../types/dtos.js";

/**
 * Buyer Service
 * Handles business logic for buyer management
 */
export class BuyerService {
  /**
   * Create a new buyer
   */
  async create(buyerData: CreateBuyerDTO) {
    return await buyerRepository.create(buyerData);
  }

  /**
   * Retrieve all buyers with filtering and pagination
   */
  async findAll(filters: BuyerFilters, pagination: PaginationDTO) {
    return await buyerRepository.findAll(filters, pagination);
  }

  /**
   * Retrieve a single buyer by ID
   */
  async findById(id: string) {
    const buyer = await buyerRepository.findById(id);
    if (!buyer) {
      throw new Error("Buyer not found");
    }
    return buyer;
  }

  /**
   * Update buyer record
   */
  async update(id: string, updateData: UpdateBuyerDTO) {
    const buyer = await buyerRepository.update(id, updateData);
    if (!buyer) {
      throw new Error("Buyer not found");
    }
    return buyer;
  }

  /**
   * Soft delete buyer record
   */
  async delete(id: string, deletedBy: string) {
    const buyer = await buyerRepository.softDelete(id, deletedBy);
    if (!buyer) {
      throw new Error("Buyer not found");
    }
  }

  /**
   * Get all active buyers (for dropdown)
   */
  async findActive() {
    return await buyerRepository.findActive();
  }
}

export const buyerService = new BuyerService();
