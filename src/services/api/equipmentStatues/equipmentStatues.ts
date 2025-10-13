import api from '@/services/config/axios';

import { equipmentStatuses } from '@/services/types/equipmentStatuses.type';

export async function getEquipmentStatues(params: Record<string, any> = {}): Promise<equipmentStatuses[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try {
    const response = await api.get<equipmentStatuses[]>('/equipment-statuses', { params: apiParams });
    return response.data;
  }
  catch (error: any) {
    throw new error
  }
}


