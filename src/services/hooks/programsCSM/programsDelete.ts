import { useEffect, useState } from 'react';
import { deleteProgramItems as deleteApi } from '../../api/programs/programsDelete';

export function useDeletePrograms() {

  const [deletedProgramsIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeletePrograms, setLoading] = useState(false);
  const [errorDeletePrograms, setError] = useState<Error | null>(null);


  const deletePrograms = async (ids: number[]) => {
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

  return { deletePrograms, loadingDeletePrograms, errorDeletePrograms, deletedProgramsIds };
}
