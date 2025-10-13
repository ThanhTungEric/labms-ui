import { useEffect, useState } from 'react';
import { getFunctionalCategories } from '@/services/api';
import { functionalCategories, functionalCategoryItems } from '@/services/types';

export function useFunctionalCategories(params: Record<string, any>) {
  const [functionalCategories, setFunctionalCategories] = useState<functionalCategoryItems[]>([]);
  const [loadingFunctionalCategories, setLoading] = useState(true);
  const [errorFunctionalCategories, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getFunctionalCategories(params)
      .then((data: functionalCategories[] | functionalCategories) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          const allItems = data.flatMap((d) => d.data || []);
          setFunctionalCategories(allItems);
        }
        else if (data && 'data' in data) {
          setFunctionalCategories(data.data || []);
        }
        else {
          setFunctionalCategories(data as functionalCategoryItems[]);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params]);

  return { functionalCategories, loadingFunctionalCategories, errorFunctionalCategories };
}
