import { useEffect, useState } from 'react';
import { getAllBuildings } from '../../api/building/building';
import { Building } from '../../types/building.type';

export function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getAllBuildings()
      .then((data) => setBuildings(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { buildings, loading, error };
}