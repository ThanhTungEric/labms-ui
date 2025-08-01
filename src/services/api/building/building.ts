import api from '../../config/axios';

import { Building } from '../../types/building.type';

export async function getAllBuildings(): Promise<Building[]> {
  const response = await api.get<Building[]>('/buildings');
  return response.data;
}
