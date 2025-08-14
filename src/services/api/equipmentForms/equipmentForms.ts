import api from '../../config/axios';
import { equipmentForms } from '../../types/equipmentForms.type';

export async function getEquipmentForms(params: Record<string, any> = {}): Promise<equipmentForms[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<equipmentForms[]>('/forms', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
