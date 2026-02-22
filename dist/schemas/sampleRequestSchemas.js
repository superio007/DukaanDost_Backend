import { Schema } from "mongoose";
import { ItemStatus, Priority } from "../types/enums.js";
export const StatusHistorySchema = new Schema({
    status: {
        type: String,
        enum: Object.values(ItemStatus),
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { _id: false });
export const SampleItemSchema = new Schema({
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
    requiredMeters: {
        type: Number,
        required: true,
        min: 0.01,
    },
    availableMeters: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(ItemStatus),
        default: ItemStatus.REQUESTED,
    },
    statusHistory: [StatusHistorySchema],
});
export const SampleRequestSchema = new Schema({
    buyerName: {
        type: String,
        required: true,
        trim: true,
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true,
    },
    requiredByDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: Object.values(Priority),
        required: true,
    },
    items: [SampleItemSchema],
    attachments: [{ type: String }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=sampleRequestSchemas.js.map