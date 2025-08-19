import { useState } from "react";
import { addPriceCategoriesItem as addApi } from "../../api/priceCategories/priceCategoriesAdd";

export function useAddPriceCategories() {
  const [newPriceCategories, setNewPriceCategories] = useState<any | null>(null);
  const [loadingAddPriceCategories, setLoading] = useState(false);
  const [errorAddPriceCategories, setError] = useState<Error | null>(null);

  const addPriceCategories = async (data: { label: string; description?: string ; rank: number; from: number; to:number }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewPriceCategories(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addPriceCategories, loadingAddPriceCategories, errorAddPriceCategories, newPriceCategories };
}
