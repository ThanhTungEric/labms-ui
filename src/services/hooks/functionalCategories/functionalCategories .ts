import { useEffect, useState } from 'react';
import { getFunctionalCategories } from '../../api/functionalCategories/functionalCategories';
import { functionalCategories } from '../../types/functionalCategories.type';
export function useFunctionalCategories() {
  const [functionalCategories, setFunctionalCategories] = useState<functionalCategories[]>([]);
  const [loadingFunctionalCategories, setLoading] = useState(true);
  const [errorFunctionalCategories, setError] = useState<Error | null>(null);

  useEffect(() => {
    getFunctionalCategories()
      .then((data) => setFunctionalCategories(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { functionalCategories, loadingFunctionalCategories, errorFunctionalCategories };
}