import api from '../../config/axios';
import { labPositions } from '../../types/labPositions.type';

export async function getLabPositions(params: Record<string, any> = {}): Promise<labPositions[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<labPositions[]>('/forms', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
