import { useState } from "react";
import { addAcademicTitleItem } from "@/services/api";

export function useAddAcademicTitle() {
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState<boolean>(false);
  const [loadingAddAcademicTitle, setLoading] = useState(false);
  const [errorAddAcademicTitle, setError] = useState<Error | null>(null);

  const addAcademicTitle = async (data: { label: string; description?: string }) => {
    setLoading(true);
    setError(null);
    setIsAddedSuccessfully(false);

    try {
      await addAcademicTitleItem(data);
      setIsAddedSuccessfully(true);
      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addAcademicTitle, loadingAddAcademicTitle, errorAddAcademicTitle, isAddedSuccessfully };
}