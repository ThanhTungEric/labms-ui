import { useState } from "react";
import { addAcademicTitleItem as addApi } from "../../api/academicTitle/academicTitleAdd";

export function useAddAcademicTitle() {
  const [newAcademicTitle, setNewAcademicTitle] = useState<any | null>(null);
  const [loadingAddAcademicTitle, setLoading] = useState(false);
  const [errorAddAcademicTitle, setError] = useState<Error | null>(null);

  const addAcademicTitle = async (data: { label: string; description?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewAcademicTitle(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addAcademicTitle, loadingAddAcademicTitle, errorAddAcademicTitle, newAcademicTitle };
}
