import { CreateSampleRequestDTO, UpdateSampleRequestDTO, SampleRequestFilters, PaginationDTO } from "../types/dtos.js";
import { ItemStatus } from "../types/enums.js";
/**
 * Sample Request Service
 * Handles business logic for sample request operations
 */
export declare class SampleRequestService {
    /**
     * Create a new sample request
     * Initializes items with REQUESTED status and statusHistory
     */
    create(requestData: CreateSampleRequestDTO, userId: string): Promise<import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
    }>;
    /**
     * Find all sample requests with filtering and pagination
     */
    findAll(filters: SampleRequestFilters, pagination: PaginationDTO): Promise<{
        requests: (import("mongoose").Document<unknown, {}, {
            buyerName: string;
            contactPerson: string;
            requiredByDate: NativeDate;
            priority: import("../types/enums.js").Priority;
            items: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }>;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }>;
            }, {}, {}> & {
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
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
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }>;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }>;
            }, {}, {}> & {
                status: ItemStatus;
                fabricName: string;
                color: string;
                gsm: number;
                requiredMeters: number;
                availableMeters: number;
                statusHistory: import("mongoose").Types.DocumentArray<{
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                    status: ItemStatus;
                    timestamp: NativeDate;
                    updatedBy: import("mongoose").Types.ObjectId;
                }, {}, {}> & {
                    status: ItemStatus;
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
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    /**
     * Find sample request by ID
     */
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
    }>;
    /**
     * Update sample request
     */
    update(id: string, updateData: UpdateSampleRequestDTO): Promise<import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
    }>;
    /**
     * Update item status with validation and inventory deduction
     */
    updateItemStatus(requestId: string, itemId: string, status: ItemStatus, userId: string): Promise<import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
        items: import("mongoose").Types.DocumentArray<{
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }>;
        }, {}, {}> & {
            status: ItemStatus;
            fabricName: string;
            color: string;
            gsm: number;
            requiredMeters: number;
            availableMeters: number;
            statusHistory: import("mongoose").Types.DocumentArray<{
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
                status: ItemStatus;
                timestamp: NativeDate;
                updatedBy: import("mongoose").Types.ObjectId;
            }, {}, {}> & {
                status: ItemStatus;
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
    }>;
    /**
     * Delete sample request
     */
    delete(id: string): Promise<void>;
    /**
     * Validate status transition according to workflow rules
     */
    private validateStatusTransition;
}
export declare const sampleRequestService: SampleRequestService;
//# sourceMappingURL=sampleRequestService.d.ts.map