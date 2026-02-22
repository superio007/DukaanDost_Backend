import { Schema, Types } from "mongoose";

export const InventorySchema = new Schema(
  {
    fabricName: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    gsm: {
      type: Number,
      required: true,
      min: 0,
    },
    availableMeters: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);
