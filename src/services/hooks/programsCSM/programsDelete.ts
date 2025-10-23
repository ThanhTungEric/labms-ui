import { useState } from 'react';
import { deleteProgramItems } from '@/services/api';

export function useDeletePrograms() {
  const [deletedProgramsIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeletePrograms, setLoading] = useState(false);
  const [errorDeletePrograms, setError] = useState<Error | null>(null);

  const deletePrograms = async (ids: number[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteProgramItems(ids);
      setDeletedIds(ids);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deletePrograms, loadingDeletePrograms, errorDeletePrograms, deletedProgramsIds };
}