import { useEffect, useState } from 'react';
import { getFaculties } from '../../api/faculties/faculties';
import { faculties } from '../../types/faculties.type';
export function useFaculties(params: Record<string, any>) {
  const [faculties, setFaculties] = useState<faculties[]>([]);
  const [loadingFaculties, setLoading] = useState(true);
  const [errorFaculties, setError] = useState<Error | null>(null);

   useEffect(() => {
        let isMounted = true;
        
        setLoading(true);
        getFaculties(params)
          .then((data) => {
            if (isMounted) setFaculties(data);
          })
          .catch((err) => {
            if (isMounted) setError(err);
          })
          .finally(() => {
            if (isMounted) setLoading(false);
          });
    
        return () => { isMounted = false };
      }, [params]);

  return { faculties, loadingFaculties, errorFaculties };
}