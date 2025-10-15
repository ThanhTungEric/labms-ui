import { useEffect, useState } from 'react';
import { getFunctionalDomains } from '@/services/api';
import {
  functionalDomains,
  functionalDomainItems,
} from '../../types/functionalDomains.type';

export function useFunctionalDomains(params: Record<string, any>) {
  const [functionalDomains, setFunctionalDomains] = useState<functionalDomainItems[]>([]);
  const [loadingFunctionalDomains, setLoading] = useState(true);
  const [errorFunctionalDomains, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getFunctionalDomains(params)
      .then((data: functionalDomains[] | functionalDomains | functionalDomainItems[]) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          if (data.length > 0 && 'data' in data[0]) {
            const allItems = data.flatMap((d: any) => d.data || []);
            setFunctionalDomains(allItems);
          } else {
            setFunctionalDomains(data as functionalDomainItems[]);
          }
        }
        else if (data && 'data' in data) {
          setFunctionalDomains((data as functionalDomains).data || []);
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

  return { functionalDomains, loadingFunctionalDomains, errorFunctionalDomains };
}
