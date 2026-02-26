import { model } from "mongoose";
import { InventoryTransactionSchema } from "../schemas/inventoryTransactionSchema.js";

export const InventoryTransaction = model(
  "InventoryTransaction",
  InventoryTransactionSchema,
);
