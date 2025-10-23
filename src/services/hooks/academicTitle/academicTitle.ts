import { useEffect, useState, useMemo } from 'react';
import { getAcademicTitles } from '@/services/api';
import { AcademicTitle, GetAcademicTitlesParams } from '@/services/types';
import { useDebounce } from '@/utils';

export function useAcademicTitles(params: GetAcademicTitlesParams) {
  const [academicTitles, setAcademicTitles] = useState<AcademicTitle[]>([]);
  const [loadingAcademicTitles, setLoading] = useState(true);
  const [errorAcademicTitles, setError] = useState<Error | null>(null);

  const { search, ...restParams } = params;
  const debouncedSearch = useDebounce(search, 500);

  const debouncedParams = useMemo(
    () => ({ ...restParams, search: debouncedSearch }),
    [debouncedSearch, JSON.stringify(restParams)]
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getAcademicTitles(debouncedParams)
      .then((response) => {
        if (isMounted && response && response.data) {
          setAcademicTitles(response.data);
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
  }, [debouncedParams]);

  return { academicTitles, loadingAcademicTitles, errorAcademicTitles };
}
