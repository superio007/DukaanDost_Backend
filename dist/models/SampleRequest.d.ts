export declare const SampleRequest: import("mongoose").Model<{
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
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
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }>;
        attachments: string[];
        createdBy: import("mongoose").Types.ObjectId;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: import("../types/enums.js").ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }>;
        attachments: string[];
        createdBy: import("mongoose").Types.ObjectId;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    buyerName: string;
    contactPerson: string;
    requiredByDate: NativeDate;
    priority: import("../types/enums.js").Priority;
    items: import("mongoose").Types.DocumentArray<{
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }, {}, {}> & {
        status: import("../types/enums.js").ItemStatus;
        fabricName: string;
        color: string;
        gsm: number;
        requiredMeters: number;
        availableMeters: number;
        statusHistory: import("mongoose").Types.DocumentArray<{
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }, {}, {}> & {
            status: import("../types/enums.js").ItemStatus;
            timestamp: NativeDate;
            updatedBy: import("mongoose").Types.ObjectId;
        }>;
    }>;
    attachments: string[];
    createdBy: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=SampleRequest.d.ts.map