import { useState } from "react";
import { addFunctionalDomainsItem as addApi } from "../../api/functionalDomains/functionalDomainsAdd";

export function useAddFunctionalDomains() {
  const [newFunctionalDomains, setNewFunctionalDomains] = useState<any | null>(null);
  const [loadingAddFunctionalDomains, setLoading] = useState(false);
  const [errorAddFunctionalDomains, setError] = useState<Error | null>(null);

  const addFunctionalDomains = async (data: { label: string; description?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await addApi(data);   
      setNewFunctionalDomains(res);               
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;                        
    } finally {
      setLoading(false);
    }
  };

  return { addFunctionalDomains, loadingAddFunctionalDomains, errorAddFunctionalDomains, newFunctionalDomains };
}
