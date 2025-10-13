import api from '@/services/config/axios';
import { EquipmentItem } from '@/services/types';

export interface EquipmentItemSort {
    field:
    | 'id'
    | 'serialNumber'
    | 'warrantyExpiration'
    | 'purchaseDate'
    | 'status'
    | 'base'
    | 'lab'
    | (string & {});
    dir: 'asc' | 'desc';
}

export interface EquipmentItemsQuery {
    skip?: number;
    take?: number;
    searchSerialNumber?: string;
    searchBase?: number[];
    searchLab?: number[];
    searchStatus?: number;
    ids?: number[];
    sorts?: EquipmentItemSort[];
}

export interface EquipmentItemsMeta {
    count: number;
    page?: number;
    totalPages?: number;
}

export interface EquipmentItemsResponse {
    data: EquipmentItem[];
    meta: EquipmentItemsMeta;
}

export const getEquipmentItems = async (
    params: EquipmentItemsQuery = {}
): Promise<EquipmentItemsResponse> => {
    const response = await api.get<EquipmentItemsResponse>('/equipment-items', { params });
    const { data, meta } = response.data;

    const page = params.skip && params.take ? Math.floor(params.skip / params.take) + 1 : 1;
    const totalPages = params.take ? Math.ceil((meta.count || 0) / params.take) : 1;

    return { data, meta: { ...meta, page, totalPages } };
};

export const getEquipmentItemById = async (id: number): Promise<EquipmentItem> => {
    const response = await api.get<EquipmentItem>(`/equipment-items/${id}`);
    return response.data;
};

export interface CreateEquipmentItemDto {
    serialNumber: string;
    warrantyExpiration: string;
    purchaseDate: string;
    status: number;
    baseId: number;
    labId: number;
}

export const createEquipmentItem = async (dto: CreateEquipmentItemDto): Promise<EquipmentItem> => {
    const response = await api.post<EquipmentItem>('/equipment-items', dto);
    return response.data;
};

export interface UpdateEquipmentItemDto {
    serialNumber?: string;
    warrantyExpiration?: string;
    purchaseDate?: string;
    status?: number;
    labId?: number;
}

export const updateEquipmentItem = async (
    id: number,
    dto: UpdateEquipmentItemDto
): Promise<EquipmentItem> => {
    const response = await api.patch<EquipmentItem>(`/equipment-items/${id}`, dto);
    return response.data;
};


export const deleteEquipmentItem = async (id: number): Promise<void> => {
    await api.delete(`/equipment-items/${id}`);
};