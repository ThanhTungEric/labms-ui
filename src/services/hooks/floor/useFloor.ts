import { useEffect, useState, useCallback } from 'react';
import { getAllFloors, getFloorById } from '../../api/floor/floor';
import { FloorListItem, FloorDetail } from '../../types';

type FloorAny = FloorListItem | FloorDetail;



type UseFloorsOpts = {
    id: number;
    level: string;
    description: string;
};

export function useFloors(id?: number, initial?: UseFloorsOpts) {
    const [floors, setFloors] = useState<FloorAny[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFloors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (initial?.id) {
                const data = await getFloorById(initial.id);
                setFloors([data]);
            } else {
                const data = await getAllFloors();
                setFloors(data);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [initial?.id]);

    useEffect(() => {
        fetchFloors();
    }, [fetchFloors]);

    return {
        floors,
        loading,
        error,
        reload: fetchFloors,
    };
}