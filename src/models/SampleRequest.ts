import { model } from "mongoose";
import { SampleRequestSchema } from "../schemas/sampleRequestSchemas.js";

// Create indexes as per design document
SampleRequestSchema.index({ createdBy: 1 });
SampleRequestSchema.index({ priority: 1, "items.status": 1 });
SampleRequestSchema.index({ requiredByDate: 1 });

export const SampleRequest = model("SampleRequest", SampleRequestSchema);
