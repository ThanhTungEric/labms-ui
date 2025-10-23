import { useState } from 'react';
import { deleteAcademicTitleItems } from '@/services/api';

export function useDeleteAcademicTitles() {
  const [deletedAcademicTitleIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteAcademicTitles, setLoading] = useState(false);
  const [errorDeleteAcademicTitles, setError] = useState<Error | null>(null);

  const deleteAcademicTitles = async (ids: number[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteAcademicTitleItems(ids);
      setDeletedIds(ids);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAcademicTitles, loadingDeleteAcademicTitles, errorDeleteAcademicTitles, deletedAcademicTitleIds };
}