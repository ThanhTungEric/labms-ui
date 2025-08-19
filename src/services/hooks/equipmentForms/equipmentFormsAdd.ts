import { useState } from "react";
import { addEquipmentFormsItem as addApi } from "../../api/equipmentForms/equipmentFormsAdd";
export function useAddEquipmentForms() {
  const [newEquipmentForm, setNewEquipmentForm] = useState<any | null>(null);
  const [loadingAddEquipmentForm, setLoading] = useState(false);
  const [errorAddEquipmentForm, setError] = useState<Error | null>(null);

  const addEquipmentForm = async (data: { name: string; description?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewEquipmentForm(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addEquipmentForm, loadingAddEquipmentForm, errorAddEquipmentForm, newEquipmentForm };
}
