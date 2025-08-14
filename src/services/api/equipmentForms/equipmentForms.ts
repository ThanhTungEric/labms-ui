import api from '../../config/axios';
import { equipmentForms } from '../../types/equipmentForms.type';
export async function getEquipmentForms(): Promise<equipmentForms[]> {
  const response = await api.get<equipmentForms[]>('/forms');
  return response.data;
}
