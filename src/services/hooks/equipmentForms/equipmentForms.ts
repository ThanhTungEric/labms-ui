import { useEffect, useState } from 'react';
import { getEquipmentForms, getEquipmentFormsWithData } from '../../api/equipmentForms/equipmentForms';
import { equipmentFormItems, equipmentForms } from '../../types/equipmentForms.type';

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

export function useEquipmentFormsData(params: Record<string, any>) {
  const [formsData, setFormsData] = useState<equipmentFormItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    getEquipmentFormsWithData(params)
      .then((data) => {
        if (isMounted) {
          setFormsData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]);

  return { formsData, loading, error };
}