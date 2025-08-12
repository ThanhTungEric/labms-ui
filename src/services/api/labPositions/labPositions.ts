import api from '../../config/axios';
import { labPositions } from '../../types/labPositions.type';
export async function getLabPositions(): Promise<labPositions[]> {
  const response = await api.get<labPositions[]>('/lab-positions');
  return response.data;
}
