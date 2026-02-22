export declare const User: import("mongoose").Model<{
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
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
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        email: string;
        name: string;
        password: string;
        role: import("../types/enums.js").Role;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    name: string;
    password: string;
    role: import("../types/enums.js").Role;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map