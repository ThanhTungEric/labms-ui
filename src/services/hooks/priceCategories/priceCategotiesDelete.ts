import { useEffect, useState } from 'react';
import { deletePriceCategoriesItems as deleteApi } from '../../api/priceCategories/priceCategoriesDelete';

export function useDeletePriceCategories() {

  const [deletedPriceCategoriesIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeletePriceCategories, setLoading] = useState(false);
  const [errorDeletePriceCategories, setError] = useState<Error | null>(null);


  const deletePriceCategories = async (ids: number[]) => {
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

  return { deletePriceCategories, loadingDeletePriceCategories, errorDeletePriceCategories, deletedPriceCategoriesIds };
}
