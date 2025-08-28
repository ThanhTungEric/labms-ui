import { useCallback, useState } from 'react';
import {
    createEquipment,
    updateEquipment,
    deleteEquipment,
    deleteEquipments,
} from '../../api/equipments/equipment';
import {
    CreateEquipmentDto,
    UpdateEquipmentDto,
    EquipmentDetail,
} from '../../types';

export function useEquipmentMutations() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = useCallback(async (payload: CreateEquipmentDto): Promise<EquipmentDetail> => {
        try {
            setBusy(true); setError(null);
            return await createEquipment(payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally {
            setBusy(false);
        }
    }, []);

    const update = useCallback(async (id: number, payload: UpdateEquipmentDto): Promise<EquipmentDetail> => {
        try {
            setBusy(true); setError(null);
            return await updateEquipment(id, payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally {
            setBusy(false);
        }
    }, []);

    const remove = useCallback(async (id: number): Promise<void> => {
        try {
            setBusy(true); setError(null);
            await deleteEquipment(id);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally {
            setBusy(false);
        }
    }, []);

    const removeMany = useCallback(async (ids: number[]): Promise<void> => {
        try {
            setBusy(true); setError(null);
            await deleteEquipments(ids);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally {
            setBusy(false);
        }
    }, []);

    return { create, update, remove, removeMany, busy, error };
}
