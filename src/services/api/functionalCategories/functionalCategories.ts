import api from '../../config/axios';
import { functionalCategories } from '../../types/functionalCategories.type';

export async function getFunctionalCategories(params: Record<string, any> = {}): Promise<functionalCategories[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;

  try 
  {
    const response = await api.get<functionalCategories[]>('/functional-categories', { params: apiParams });
    return response.data;
  }
  catch (error: any) {
    throw new error
  }
}
