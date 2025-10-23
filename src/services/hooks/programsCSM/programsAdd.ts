import { useState } from "react";
import { addProgramsItem } from "@/services/api";

export function useAddPrograms() {
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState<boolean>(false); 
  const [loadingAddPrograms, setLoading] = useState(false);
  const [errorAddPrograms, setError] = useState<Error | null>(null);

  const addPrograms = async (data: { code: string; name?: string; facultyId: number }) => {
    setLoading(true);
    setError(null);
    setIsAddedSuccessfully(false); 

    try {
      await addProgramsItem(data);
      setIsAddedSuccessfully(true); 
      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addPrograms, loadingAddPrograms, errorAddPrograms, isAddedSuccessfully };
}