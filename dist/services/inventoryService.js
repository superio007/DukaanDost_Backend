import { inventoryRepository } from "../repositories/inventoryRepository.js";
/**
 * Inventory Service
 * Handles business logic for inventory management including CRUD operations,
 * stock availability checks, and atomic stock deduction
 */
export class InventoryService {
    /**
     * Create a new inventory record
     * @param inventoryData - Inventory creation data (fabricName, color, gsm, availableMeters)
     * @returns Created inventory document
     * @throws Error if validation fails or duplicate fabric combination exists
     */
    async create(inventoryData) {
        return await inventoryRepository.create(inventoryData);
    }
    /**
     * Retrieve all inventory records
     * @returns Array of all inventory documents
     */
    async findAll() {
        return await inventoryRepository.findAll();
    }
    /**
     * Update inventory record
     * @param id - Inventory ID
     * @param updateData - Fields to update (availableMeters)
     * @returns Updated inventory document
     * @throws Error if inventory not found or validation fails
     */
    async update(id, updateData) {
        const inventory = await inventoryRepository.update(id, updateData);
        if (!inventory) {
            throw new Error("Inventory not found");
        }
        return inventory;
    }
    /**
     * Deduct stock from inventory with availability check and atomic operation
     * This method first checks availability, then performs atomic deduction to prevent race conditions
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @param meters - Meters to deduct
     * @throws Error if inventory not found or insufficient stock
     */
    async deductStock(fabricName, color, gsm, meters) {
        // First check if inventory exists
        const inventory = await inventoryRepository.findByFabric(fabricName, color, gsm);
        if (!inventory) {
            throw new Error(`Inventory not found for fabric: ${fabricName}, color: ${color}, gsm: ${gsm}`);
        }
        // Check availability
        if (inventory.availableMeters < meters) {
            throw new Error(`Insufficient stock. Available: ${inventory.availableMeters} meters, Required: ${meters} meters`);
        }
        // Perform atomic deduction
        const updatedInventory = await inventoryRepository.deductStock(fabricName, color, gsm, meters);
        // If atomic operation failed (concurrent deduction caused insufficient stock)
        if (!updatedInventory) {
            throw new Error(`Insufficient stock. Another process may have deducted stock concurrently.`);
        }
    }
    /**
     * Check if sufficient stock is available
     * @param fabricName - Fabric name
     * @param color - Fabric color
     * @param gsm - Fabric GSM (grams per square meter)
     * @param meters - Meters required
     * @returns true if sufficient stock available, false otherwise
     */
    async checkAvailability(fabricName, color, gsm, meters) {
        const inventory = await inventoryRepository.findByFabric(fabricName, color, gsm);
        if (!inventory) {
            return false;
        }
        return inventory.availableMeters >= meters;
    }
}
export const inventoryService = new InventoryService();
//# sourceMappingURL=inventoryService.js.map