import { useCallback, useState } from 'react';
import {
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getBuildingByFloorId
} from '../../api/building/building';
import {
    CreateBuildingDto,
    UpdateBuildingDto,
    BuildingListItem,
    Building
} from '../../types/building.type';

export function useBuildingMutations() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = useCallback(
        async (payload: CreateBuildingDto): Promise<BuildingListItem> => {
            try {
                setBusy(true);
                setError(null);
                return await createBuilding(payload);
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
        async (id: number, payload: UpdateBuildingDto): Promise<BuildingListItem> => {
            try {
                setBusy(true);
                setError(null);
                return await updateBuilding(id, payload);
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
                await deleteBuilding(id);
            } catch (e) {
                setError(e as Error);
                throw e;
            } finally {
                setBusy(false);
            }
        },
        []
    );

    const getByFloorId = useCallback(
        async (floorId: number): Promise<Building> => {
            try {
                setBusy(true);
                setError(null);
                return await getBuildingByFloorId(floorId);
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

    return { create, update, remove, getByFloorId, busy, error, resetError };
}
