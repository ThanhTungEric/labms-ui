import { useEffect, useState, useCallback } from 'react';
import { getAllLabStatuses, getLabStatusById } from '../../api/lab/lab-status';
import { LabStatusDto } from '../../types';

export function useLabStatuses(id?: number) {
    const [statuses, setStatuses] = useState<LabStatusDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchStatuses = useCallback(async () => {
        setLoading(true);
        try {
            if (id) {
                const data = await getLabStatusById(id);
                setStatuses([data]);
            } else {
                const { data } = await getAllLabStatuses();
                setStatuses(data);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    return { statuses, loading, error, reload: fetchStatuses };
}
