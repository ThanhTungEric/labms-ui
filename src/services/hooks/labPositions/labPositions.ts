import { useEffect, useState } from 'react';
import { getFaculties } from '../../api/faculties/faculties';
import { labPositions } from '../../types/labPositions.type';
import { getLabPositions } from '../../api/labPositions/labPositions';
export function useLabPositions() {
  const [labPositions, setLabPositions] = useState<labPositions[]>([]);
  const [loadingLabPositions, setLoading] = useState(true);
  const [errorLabPositions, setError] = useState<Error | null>(null);

  useEffect(() => {
    getLabPositions()
      .then((data) => setLabPositions(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { labPositions, loadingLabPositions, errorLabPositions };
}