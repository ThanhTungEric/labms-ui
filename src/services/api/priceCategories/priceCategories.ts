import api from '../../config/axios';
import { priceCategories } from '../../types/priceCategories.type';

export async function getPriceCategories(): Promise<priceCategories[]> {
  const response = await api.get<priceCategories[]>('/price-categories');
  return response.data;
}
