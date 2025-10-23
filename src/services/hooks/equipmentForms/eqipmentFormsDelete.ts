import { useState } from 'react';
import { deleteEquipmentFormItems } from '@/services/api';

export function useDeleteEquipmentForms() {
  const [deletedFormIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteForms, setLoading] = useState(false);
  const [errorDeleteForms, setError] = useState<Error | null>(null);

  const deleteEquipmentForms = async (ids: number[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteEquipmentFormItems(ids);
      setDeletedIds(ids);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEquipmentForms, loadingDeleteForms, errorDeleteForms, deletedFormIds };
}