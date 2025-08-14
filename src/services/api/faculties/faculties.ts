import api from '../../config/axios';
import { faculties } from '../../types/faculties.type';

export async function getFaculties(params: Record<string, any> = {}): Promise<faculties[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<faculties[]>('/faculties', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
