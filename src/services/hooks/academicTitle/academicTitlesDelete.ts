import { useEffect, useState } from 'react';
import { deleteAcademicTitleItems as deleteApi } from '../../api/academicTitle/academicTitlesDelete';
export function useDeleteAcademicTitles() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteAcademicTitles, setLoading] = useState(false);
  const [errorDeleteAcademicTitles, setError] = useState<Error | null>(null);


  const deleteAcademicTitles = async (ids: number[]) => {
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

  return { deleteAcademicTitles, loadingDeleteAcademicTitles, errorDeleteAcademicTitles, deletedIds };
}
