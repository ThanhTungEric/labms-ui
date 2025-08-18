import { useEffect, useState } from 'react';
import {deleteEquipmentFormItems as deleteApi } from '../../api/equipmentForms/equipmentFormsDelete'
export function useDeleteEquipmentForms() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteEquipmentForms, setLoading] = useState(false);
  const [errorDeleteEquipmentForms, setError] = useState<Error | null>(null);


  const deleteEquipmentForms = async (ids: number[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteApi(ids);
       setDeletedIds(ids);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      
  };
  }

  return { deleteEquipmentForms, loadingDeleteEquipmentForms, errorDeleteEquipmentForms, deletedIds };
}
