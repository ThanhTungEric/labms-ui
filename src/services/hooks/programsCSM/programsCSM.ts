import { useEffect, useState } from 'react';
import { getProgramsCSM } from '../../api/programs/programsCSM';
import { programsCSM } from '../../types/programCSM.type';
export function useProgramsCSM(searchKeyword?: string) {
  const [programsCSM, setProgramCSM] = useState<programsCSM[]>([]);
  const [loadingProgramsCSM, setLoading] = useState(true);
  const [errorProgramsCSM, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProgramsCSM({searchKeyword})
      .then((data) => {
  setProgramCSM(data);
})
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, [searchKeyword]);
  return { programsCSM, loadingProgramsCSM, errorProgramsCSM };
}