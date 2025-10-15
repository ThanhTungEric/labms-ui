import api from '@/services/config/axios';
import { equipmentFormItems, equipmentForms } from '../../types/equipmentForms.type';

export async function getEquipmentForms(params: Record<string, any> = {}): Promise<equipmentForms[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try {
    const response = await api.get<equipmentForms[]>('/forms', { params: apiParams });
    return response.data;
  }
  catch (error: any) {
    throw new error
  }
}

export async function getEquipmentFormsWithData(params: Record<string, any> = {}): Promise<equipmentFormItems[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try {
    const response = await api.get<{ data: equipmentFormItems[] }>('/forms', { params: apiParams });
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
}