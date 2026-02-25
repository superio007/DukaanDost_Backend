import { Role, ItemStatus, Priority } from "./enums.js";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateSampleItemDTO {
  fabricName: string;
  color: string;
  gsm: number;
  requiredMeters: number;
  availableMeters: number;
}

export interface CreateSampleRequestDTO {
  buyerName: string;
  contactPerson: string;
  requiredByDate: string;
  priority: Priority;
  items: CreateSampleItemDTO[];
  attachments?: string[];
}

export interface UpdateSampleRequestDTO {
  buyerName?: string;
  contactPerson?: string;
  requiredByDate?: string;
  priority?: Priority;
  attachments?: string[];
  items?: Array<{
    _id?: string;
    fabricName?: string;
    color?: string;
    gsm?: number;
    requiredMeters?: number;
    availableMeters?: number;
    status?: ItemStatus;
  }>;
}

export interface CreateInventoryDTO {
  fabricName: string;
  color: string;
  gsm: number;
  availableMeters: number;
}

export interface UpdateInventoryDTO {
  availableMeters: number;
}

export interface PaginationDTO {
  page: number;
  limit: number;
}

export interface SampleRequestFilters {
  buyerName?: string;
  status?: ItemStatus;
  priority?: Priority;
}

export interface InventoryFilters {
  fabricName?: string;
  color?: string;
  gsm?: number;
}

export interface DashboardStats {
  totalSampleRequests: number;
  pendingSamples: number;
  sentToday: number;
  approvalRatePercentage: number;
}
