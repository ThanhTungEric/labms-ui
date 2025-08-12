import api from '../../config/axios';
import { functionalCategories } from '../../types/functionalCategories.type';
export async function getFunctionalCategories(): Promise<functionalCategories[]> {
  const response = await api.get<functionalCategories[]>('/functional-domains');
  return response.data;
}
