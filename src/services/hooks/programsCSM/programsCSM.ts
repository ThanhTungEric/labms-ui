import { useEffect, useState } from 'react';
import { getProgramsCSM } from '../../api/programs/programsCSM';
import { programsCSM } from '../../types/programCSM.type';
export function useProgramsCSM(params: Record<string, any>) {
  const [programsCSM, setProgramCSM] = useState<programsCSM[]>([]);
  const [loadingProgramsCSM, setLoading] = useState(true);
  const [errorProgramsCSM, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
      let isMounted = true;
      
      setLoading(true);
      getProgramsCSM(params)
        .then((data) => {
          if (isMounted) setProgramCSM(data);
        })
        .catch((err) => {
          if (isMounted) setError(err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
  
      return () => { isMounted = false };
    }, [params]); // <-- khi params đổi thì gọi lại API
  return { programsCSM, loadingProgramsCSM, errorProgramsCSM };
}