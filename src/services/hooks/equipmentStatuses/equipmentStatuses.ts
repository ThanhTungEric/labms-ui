import { useEffect, useState } from 'react';
import { getEquipmentStatues } from '../../api/equipmentStatues/equipmentStatues';
import { equipmentStatuses } from '../../types/equipmentStatuses.type';
export function useEquipmentStatuses() {
  const [equipmentStatuses, setEquipmentStatues] = useState<equipmentStatuses[]>([]);
  const [loadingEquipmentStatuses, setLoading] = useState(true);
  const [errorEquipmentStatuses, setError] = useState<Error | null>(null);

  useEffect(() => {
    getEquipmentStatues()
      .then((data) => {
  setEquipmentStatues(data);
})
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);
  return { equipmentStatuses, loadingEquipmentStatuses, errorEquipmentStatuses };
}