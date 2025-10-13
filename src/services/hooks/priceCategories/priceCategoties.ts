import { useEffect, useState } from 'react';
import { getPriceCategories } from '@/services/api/priceCategories/priceCategories';
import { priceCategories } from '../../types/priceCategories.type';
export function usePriceCategories(params: Record<string, any>) {
  const [priceCategories, setPriceCategories] = useState<priceCategories[]>([]);
  const [loadingPriceCategories, setLoading] = useState(true);
  const [errorPriceCategories, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    getPriceCategories()
      .then((data) => {
        if (isMounted) setPriceCategories(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false };
  }, [params]);

  return { priceCategories, loadingPriceCategories, errorPriceCategories };
}