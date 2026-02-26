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
   * NOTE: Inventory is NOT deducted at creation - only when status changes to SENT
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

    // NOTE: Inventory deduction removed from here
    // It will be deducted when status changes to SENT

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
    // Create a new filters object to avoid modifying the parameter
    const queryFilters = { ...filters };

    // If user is SALES, filter by their userId
    if (userRole === Role.SALES) {
      queryFilters.createdBy = userId;
    }
    // SAMPLING_HEAD and ADMIN see all requests (no additional filter)

    return await sampleRequestRepository.findAll(queryFilters, pagination);
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
   * Handles inventory deduction when item status transitions to/from SENT
   */
  async update(
    id: string,
    updateData: UpdateSampleRequestDTO,
    userId?: string,
  ) {
    // Get existing request
    const existingRequest = await sampleRequestRepository.findById(id);
    if (!existingRequest) {
      throw new NotFoundError("Sample request not found");
    }

    // Check for status transitions in items and handle inventory
    if (updateData.items) {
      for (const updatedItem of updateData.items) {
        // Find the corresponding existing item
        const existingItem = existingRequest.items.find(
          (item: any) => item._id.toString() === updatedItem._id?.toString(),
        );

        if (existingItem && updatedItem.status) {
          const oldStatus = existingItem.status;
          const newStatus = updatedItem.status;

          // Only process if status actually changed
          if (oldStatus !== newStatus) {
            // Validate status transition
            this.validateStatusTransition(oldStatus, newStatus);

            // Handle inventory based on status transition
            if (
              newStatus === ItemStatus.SENT &&
              oldStatus !== ItemStatus.SENT
            ) {
              // Transitioning TO "SENT" - deduct inventory
              await inventoryService.deductStockOnSent(
                updatedItem.fabricName || existingItem.fabricName,
                updatedItem.color || existingItem.color,
                updatedItem.gsm || existingItem.gsm,
                updatedItem.requiredMeters || existingItem.requiredMeters,
                id,
                updatedItem._id!,
                userId || existingRequest.createdBy.toString(),
              );
            } else if (
              oldStatus === ItemStatus.SENT &&
              newStatus !== ItemStatus.SENT
            ) {
              // Transitioning FROM "SENT" - restore inventory
              await inventoryService.restoreStockOnStatusChange(
                updatedItem.fabricName || existingItem.fabricName,
                updatedItem.color || existingItem.color,
                updatedItem.gsm || existingItem.gsm,
                updatedItem.requiredMeters || existingItem.requiredMeters,
                id,
                updatedItem._id!,
                userId || existingRequest.createdBy.toString(),
              );
            }
          }
        }
      }
    }

    // Update the sample request
    const sampleRequest = await sampleRequestRepository.update(id, updateData);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }
    return sampleRequest;
  }

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

    const previousStatus = item.status;

    // Validate status transition
    this.validateStatusTransition(previousStatus, status);

    // Handle inventory deduction/restoration based on status change
    if (status === ItemStatus.SENT && previousStatus !== ItemStatus.SENT) {
      // Changing TO "SENT" - deduct inventory
      await inventoryService.deductStockOnSent(
        item.fabricName,
        item.color,
        item.gsm,
        item.requiredMeters,
        requestId,
        itemId,
        userId,
      );
    } else if (
      previousStatus === ItemStatus.SENT &&
      status !== ItemStatus.SENT
    ) {
      // Changing FROM "SENT" to another status - restore inventory
      await inventoryService.restoreStockOnStatusChange(
        item.fabricName,
        item.color,
        item.gsm,
        item.requiredMeters,
        requestId,
        itemId,
        userId,
      );
    }

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

    return updatedRequest;
  }

  /**
   * Delete sample request
   */
  /**
   * Delete sample request
   * Also deletes associated attachments from ImageKit
   */
  async delete(id: string, userId: string) {
    // Get the sample request first to access attachments
    const sampleRequest = await sampleRequestRepository.findById(id);
    if (!sampleRequest) {
      throw new NotFoundError("Sample request not found");
    }

    // Delete attachments from ImageKit if they exist
    if (sampleRequest.attachments && sampleRequest.attachments.length > 0) {
      try {
        const { uploadService } = await import("./uploadService.js");
        await uploadService.deleteFiles(sampleRequest.attachments);
      } catch (error) {
        console.error("Failed to delete attachments from ImageKit:", error);
        // Continue with deletion even if attachment deletion fails
      }
    }

    // Soft delete the sample request
    const deletedRequest = await sampleRequestRepository.softDelete(id, userId);
    if (!deletedRequest) {
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
