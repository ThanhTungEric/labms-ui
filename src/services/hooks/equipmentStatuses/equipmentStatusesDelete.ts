import { useEffect, useState } from 'react';
import { deleteEquipmentStatuesItems as deleteApi } from '../../api/equipmentStatues/equipmentStatuesDelete';
export function useDeleteEquipmentStatuses() {
  const [deletedEquipmentStatusesIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteEquipmentStatuses, setLoading] = useState(false);
  const [errorDeleteEquipmentStatuses, setError] = useState<Error | null>(null);


  const deleteEquipmentStatuses = async (ids: number[]) => {
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

  return { deleteEquipmentStatuses, loadingDeleteEquipmentStatuses, errorDeleteEquipmentStatuses, deletedEquipmentStatusesIds };
}
