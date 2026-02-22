import { CreateInventoryDTO, UpdateInventoryDTO } from "../types/dtos.js";
import { Types } from "mongoose";
export declare class InventoryRepository {
    /**
     * Create a new inventory record
     * @param inventoryData - Inventory creation data
     * @returns Created inventory document
     * @throws ValidationError if validation fails
     * @throws ConflictError (code 11000) if duplicate fabricName/color/gsm combination exists
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
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    /**
     * Find all inventory records
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
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    /**
     * Update inventory record
     * @param id - Inventory ID (ObjectId or string)
     * @param updateData - Fields to update
     * @returns Updated inventory document, or null if not found
     * @throws ValidationError if validation fails
     * @throws CastError if invalid ObjectId format
     */
    update(id: string | Types.ObjectId, updateData: UpdateInventoryDTO): Promise<(import("mongoose").Document<unknown, {}, {
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
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null>;
    /**
     * Deduct stock from inventory using atomic operations
     * This method uses MongoDB's atomic $inc operator with $gte check to prevent race conditions
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @param meters - Meters to deduct
     * @returns Updated inventory document, or null if not found or insufficient stock
     */
    deductStock(fabricName: string, color: string, gsm: number, meters: number): Promise<(import("mongoose").Document<unknown, {}, {
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
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null>;
    /**
     * Find inventory by fabric specifications
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @returns Inventory document, or null if not found
     */
    findByFabric(fabricName: string, color: string, gsm: number): Promise<(import("mongoose").Document<unknown, {}, {
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
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null>;
}
export declare const inventoryRepository: InventoryRepository;
//# sourceMappingURL=inventoryRepository.d.ts.map