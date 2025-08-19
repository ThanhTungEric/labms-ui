import { useEffect, useState, useCallback } from 'react';
import { getAllLabs, getLabById } from '../../api/lab/lab';
import { LabListItem, LabDetail } from '../../types';

export function useLabs(id?: number) {
    const [labs, setLabs] = useState<LabListItem[] | LabDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchLabs = useCallback(async () => {
        setLoading(true);
        try {
            if (id) {
                const data = await getLabById(id);
                setLabs([data]);
            } else {
                const { data } = await getAllLabs();
                setLabs(data);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchLabs();
    }, [fetchLabs]);

    return { labs, loading, error, reload: fetchLabs };
}
