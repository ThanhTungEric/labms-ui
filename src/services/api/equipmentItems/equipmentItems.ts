import api from '@/services/config/axios';
import {
  CreateEquipmentItemDto,
  EquipmentItem,
  EquipmentItemsQuery,
  EquipmentItemsResponse,
  UpdateEquipmentItemDto,
} from '@/services/types';

const BASE = '/equipment-items';

export const getEquipmentItems = async (
  params: EquipmentItemsQuery = {}
): Promise<EquipmentItemsResponse> => {
  const { data: { data, meta } } = await api.get<EquipmentItemsResponse>(BASE, { params });

  const page = params.skip && params.take ? Math.floor(params.skip / params.take) + 1 : 1;
  const totalPages = params.take ? Math.ceil((meta.count || 0) / params.take) : 1;

  return { data, meta: { ...meta, page, totalPages } };
};

export const getEquipmentItemById = async (id: number): Promise<EquipmentItem> => {
  const { data } = await api.get<EquipmentItem>(`${BASE}/${id}`);
  return data;
};

export const createEquipmentItem = async (dto: CreateEquipmentItemDto): Promise<EquipmentItem> => {
  const { data } = await api.post<EquipmentItem>(BASE, dto);
  return data;
};

export const updateEquipmentItem = async (id: number, dto: UpdateEquipmentItemDto): Promise<EquipmentItem> => {
  const { data } = await api.patch<EquipmentItem>(`${BASE}/${id}`, dto);
  return data;
};

export const deleteEquipmentItem = async (id: number): Promise<void> => {
  await api.delete(`${BASE}/${id}`);
};
