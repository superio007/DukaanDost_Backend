import { UpdateSampleRequestDTO, SampleRequestFilters, PaginationDTO } from "../types/dtos.js";
import { Types } from "mongoose";
import { ItemStatus } from "../types/enums.js";
export declare class SampleRequestRepository {
    /**
     * Create a new sample request
     * @param requestData - Sample request creation data
     * @returns Created sample request document
     * @throws ValidationError if validation fails
     */
    create(requestData: any): Promise<import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }, {
        timestamps: true;
    }> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }>;
    /**
     * Find all sample requests with filtering and pagination
     * @param filters - Optional filters (buyerName, status, priority)
     * @param pagination - Pagination parameters (page, limit)
     * @returns Object containing requests array, total count, page, and totalPages
     */
    findAll(filters: SampleRequestFilters, pagination: PaginationDTO): Promise<{
        requests: (import("mongoose").Document<unknown, {}, {
            buyerName: string;
            contactPerson: string;
            requiredByDate: NativeDate;
            priority: import("../types/enums.js").Priority;
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
        }, {
            timestamps: true;
        }> & Omit<{
            buyerName: string;
            contactPerson: string;
            requiredByDate: NativeDate;
            priority: import("../types/enums.js").Priority;
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
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    /**
     * Find sample request by ID with population
     * @param id - Sample request ID (ObjectId or string)
     * @returns Sample request document with populated fields, or null if not found
     * @throws CastError if invalid ObjectId format
     */
    findById(id: string | Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }, {
        timestamps: true;
    }> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }) | null>;
    /**
     * Update sample request
     * @param id - Sample request ID (ObjectId or string)
     * @param updateData - Fields to update
     * @returns Updated sample request document, or null if not found
     * @throws ValidationError if validation fails
     * @throws CastError if invalid ObjectId format
     */
    update(id: string | Types.ObjectId, updateData: UpdateSampleRequestDTO): Promise<(import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }, {
        timestamps: true;
    }> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }) | null>;
    /**
     * Update item status using atomic operations
     * @param requestId - Sample request ID
     * @param itemId - Item ID within the sample request
     * @param status - New status value
     * @param userId - ID of user making the update
     * @returns Updated sample request document, or null if not found
     * @throws CastError if invalid ObjectId format
     */
    updateItemStatus(requestId: string | Types.ObjectId, itemId: string | Types.ObjectId, status: ItemStatus, userId: string | Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }, {
        timestamps: true;
    }> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }) | null>;
    /**
     * Delete sample request
     * @param id - Sample request ID (ObjectId or string)
     * @returns Deleted sample request document, or null if not found
     * @throws CastError if invalid ObjectId format
     */
    delete(id: string | Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, {
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }, {
        timestamps: true;
    }> & Omit<{
        buyerName: string;
        contactPerson: string;
        requiredByDate: NativeDate;
        priority: import("../types/enums.js").Priority;
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
    }) | null>;
}
export declare const sampleRequestRepository: SampleRequestRepository;
//# sourceMappingURL=sampleRequestRepository.d.ts.map