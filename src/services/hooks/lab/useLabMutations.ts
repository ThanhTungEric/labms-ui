import { useCallback, useState } from 'react';
import { createLab, updateLab, deleteLab } from '../../api/lab/lab';
import { CreateLabDto, UpdateLabDto, LabListItem } from '../../types';

export function useLabMutations() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = useCallback(
        async (payload: CreateLabDto): Promise<LabListItem> => {
            try {
                setBusy(true);
                setError(null);
                return await createLab(payload);
            } catch (e) {
                setError(e as Error);
                throw e;
            } finally {
                setBusy(false);
            }
        },
        []
    );

    const update = useCallback(
        async (id: number, payload: UpdateLabDto): Promise<LabListItem> => {
            try {
                setBusy(true);
                setError(null);
                return await updateLab(id, payload);
            } catch (e) {
                setError(e as Error);
                throw e;
            } finally {
                setBusy(false);
            }
        },
        []
    );

    const remove = useCallback(
        async (id: number): Promise<void> => {
            try {
                setBusy(true);
                setError(null);
                await deleteLab(id);
            } catch (e) {
                setError(e as Error);
                throw e;
            } finally {
                setBusy(false);
            }
        },
        []
    );

    const resetError = useCallback(() => setError(null), []);

    return { create, update, remove, busy, error, resetError };
}
