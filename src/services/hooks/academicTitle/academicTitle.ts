import { useEffect, useState } from 'react';
import { getAcademicTitles } from '../../api/academicTitle/academicTitle';
import { AcademicTitles } from '../../types/academicTitles.type';
export function useAcademicTitles() {
  const [academicTitles, setAcademicTitles] = useState<AcademicTitles[]>([]);
  const [loadingAcademicTitles, setLoading] = useState(true);
  const [errorAcademicTitles, setError] = useState<Error | null>(null);

  useEffect(() => {
    getAcademicTitles()
      .then((data) => setAcademicTitles(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { academicTitles, loadingAcademicTitles, errorAcademicTitles };
}