import api from '../../config/axios';
import { functionalDomains } from '../../types/functionalDomains.type';

export async function getFunctionalDomains(
  params: Record<string, any> = {}
): Promise<functionalDomains[]> {
  
  const response = await api.get<functionalDomains[]>('/functional-domains', {
    params, // truyền params động vào query string
  });
  return response.data;
}
