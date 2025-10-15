import { useState, useMemo, useEffect, useCallback } from 'react';
import { getAllEquipment, getEquipmentById } from '../../api/equipments/equipment';
import { Equipment, EquipmentDetail, EquipmentSort } from '../../types';
import { useDebounce } from '@/utils';

type UiField = 'id' | 'code' | 'name' | 'manufacturer' | 'price' | 'modelCode';

const mapSortFieldToApi = (f: UiField): EquipmentSort['field'] => {
    switch (f) {
        case 'id': return 'id';
        case 'code': return 'code';
        case 'name': return 'name';
        case 'manufacturer': return 'manufacturer';
        case 'price': return 'price';
        case 'modelCode': return 'modelCode';
        default: return 'id';
    }
};

export const useEquipmentData = (id?: number) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sorts, setSorts] = useState<Array<{ field: UiField; dir: 'asc' | 'desc' }>>([]);
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 400);

    const [equipment, setEquipment] = useState<Equipment[] | EquipmentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState(0);

    const apiSorts: EquipmentSort[] = useMemo(() => {
        if (!sorts.length) return [];
        return sorts.map(s => ({ field: mapSortFieldToApi(s.field), dir: s.dir }));
    }, [sorts]);

    const fetchEquipment = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (id) {
                const data = await getEquipmentById(id);
                setEquipment([data]);
                setTotal(1);
            } else {
                const { data, meta } = await getAllEquipment({
                    page,
                    pageSize,
                    search: debouncedSearch || undefined,
                    sorts: apiSorts,
                });
                setEquipment(data);
                setTotal(meta?.count ?? 0);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [
        id,
        page,
        pageSize,
        debouncedSearch,
        apiSorts,
    ]);

    useEffect(() => {
        fetchEquipment();
    }, [fetchEquipment]);

    const onRequestSort = (field: UiField) => {
        const nextDir = (sorts[0]?.field === field && sorts[0]?.dir === 'asc') ? 'desc' : 'asc';
        setSorts([{ field, dir: nextDir }]);
        setPage(1);
    };

    const setSearchEquipment = (searchTerm: string) => {
        setSearchInput(searchTerm);
    };

    return {
        data: equipment,
        loading,
        error,
        total,
        reload: fetchEquipment,
        page,
        setPage,
        pageSize,
        setPageSize,
        searchInput,
        setSearchEquipment,
        sorts,
        onRequestSort,
    };
};
