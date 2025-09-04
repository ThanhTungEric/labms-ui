import { useEffect, useState } from 'react';
import { getFunctionalCategories } from '../../api/functionalCategories/functionalCategories';
import { functionalCategories } from '../../types/functionalCategories.type';
export function useFunctionalCategories(params: Record<string, any>) {
  const [functionalCategories, setFunctionalCategories] = useState<functionalCategories[]>([]);
  const [loadingFunctionalCategories, setLoading] = useState(true);
  const [errorFunctionalCategories, setError] = useState<Error | null>(null);

  useEffect(() => {
            let isMounted = true;
            
            setLoading(true);
            getFunctionalCategories(params)
              .then((data) => {
                if (isMounted) setFunctionalCategories(data);
              })
              .catch((err) => {
                if (isMounted) setError(err);
              })
              .finally(() => {
                if (isMounted) setLoading(false);
              });
        
            return () => { isMounted = false };
          }, [params]);

  return { functionalCategories, loadingFunctionalCategories, errorFunctionalCategories };
}