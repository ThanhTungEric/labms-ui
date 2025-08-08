import api from '../../config/axios';

import { AcademicTitles } from '../../types/academicTitles.type';

export async function getAcademicTitles(): Promise<AcademicTitles[]> {
  const response = await api.get<AcademicTitles[]>('/academic-titles');
  console.log(response);
  return response.data;
}
