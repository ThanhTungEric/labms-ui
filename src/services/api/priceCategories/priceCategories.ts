import api from '../../config/axios';
import { priceCategories } from '../../types/priceCategories.type';


export async function getPriceCategories(params: Record<string, any> = {}): Promise<priceCategories[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<priceCategories[]>('/forms', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
