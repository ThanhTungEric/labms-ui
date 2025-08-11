import api from '../../config/axios';

import { programsCSM } from '../../types/programCSM.type';

export async function getProgramsCSM(params?: { searchKeyword?: string; }): Promise<programsCSM[]> {
 const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('Token is missing');
  const response = await api.get<programsCSM[]>('/programs', {
    params: params || {},
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
