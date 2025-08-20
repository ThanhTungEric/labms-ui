import { useEffect, useState, useCallback } from 'react';
import { getAllLabs, getLabById } from '../../api/lab/lab';
import { LabListItem, LabDetail } from '../../types';

type UseLabsOpts = {
    page?: number;
    pageSize?: number;
    search?: string;
    sorts?: Array<{ field: 'id' | 'name' | 'area' | 'layout' | 'condition'; dir: 'asc' | 'desc' }>;
};

export function useLabs(id?: number, initial?: UseLabsOpts) {
    const [labs, setLabs] = useState<LabListItem[] | LabDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [page, setPage] = useState(initial?.page ?? 1);
    const [pageSize, setPageSize] = useState(initial?.pageSize ?? 10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState(initial?.search ?? '');
    const [sorts, setSorts] = useState(initial?.sorts ?? []);

    const fetchLabs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (id) {
                const data = await getLabById(id);
                setLabs([data]);
                setTotal(1);
            } else {
                const { data, meta } = await getAllLabs({ page, pageSize, search, sorts });
                setLabs(data);
                setTotal(meta?.count ?? 0);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id, page, pageSize, search, sorts]);

    useEffect(() => {
        fetchLabs();
    }, [fetchLabs]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
        labs,
        loading,
        error,
        reload: fetchLabs,
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
        totalPages,
        search,
        setSearch,
        sorts,
        setSorts,
    };
}
