import api from '../../config/axios';
import qs from 'qs';
 interface DeleteParams extends Record<string, any> {
  ids: number[]; // hoặc string[] tùy ID
}
export async function deleteEquipmentFormItems(ids: number[]): Promise<void> {

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('Phải cung cấp mảng IDs để xóa');
  }

  try {
      await api.delete('/forms', {
      params: { ids },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });

  } catch (error: any) {
    console.error('Lỗi khi xóa equipment forms:', error);
    throw new Error(error?.message || 'Xóa thất bại');
  }
}
