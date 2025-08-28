import { useEffect, useState } from 'react';
import { getEquipmentForms } from '../../api/equipmentForms/equipmentForms';
import { equipmentForms } from '../../types/equipmentForms.type';
import { MoreActionItem } from '@/services/types';
export function useEquipmentForms(params: Record<string, any>) {
  const [equipmentForms, setEquipmentForms] = useState<equipmentForms[]>([]);
  const [loadingEquipmentForms, setLoading] = useState(true);
  const [errorEquipmentForms, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    getEquipmentForms(params)
      .then((data) => {
        if (isMounted) setEquipmentForms(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false };
  }, [params]);

  return { equipmentForms, loadingEquipmentForms, errorEquipmentForms };
}

