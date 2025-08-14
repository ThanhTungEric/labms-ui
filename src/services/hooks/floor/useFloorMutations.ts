import { useCallback, useState } from 'react';
import { createFloor, updateFloor, deleteFloor } from '../../api/floor/floor';
import { CreateFloorDto, UpdateFloorDto, FloorDetail } from '../../types/floor.type';

export function useFloorMutations() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = useCallback(async (payload: CreateFloorDto): Promise<FloorDetail> => {
        try {
            setBusy(true); setError(null);
            return await createFloor(payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    const update = useCallback(async (id: number, payload: UpdateFloorDto): Promise<FloorDetail> => {
        try {
            setBusy(true); setError(null);
            return await updateFloor(id, payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    const remove = useCallback(async (id: number): Promise<void> => {
        try {
            setBusy(true); setError(null);
            await deleteFloor(id);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    return { create, update, remove, busy, error };
}