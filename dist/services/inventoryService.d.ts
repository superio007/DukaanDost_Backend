import { CreateInventoryDTO, UpdateInventoryDTO } from "../types/dtos.js";
/**
 * Inventory Service
 * Handles business logic for inventory management including CRUD operations,
 * stock availability checks, and atomic stock deduction
 */
export declare class InventoryService {
    /**
     * Create a new inventory record
     * @param inventoryData - Inventory creation data (fabricName, color, gsm, availableMeters)
     * @returns Created inventory document
     * @throws Error if validation fails or duplicate fabric combination exists
     */
    create(inventoryData: CreateInventoryDTO): Promise<import("mongoose").Document<unknown, {}, {
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    /**
     * Retrieve all inventory records
     * @returns Array of all inventory documents
     */
    findAll(): Promise<(import("mongoose").Document<unknown, {}, {
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    /**
     * Update inventory record
     * @param id - Inventory ID
     * @param updateData - Fields to update (availableMeters)
     * @returns Updated inventory document
     * @throws Error if inventory not found or validation fails
     */
    update(id: string, updateData: UpdateInventoryDTO): Promise<import("mongoose").Document<unknown, {}, {
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    /**
     * Deduct stock from inventory with availability check and atomic operation
     * This method first checks availability, then performs atomic deduction to prevent race conditions
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @param meters - Meters to deduct
     * @throws Error if inventory not found or insufficient stock
     */
    deductStock(fabricName: string, color: string, gsm: number, meters: number): Promise<void>;
    /**
     * Check if sufficient stock is available
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @param meters - Meters required
     * @returns true if sufficient stock available, false otherwise
     */
    checkAvailability(fabricName: string, color: string, gsm: number, meters: number): Promise<boolean>;
}
export declare const inventoryService: InventoryService;
//# sourceMappingURL=inventoryService.d.ts.map