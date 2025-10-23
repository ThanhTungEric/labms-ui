import api from '@/services/config/axios';
import qs from 'qs';
import { EquipmentForm, GetEquipmentFormsParams, equipmentForms } from '@/services/types';

const BASE_URL = '/forms';

export async function getEquipmentForms(
  params: GetEquipmentFormsParams = {}
): Promise<equipmentForms> {
  const { _refresh, skip, take, search, sorts, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };

  if (skip !== undefined) apiParams.skip = skip;
  if (take !== undefined) apiParams.take = take;
  if (search && search.trim() !== '') apiParams.search = search;
  if (sorts && Array.isArray(sorts) && sorts.length > 0)
    apiParams.sorts = JSON.stringify(sorts);

  try {
    const response = await api.get<equipmentForms>('/forms', { params: apiParams });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to retrieve equipment forms');
  }
}

export async function addEquipmentFormsItem(
  data: { name: string; description?: string }
): Promise<void> {
  if (!data?.name) throw new Error('Form name is required');

  try {
    await api.post(BASE_URL, data);
  } catch (error: any) {
    throw new Error(error?.message || 'Add failed, please check and try again');
  }
}

export async function deleteEquipmentFormItems(ids: number[]): Promise<void> {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('Please select at least one form to delete');
  }

  try {
    await api.delete(BASE_URL, {
      params: { ids },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
  } catch (error: any) {
    throw new Error(error?.message || 'Delete failed, please check and try again');
  }
}
