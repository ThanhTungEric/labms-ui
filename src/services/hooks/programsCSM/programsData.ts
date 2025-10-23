import { useEffect, useState, useMemo } from 'react';
import { getPrograms } from '@/services/api';
import { Program, GetProgramsParams } from '@/services/types/program.type';
import { useDebounce } from '@/utils';

export function usePrograms(params: GetProgramsParams) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoading] = useState(true);
  const [errorPrograms, setError] = useState<Error | null>(null);

  const debouncedKeyword = useDebounce(params.searchKeyword, 500);

  const stableParams = useMemo(
    () => ({ ...params, searchKeyword: debouncedKeyword }),
    [debouncedKeyword, JSON.stringify(params)]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getPrograms(stableParams)
      .then((data) => mounted && setPrograms(data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false };
  }, [stableParams]);

  return { programs, loadingPrograms, errorPrograms };
}
