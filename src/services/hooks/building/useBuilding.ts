import { useEffect, useState, useCallback } from 'react';
import { getAllBuildings, getBuildingById } from '../../api/building/building';
import { Building } from '../../types/building.type';

export function useBuildings(id?: number) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBuildings = useCallback(async () => {
    setLoading(true);
    try {
      if (id) {
        const data = await getBuildingById(id);
        setBuildings([data]);
      } else {
        const data = await getAllBuildings();
        setBuildings(data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  return { buildings, loading, error, reload: fetchBuildings };
}
