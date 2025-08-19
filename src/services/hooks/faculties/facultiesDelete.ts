import { useEffect, useState } from 'react';
import { deleteFacultiesItems  as deleteApi} from '../../api/faculties/facultiesDelete';
export function useDeleteFaculties() {
  const [deletedFacultiesIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteFaculties, setLoading] = useState(false);
  const [errorDeleteFaculties, setError] = useState<Error | null>(null);


  const deleteFaculties = async (ids: number[]) => {
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

  return { deleteFaculties, loadingDeleteFaculties, errorDeleteFaculties, deletedFacultiesIds };
}
