import { Schema } from "mongoose";
import { Role } from "../types/enums.js";
export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=authSchemas.js.map