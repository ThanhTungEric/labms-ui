import { useEffect, useState } from 'react';
import { getAcademicTitles } from '../../api/academicTitle/academicTitle';
import { AcademicTitles } from '../../types/academicTitles.type';
export function useAcademicTitles(params: Record<string, any>) {
  const [academicTitles, setAcademicTitles] = useState<AcademicTitles[]>([]);
  const [loadingAcademicTitles, setLoading] = useState(true);
  const [errorAcademicTitles, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        setLoading(true);
        getAcademicTitles(params)
          .then((data) => {
            if (isMounted) setAcademicTitles(data);
          })
          .catch((err) => {
            if (isMounted) setError(err);
          })
          .finally(() => {
            if (isMounted) setLoading(false);
          });
    
        return () => { isMounted = false };
      }, [params]); // <-- khi params đổi thì gọi lại API
      
  return { academicTitles, loadingAcademicTitles, errorAcademicTitles };
}