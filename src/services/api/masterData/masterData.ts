import api from '../../config/axios';

import { MasterData } from '../../types/masterData.type';

export async function getMasterData(): Promise<MasterData[]> {
  const response = await api.get<MasterData[]>('/master-data');
    console.log(response );

  return response.data;
}
