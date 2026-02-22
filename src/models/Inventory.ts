import { model } from "mongoose";
import { InventorySchema } from "../schemas/inventorySchemas.js";

// Create compound unique index on fabricName, color, and gsm
// This ensures no duplicate fabric entries and enables fast lookup for inventory deduction
InventorySchema.index({ fabricName: 1, color: 1, gsm: 1 }, { unique: true });

export const Inventory = model("Inventory", InventorySchema);
