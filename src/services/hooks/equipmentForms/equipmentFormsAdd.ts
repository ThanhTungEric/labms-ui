import { useState } from "react";
import { addEquipmentFormsItem } from "@/services/api";

export function useAddEquipmentForm() {
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState<boolean>(false);
  const [loadingAddForm, setLoading] = useState(false);
  const [errorAddForm, setError] = useState<Error | null>(null);

  const addEquipmentForm = async (data: { name: string; description?: string }) => {
    setLoading(true);
    setError(null);
    setIsAddedSuccessfully(false);

    try {
      await addEquipmentFormsItem(data);
      setIsAddedSuccessfully(true);
      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addEquipmentForm, loadingAddForm, errorAddForm, isAddedSuccessfully };
}