import { useEffect, useState } from 'react';
import { getEquipmentForms } from '../../api/equipmentForms/equipmentForms';
import { equipmentForms } from '../../types/equipmentForms.type';
export function useEquipmentForms() {
  const [equipmentForms, setEquipmentForms] = useState<equipmentForms[]>([]);
  const [loadingEquipmentForms, setLoading] = useState(true);
  const [errorEquipmentForms, setError] = useState<Error | null>(null);

  useEffect(() => {
    getEquipmentForms()
      .then((data) => setEquipmentForms(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  return { equipmentForms, loadingEquipmentForms, errorEquipmentForms };
}