import api from '../../config/axios';

import { programsCSM } from '../../types/programCSM.type';

export async function getProgramsCSM(
  params: Record<string, any> = {}
): Promise<programsCSM[]> {
    const { _refresh, ...apiParams } = params; // bỏ _refresh
    const response = await api.get<programsCSM[]>('/programs', { params: apiParams });
  return response.data;
}
