import { sampleRequestRepository } from "../repositories/sampleRequestRepository.js";
import { inventoryService } from "./inventoryService.js";
import {
  CreateSampleRequestDTO,
  UpdateSampleRequestDTO,
  SampleRequestFilters,
  PaginationDTO,
} from "../types/dtos.js";
import { ItemStatus, Role } from "../types/enums.js";
import { NotFoundError, ValidationError } from "../middleware/errorHandler.js";

/**
 * Sample Request Service
 * Handles business logic for sample request operations
 */
export class SampleRequestService {
  /**
   * Create a new sample request
   * Initializes items with REQUESTED status and statusHistory
   */
  async create(requestData: CreateSampleRequestDTO, userId: string) {
    // Initialize items with REQUESTED status and statusHistory
    const itemsWithStatus = requestData.items.map((item) => ({
      ...item,
      status: ItemStatus.REQUESTED,
      statusHistory: [
        {
          status: ItemStatus.REQUESTED,
          timestamp: new Date(),
          updatedBy: userId,
        },
      ],
    }));

    const dataWithCreator = {
      ...requestData,
      items: itemsWithStatus,
      createdBy: userId,
    };

    return await sampleRequestRepository.create(dataWithCreator);
  }

  /**
   * Find all sample requests with filtering and pagination
   * Role-based filtering: SALES users see only their own requests
   * SAMPLING_HEAD and ADMIN see all requests
   */
  async findAll(
    filters: SampleRequestFilters,
    pagination: PaginationDTO,
    userId: string,
    userRole: Role,
  ) {
    // If user is SALES, filter by their userId
    if (userRole === Role.SALES) {
      filters.createdBy = userId;
    }
    // SAMPLING_HEAD and ADMIN see all requests (no additional filter)

    return await sampleRequestRepository.findAll(filters, pagination);
  }

  /**
   * Find sample request by ID
   * Role-based access: SALES users can only view their own requests
   * SAMPLING_HEAD and ADMIN can view all requests
   */
  async findById(id: string, userId: string, userRole: Role) {
    const sampleRequest = await sampleRequestRepository.findById(id);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }

    // If user is SALES, verify they created this request
    if (userRole === Role.SALES) {
      if (sampleRequest.createdBy.toString() !== userId) {
        throw new NotFoundError("Sample request not found");
      }
    }

    return sampleRequest;
  }

  /**
   * Update sample request
   */
  async update(id: string, updateData: UpdateSampleRequestDTO) {
    const sampleRequest = await sampleRequestRepository.update(id, updateData);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }
    return sampleRequest;
  }

  /**
   * Update item status with validation and inventory deduction
   */
  async updateItemStatus(
    requestId: string,
    itemId: string,
    status: ItemStatus,
    userId: string,
  ) {
    // Get the sample request first to validate status transition
    const sampleRequest = await sampleRequestRepository.findById(requestId);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }

    // Find the item
    const item = sampleRequest.items.find(
      (i: any) => i._id.toString() === itemId,
    );
    if (!item) {
      throw new NotFoundError("Item not found");
    }

    // Validate status transition
    this.validateStatusTransition(item.status, status);

    // Update item status
    const updatedRequest = await sampleRequestRepository.updateItemStatus(
      requestId,
      itemId,
      status,
      userId,
    );

    if (!updatedRequest) {
      throw new NotFoundError("Sample request not found");
    }

    // Trigger inventory deduction if status changed to SENT
    if (status === ItemStatus.SENT) {
      await inventoryService.deductStock(
        item.fabricName,
        item.color,
        item.gsm,
        item.requiredMeters,
      );
    }

    return updatedRequest;
  }

  /**
   * Delete sample request
   */
  async delete(id: string, userId: string) {
    const sampleRequest = await sampleRequestRepository.softDelete(id, userId);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }
  }

  /**
   * Validate status transition according to workflow rules
   */
  private validateStatusTransition(
    currentStatus: ItemStatus,
    newStatus: ItemStatus,
  ) {
    const validTransitions: Record<ItemStatus, ItemStatus[]> = {
      [ItemStatus.REQUESTED]: [ItemStatus.IN_SAMPLING],
      [ItemStatus.IN_SAMPLING]: [ItemStatus.SENT],
      [ItemStatus.SENT]: [ItemStatus.APPROVED, ItemStatus.REJECTED],
      [ItemStatus.APPROVED]: [],
      [ItemStatus.REJECTED]: [],
    };

    const allowedStatuses = validTransitions[currentStatus];
    if (!allowedStatuses.includes(newStatus)) {
      throw new ValidationError(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}

export const sampleRequestService = new SampleRequestService();
