import { useState } from "react";
import { addFunctionalCategoriesItem as addApi } from "../../api/functionalCategories/functionalCategoriesAdd";
export function useAddFunctionalCategories() {
  const [newFunctionalCategories, setNewFunctionalCategories] = useState<any | null>(null);
  const [loadingAddFunctionalCategories, setLoading] = useState(false);
  const [errorAddFunctionalCategories, setError] = useState<Error | null>(null);

  const addFunctionalCategories = async (data: { label: string; description?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewFunctionalCategories(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addFunctionalCategories, loadingAddFunctionalCategories, errorAddFunctionalCategories, newFunctionalCategories };
}
