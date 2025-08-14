import { useEffect, useState } from 'react';
import { getEquipmentStatues } from '../../api/equipmentStatues/equipmentStatues';
import { equipmentStatuses } from '../../types/equipmentStatuses.type';
export function useEquipmentStatuses(params: Record<string, any>) {
  const [equipmentStatuses, setEquipmentStatues] = useState<equipmentStatuses[]>([]);
  const [loadingEquipmentStatuses, setLoading] = useState(true);
  const [errorEquipmentStatuses, setError] = useState<Error | null>(null);

  useEffect(() => {
          let isMounted = true;
          
          setLoading(true);
          getEquipmentStatues(params)
            .then((data) => {
              if (isMounted) setEquipmentStatues(data);
            })
            .catch((err) => {
              if (isMounted) setError(err);
            })
            .finally(() => {
              if (isMounted) setLoading(false);
            });
      
          return () => { isMounted = false };
        }, [params]);
  return { equipmentStatuses, loadingEquipmentStatuses, errorEquipmentStatuses };
}