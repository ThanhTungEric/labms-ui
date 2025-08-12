import api from '../../config/axios';

import { programsCSM } from '../../types/programCSM.type';

export async function getProgramsCSM(
  params: Record<string, any> = {}
): Promise<programsCSM[]> {
  const response = await api.get<programsCSM[]>('/programs', {
    params, // truyền params động vào query string
  });
  return response.data;
}
