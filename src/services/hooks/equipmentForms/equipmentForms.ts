import { useEffect, useState, useMemo } from 'react';
import { getEquipmentForms } from '@/services/api';
import { EquipmentForm, GetEquipmentFormsParams, equipmentForms } from '@/services/types/equipmentForms.type';
import { useDebounce } from '@/utils';

export function useEquipmentForms(params: GetEquipmentFormsParams) {
  const [forms, setForms] = useState<EquipmentForm[]>([]);
  const [loadingForms, setLoading] = useState(true);
  const [errorForms, setError] = useState<Error | null>(null);

  const { search, ...restParams } = params;
  const debouncedSearch = useDebounce(search, 500);

  const stableRestParams = useMemo(() => restParams, [JSON.stringify(restParams)]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const apiParams = {
      ...stableRestParams,
      search: debouncedSearch,
    };

    getEquipmentForms(apiParams)
      .then((res: equipmentForms) => {
        if (!isMounted) return;
        const formsArray = Array.isArray(res) ? res : res?.data || [];
        setForms(formsArray);
      })
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false };
  }, [debouncedSearch, stableRestParams]);

  return { forms, loadingForms, errorForms };
}
