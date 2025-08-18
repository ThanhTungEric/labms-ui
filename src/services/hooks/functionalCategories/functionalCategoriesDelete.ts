import { useEffect, useState } from 'react';
import { deleteFunctionalCategoriesItems as deleteApi } from '../../api/functionalCategories/functionalCategoriesDelete';
export function useDeleteFunctionalCategories() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteFunctionalCategories, setLoading] = useState(false);
  const [errorDeleteFunctionalCategories, setError] = useState<Error | null>(null);


  const deleteFunctionalCategories = async (ids: number[]) => {
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

  return { deleteFunctionalCategories, loadingDeleteFunctionalCategories, errorDeleteFunctionalCategories, deletedIds };
}
