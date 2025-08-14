import api from '../../config/axios';
import { faculties } from '../../types/faculties.type';
export async function getFaculties(): Promise<faculties[]> {
  const response = await api.get<faculties[]>('/faculties');
  return response.data;
}
