import api from '@/services/config/axios';
import qs from 'qs';
import { GetProgramsParams, Program, ProgramsResponse } from '@/services/types/program.type';

const BASE = '/programs';

export async function addProgramsItem(data: { code: string; name?: string; facultyId: number }): Promise<void> {
  if (!data?.code) {
    throw new Error('Program code is required');
  }

  try {
    await api.post(BASE, data); 
  } catch (error: any) {
    throw new Error(error?.message || 'Add failed, please check and try again');
  }
}

export async function getPrograms(params: GetProgramsParams = {}): Promise<Program[]> {
  const { _refresh, skip, take, searchKeyword, searchFaculty, sorts } = params;
  
  const apiParams: Record<string, any> = {};

  if (skip !== undefined) apiParams.skip = skip;
  if (take !== undefined) apiParams.take = take;
  
  if (searchKeyword && typeof searchKeyword === 'string' && searchKeyword.trim() !== '') {
    apiParams.searchKeyword = searchKeyword.trim();
  }
  
  if (searchFaculty !== undefined) apiParams.searchFaculty = searchFaculty;

  if (sorts && Array.isArray(sorts) && sorts.length > 0) {
    apiParams.sorts = JSON.stringify(sorts);
  }

  try {
    const response = await api.get<ProgramsResponse>(BASE, { params: apiParams });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to retrieve programs');
  }
}

export async function deleteProgramItems(ids: number[]): Promise<void> {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('Please select the row to delete');
  }

  try {
    await api.delete(BASE, {
      params: { ids },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
  } catch (error: any) {
    throw new Error(error?.message || 'Delete failed, please check and try again');
  }
}
