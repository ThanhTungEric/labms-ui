import api from '../../config/axios';
import { AcademicTitles } from '../../types/academicTitles.type';

export async function getAcademicTitles(params: Record<string, any> = {}): Promise<AcademicTitles[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<AcademicTitles[]>('/academic-titles', { params: apiParams });
    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
