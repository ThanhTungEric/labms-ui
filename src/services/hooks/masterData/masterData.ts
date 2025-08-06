import { useEffect, useState } from 'react';
import { getMasterData } from '../../api/masterData/masterData';
import { MasterData } from '../../types/masterData.type';
export function useMasterData() {
  const [masterData, setMasterData] = useState<MasterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getMasterData()
      .then((data) => setMasterData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { masterData, loading, error };
}