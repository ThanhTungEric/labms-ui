import api from '../../config/axios';

import { AcademicTitles } from '../../types/academicTitles.type';

export async function getAcademicTitles(  params: Record<string, any> = {}
): Promise<AcademicTitles[]> {
    const { _refresh, ...apiParams } = params; // bỏ _refresh
  const response = await api.get<AcademicTitles[]>('/academic-titles', { params: apiParams });
  return response.data;
}
