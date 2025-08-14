import { useEffect, useState } from 'react';
import { getPriceCategories } from '../../api/priceCategories/priceCategories';
import { priceCategories } from '../../types/priceCategories.type';
export function usePriceCategories() {
  const [priceCategories, setPriceCategories] = useState<priceCategories[]>([]);
  const [loadingPriceCategories, setLoading] = useState(true);
  const [errorPriceCategories, setError] = useState<Error | null>(null);

  useEffect(() => {
    getPriceCategories()
      .then((data) => setPriceCategories(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { priceCategories, loadingPriceCategories, errorPriceCategories };
}