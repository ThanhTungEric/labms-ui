import api from '../../config/axios';
import { functionalDomains } from '../../types/functionalDomains.type';


export async function getFunctionalDomains(params: Record<string, any> = {}): Promise<functionalDomains[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<functionalDomains[]>('/functional-domains', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
