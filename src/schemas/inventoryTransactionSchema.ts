import { Schema } from "mongoose";

export const InventoryTransactionSchema = new Schema(
  {
    inventoryId: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
      index: true,
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "SampleRequest",
      required: true,
      index: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["DEDUCT", "RESTORE"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },
    previousQuantity: {
      type: Number,
      required: true,
    },
    newQuantity: {
      type: Number,
      required: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Indexes for efficient queries
InventoryTransactionSchema.index({ inventoryId: 1, createdAt: -1 });
InventoryTransactionSchema.index({ requestId: 1 });
