import { Schema, Types } from "mongoose";
import { ItemStatus, Priority } from "../types/enums.js";
export declare const StatusHistorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    status: ItemStatus;
    timestamp: NativeDate;
    updatedBy: Types.ObjectId;
}, import("mongoose").Document<unknown, {}, {
    status: ItemStatus;
    timestamp: NativeDate;
    updatedBy: Types.ObjectId;
}, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    _id: false;
}>> & Omit<{
    status: ItemStatus;
    timestamp: NativeDate;
    updatedBy: Types.ObjectId;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        _id: false;
    }>> & Omit<{
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    } & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    status: ItemStatus;
    timestamp: NativeDate;
    updatedBy: Types.ObjectId;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SampleItemSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    status: ItemStatus;
    fabricName: string;
    color: string;
    gsm: number;
    requiredMeters: number;
    availableMeters: number;
    statusHistory: Types.DocumentArray<{
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, {}, {}> & {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }>;
}, import("mongoose").Document<unknown, {}, {
    status: ItemStatus;
    fabricName: string;
    color: string;
    gsm: number;
    requiredMeters: number;
    availableMeters: number;
    statusHistory: Types.DocumentArray<{
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, {}, {}> & {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }>;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    status: ItemStatus;
    fabricName: string;
    color: string;
    gsm: number;
    requiredMeters: number;
    availableMeters: number;
    statusHistory: Types.DocumentArray<{
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, {}, {}> & {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }>;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    } & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    status: ItemStatus;
    fabricName: string;
    color: string;
    gsm: number;
    requiredMeters: number;
    availableMeters: number;
    statusHistory: Types.DocumentArray<{
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }, {}, {}> & {
        status: ItemStatus;
        timestamp: NativeDate;
        updatedBy: Types.ObjectId;
    }>;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SampleRequestSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: Priority;
    items: Types.DocumentArray<{
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: Priority;
    items: Types.DocumentArray<{
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: Priority;
    items: Types.DocumentArray<{
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: Types.ObjectId;
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
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: Priority;
        items: Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }>;
        attachments: string[];
        createdBy: Types.ObjectId;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: Priority;
        items: Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: Types.ObjectId;
            }>;
        }>;
        attachments: string[];
        createdBy: Types.ObjectId;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: Priority;
    items: Types.DocumentArray<{
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, Types.Subdocument<import("bson").ObjectId, unknown, {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: Types.DocumentArray<{
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }, {}, {}> & {
            status: ItemStatus;
            timestamp: NativeDate;
            updatedBy: Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=sampleRequestSchemas.d.ts.map