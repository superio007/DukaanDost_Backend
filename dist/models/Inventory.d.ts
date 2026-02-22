export declare const Inventory: import("mongoose").Model<{
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
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
    _id: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    fabricName: string;
    color: string;
    gsm: number;
    availableMeters: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Inventory.d.ts.map