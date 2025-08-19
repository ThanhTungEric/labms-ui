import { useState } from "react";
import { addProgramsItem as addApi } from "../../api/programs/programsAdd";

export function useAddPrograms() {
  const [newPrograms, setNewPrograms] = useState<any | null>(null);
  const [loadingAddPrograms, setLoading] = useState(false);
  const [errorAddPrograms, setError] = useState<Error | null>(null);

  const addPrograms = async (data: { code: string; description?: string ; facultyId: number}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewPrograms(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addPrograms, loadingAddPrograms, errorAddPrograms, newPrograms };
}
