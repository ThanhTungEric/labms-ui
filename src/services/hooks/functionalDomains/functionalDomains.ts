import { useEffect, useState, useCallback } from 'react';
import { getFunctionalDomains } from '../../api/functionalDomains/functionalDomains';
import { functionalDomains } from '../../types/functionalDomains.type';
export function useFunctionalDomains(params: Record<string, any>) {
  const [functionalDomains, setFunctionalDomains] = useState<functionalDomains[]>([]);
  const [loadingFunctionalDomains, setLoading] = useState(true);
  const [errorFunctionalDomains, setError] = useState<Error | null>(null);
 
  // useEffect(async (customParams = params) => {
  //   setLoading(true);
  //     await getFunctionalDomains(customParams)
  //     .then((data) => setFunctionalDomains(data))
  //     .catch((err) => setError(err))
  //     .finally(() => setLoading(false));

  // }, []);
   useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getFunctionalDomains(params)
      .then((data) => {
        if (isMounted) setFunctionalDomains(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false };
  }, [params]); // <-- khi params đổi thì gọi lại API

  return { functionalDomains, loadingFunctionalDomains, errorFunctionalDomains };
}