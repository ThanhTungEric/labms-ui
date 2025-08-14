import api from '../../config/axios';
import { functionalDomains } from '../../types/functionalDomains.type';

export async function getFunctionalDomains(
  params: Record<string, any> = {}
): Promise<functionalDomains[]> {
    const { _refresh, ...apiParams } = params; // bỏ _refresh
  const response = await api.get<functionalDomains[]>('/functional-domains', { params: apiParams });
  return response.data;
}
