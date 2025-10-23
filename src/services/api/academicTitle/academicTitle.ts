import api from '@/services/config/axios';
import qs from 'qs';
import { AcademicTitle, GetAcademicTitlesParams } from '@/services/types';

const BASE_URL = '/academic-titles';

export async function getAcademicTitles(params: GetAcademicTitlesParams = {}): Promise<{ data: AcademicTitle[]; meta: { count: number } }> {
  const { _refresh, skip, take, search, sorts } = params;
  
  const apiParams: Record<string, any> = {};

  if (skip !== undefined) apiParams.skip = skip;
  if (take !== undefined) apiParams.take = take;
  
  if (search && typeof search === 'string' && search.trim() !== '') {
    apiParams.search = search.trim();
  }

  if (sorts && Array.isArray(sorts) && sorts.length > 0) {
    apiParams.sorts = JSON.stringify(sorts); 
  }

  try {
    const response = await api.get<{ data: AcademicTitle[]; meta: { count: number } }>(BASE_URL, { params: apiParams });
    return response.data; 
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to retrieve academic titles'); 
  }
}



export async function addAcademicTitleItem(data: { label: string; description?: string }): Promise<void> {
  if (!data?.label) {
    throw new Error("Academic title label is required");
  }

  try {
    await api.post(BASE_URL, data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}


export async function deleteAcademicTitleItems(ids: number[]): Promise<void> {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('Please select the row to delete');
  }

  try {
    await api.delete(BASE_URL, {
      params: { ids },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
  } catch (error: any) {
    throw new Error(error?.message || 'Delete failed, please check and try again');
  }
}