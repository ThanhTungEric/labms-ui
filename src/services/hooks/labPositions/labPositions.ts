import { useEffect, useState } from 'react';
import { getFaculties } from '../../api/faculties/faculties';
import { labPositions } from '../../types/labPositions.type';
import { getLabPositions } from '../../api/labPositions/labPositions';
export function useLabPositions(params: Record<string, any>) {
  const [labPositions, setLabPositions] = useState<labPositions[]>([]);
  const [loadingLabPositions, setLoading] = useState(true);
  const [errorLabPositions, setError] = useState<Error | null>(null);

  useEffect(() => {
          let isMounted = true;
          
          setLoading(true);
          getFaculties(params)
            .then((data) => {
              if (isMounted) setLabPositions(data);
            })
            .catch((err) => {
              if (isMounted) setError(err);
            })
            .finally(() => {
              if (isMounted) setLoading(false);
            });
      
          return () => { isMounted = false };
        }, [params]);

  return { labPositions, loadingLabPositions, errorLabPositions };
}