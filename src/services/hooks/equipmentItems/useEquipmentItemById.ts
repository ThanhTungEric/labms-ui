import { useEffect, useState } from 'react';
import { getEquipmentItemById } from '@/services/api';
import { EquipmentItem } from '@/services/types';

interface UseEquipmentItemByIdResult {
    data: EquipmentItem | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useEquipmentItemById = (id?: number, enabled = true): UseEquipmentItemByIdResult => {
    const [data, setData] = useState<EquipmentItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!enabled || !id) return;
        try {
            setLoading(true);
            setError(null);
            const item = await getEquipmentItemById(id);
            setData(item);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch equipment item');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, enabled]);

    return { data, loading, error, refetch: fetchData };
};
