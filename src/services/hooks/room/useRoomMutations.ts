import { useCallback, useState } from 'react';
import { createRoom, updateRoom, deleteRoom } from '../../api/room/room';
import { CreateRoomDto, UpdateRoomDto, RoomDetail } from '../../types/room.type';

export function useRoomMutations() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = useCallback(async (payload: CreateRoomDto): Promise<RoomDetail> => {
        try {
            setBusy(true); setError(null);
            return await createRoom(payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    const update = useCallback(async (id: number, payload: UpdateRoomDto): Promise<RoomDetail> => {
        try {
            setBusy(true); setError(null);
            return await updateRoom(id, payload);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    const remove = useCallback(async (id: number): Promise<void> => {
        try {
            setBusy(true); setError(null);
            await deleteRoom(id);
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally { setBusy(false); }
    }, []);

    return { create, update, remove, busy, error };
}
