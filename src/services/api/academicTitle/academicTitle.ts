import api from '../../config/axios';

import { AcademicTitles } from '../../types/academicTitles.type';
export async function getAcademicTitles(  params: Record<string, any> = {}
): Promise<AcademicTitles[]> {
  const response = await api.get<AcademicTitles[]>('/academic-titles', {
    params, // truyền params động vào query string
  });
  return response.data;
}
