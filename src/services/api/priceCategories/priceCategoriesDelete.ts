import api from '../../config/axios';
import qs from 'qs';

export async function deletePriceCategoriesItems(ids: number[]): Promise<void> {

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('Please select the row to delete');
  }

  try {
      await api.delete('/price-categories', {
      params: { ids },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });

  } catch (error: any) {
    
    throw new Error(error?.message || 'Delete failed please check and try again');
  }
}
