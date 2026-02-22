import { Schema, Types } from "mongoose";
export declare const InventorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
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
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        fabricName: string;
        color: string;
        gsm: number;
        availableMeters: number;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=inventorySchemas.d.ts.map