import { Schema, Types } from "mongoose";
import { Role } from "../types/enums.js";
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    name: string;
    password: string;
    role: Role;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    email: string;
    name: string;
    password: string;
    role: Role;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    email: string;
    name: string;
    password: string;
    role: Role;
} & import("mongoose").DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        email: string;
        name: string;
        password: string;
        role: Role;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        email: string;
        name: string;
        password: string;
        role: Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email: string;
    name: string;
    password: string;
    role: Role;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=authSchemas.d.ts.map