import api from '../../config/axios';

import { equipmentStatuses } from '../../types/equipmentStatuses.type';
  export async function getEquipmentStatues(): Promise<equipmentStatuses[]> {
  const response = await api.get<equipmentStatuses[]>('/equipment-statuses');
  return response.data;
}
