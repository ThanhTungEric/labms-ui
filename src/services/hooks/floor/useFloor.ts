import { useEffect, useState } from 'react';
import { getAllFloors, getFloorById } from '../../api/floor/floor';
import { FloorListItem, FloorDetail } from '../../types/floor.type';

type FloorAny = FloorListItem | FloorDetail;

export function useFloors(id?: number) {
    const [floors, setFloors] = useState<FloorAny[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [version, setVersion] = useState(0); // để reload

    const reload = () => setVersion((v) => v + 1);

    useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                if (id !== undefined && id !== null) {
                    const data = await getFloorById(id);
                    if (active) setFloors([data]);
                } else {
                    const data = await getAllFloors();
                    if (active) setFloors(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (active) setError(err as Error);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [id, version]);

    return { floors, loading, error, reload };
}