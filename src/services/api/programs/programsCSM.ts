import api from '../../config/axios';

import { programsCSM } from '../../types/programCSM.type';


export async function getProgramsCSM(params: Record<string, any> = {}): Promise<programsCSM[]> {
  const { _refresh, search, ...rest } = params;
  const apiParams: Record<string, any> = { ...rest };
  if (search && search.trim() !== '') apiParams.search = search;
  try 
  {
    const response = await api.get<programsCSM[]>('/programs', { params: apiParams });

    return response.data;
  } 
  catch (error: any) 
  {
    throw new error
  }
}
