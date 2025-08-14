import { useEffect, useState } from 'react';
import { getFaculties } from '../../api/faculties/faculties';
import { faculties } from '../../types/faculties.type';
export function useFaculties() {
  const [faculties, setFaculties] = useState<faculties[]>([]);
  const [loadingFaculties, setLoading] = useState(true);
  const [errorFaculties, setError] = useState<Error | null>(null);

  useEffect(() => {
    getFaculties()
      .then((data) => setFaculties(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { faculties, loadingFaculties, errorFaculties };
}