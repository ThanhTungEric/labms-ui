import { useState } from "react";
import { addFacultyItem as addApi } from "../../api/faculties/facultiesAdd";

export function useAddFaculty() {
  const [newFaculty, setNewFaculty] = useState<any | null>(null);
  const [loadingAddFaculty, setLoading] = useState(false);
  const [errorAddFaculty, setError] = useState<Error | null>(null);

  const addFaculty = async (data: { name: string; description?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewFaculty(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addFaculty, loadingAddFaculty, errorAddFaculty, newFaculty };
}
