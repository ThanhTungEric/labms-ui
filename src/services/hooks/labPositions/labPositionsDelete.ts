import { useEffect, useState } from 'react';
import { deleteLabPositionItems as deleteApi } from '../../api/labPositions/labPositionsDelete';

export function useDeleteLabPositions() {

  const [deletedLabPositionsIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteLabPositions, setLoading] = useState(false);
  const [errorDeleteLabPositions, setError] = useState<Error | null>(null);


  const deleteLabPositions = async (ids: number[]) => {
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

  return { deleteLabPositions, loadingDeleteLabPositions, errorDeleteLabPositions, deletedLabPositionsIds };
}
