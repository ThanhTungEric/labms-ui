import { useEffect, useState } from 'react';
import { getAllRooms } from '../../api/room/room';
import { RoomListItem, RoomsListResponse } from '../../types/room.type';

export function useRooms() {
    const [rooms, setRooms] = useState<RoomListItem[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [version, setVersion] = useState(0);

    const reload = () => setVersion((v) => v + 1);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res: RoomsListResponse = await getAllRooms();
                if (!active) return;

                setRooms(res?.data ?? []);
                setCount(res?.meta?.count ?? (res?.data?.length ?? 0));
            } catch (e) {
                if (!active) return;
                setError(e as Error);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, [version]);

    return { rooms, count, loading, error, reload };
}