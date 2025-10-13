import { useEffect, useState, useCallback, useRef } from 'react';
import {
    getEquipmentItems,
    EquipmentItemsMeta,
    EquipmentItemsQuery,
} from '@/services/api';
import { EquipmentItem } from '@/services/types';
import { useDebounce } from '@/utils';

export interface SortOption {
    field: keyof EquipmentItem | string;
    dir: 'asc' | 'desc';
}

interface UseEquipmentItemsResult {
    data: EquipmentItem[];
    meta: EquipmentItemsMeta;
    loading: boolean;
    error: string | null;
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    searchInput: string;
    setSearchInput: (value: string) => void;
    sorts: SortOption[];
    onRequestSort: (field: SortOption['field']) => void;
    reload: () => Promise<void>;
}

export const useEquipmentItems = (
    initialParams: EquipmentItemsQuery = {},
    enabled: boolean = true
): UseEquipmentItemsResult => {
    const [data, setData] = useState<EquipmentItem[]>([]);
    const [meta, setMeta] = useState<EquipmentItemsMeta>({ count: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [sorts, setSorts] = useState<SortOption[]>([]);

    const debouncedSearchInput = useDebounce(searchInput, 400);

    const stableParams = useRef(initialParams);

    const fetchData = useCallback(async () => {
        if (!enabled) return;
        try {
            setLoading(true);
            setError(null);

            const params: EquipmentItemsQuery = {
                ...stableParams.current,
                skip: (page - 1) * pageSize,
                take: pageSize,
                searchSerialNumber: debouncedSearchInput || undefined,
                sorts,
            };

            const response = await getEquipmentItems(params);
            setData(response.data);
            setMeta(response.meta);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch equipment items');
        } finally {
            setLoading(false);
        }
    }, [enabled, page, pageSize, debouncedSearchInput, JSON.stringify(sorts)]);

    const onRequestSort = (field: SortOption['field']) => {
        setSorts((prev) => {
            const existing = prev.find((s) => s.field === field);
            if (existing) {
                const newDir = existing.dir === 'asc' ? 'desc' : 'asc';
                return [{ field, dir: newDir }];
            }
            return [{ field, dir: 'asc' }];
        });
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize, debouncedSearchInput, sorts]);

    const reload = async () => {
        await fetchData();
    };

    return {
        data,
        meta,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        searchInput,
        setSearchInput,
        sorts,
        onRequestSort,
        reload,
    };
};
