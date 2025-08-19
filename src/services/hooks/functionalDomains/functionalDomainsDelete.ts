import { useEffect, useState } from 'react';
import { deleteFunctionalDomainsItems as deleteApi } from '../../api/functionalDomains/functionalDomainsDelete';

export function useDeleteFunctionalDomains() {

  const [deletedFunctionalDomainsIds, setDeletedIds] = useState<number[]>([]);
  const [loadingDeleteFunctionalDomains, setLoading] = useState(false);
  const [errorDeleteFunctionalDomains, setError] = useState<Error | null>(null);


  const deleteFunctionalDomains = async (ids: number[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteApi(ids);
       setDeletedIds(ids);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    
  };
  }

  return { deleteFunctionalDomains, loadingDeleteFunctionalDomains, errorDeleteFunctionalDomains, deletedFunctionalDomainsIds };
}
