import { RegisterDTO } from "../types/dtos.js";
import { Types } from "mongoose";
export declare class UserRepository {
    /**
     * Create a new user
     * @param userData - User registration data
     * @returns Created user document
     * @throws ValidationError if validation fails
     * @throws ConflictError (code 11000) if email already exists
     */
    create(userData: RegisterDTO): Promise<import("mongoose").Document<unknown, {}, {
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    /**
     * Find user by email with password field explicitly selected
     * @param email - User email address
     * @returns User document with password field, or null if not found
     */
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, {
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null>;
    /**
     * Find user by ID
     * @param id - User ID (ObjectId or string)
     * @returns User document without password field, or null if not found
     */
    findById(id: string | Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, {
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=userRepository.d.ts.map