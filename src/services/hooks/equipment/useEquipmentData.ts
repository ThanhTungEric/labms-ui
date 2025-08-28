import { useState, useMemo } from 'react';
import { useEquipment } from './useEquipment';
import { useDebounce } from '@/utils';
import type { EquipmentSort } from '../../types';

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

export const useEquipmentData = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sorts, setSorts] = useState<Array<{ field: UiField; dir: 'asc' | 'desc' }>>([]);
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 400);

    const apiSorts: EquipmentSort[] = useMemo(() => {
        if (!sorts.length) return [];
        return sorts.map(s => ({ field: mapSortFieldToApi(s.field), dir: s.dir }));
    }, [sorts]);

    const {
        equipment,
        loading,
        error,
        total,
        reload,
    } = useEquipment(undefined, {
        page,
        pageSize,
        search: debouncedSearch || undefined,
        sorts: apiSorts,
    });

    const onRequestSort = (field: UiField) => {
        const nextDir = (sorts[0]?.field === field && sorts[0]?.dir === 'asc') ? 'desc' : 'asc';
        setSorts([{ field, dir: nextDir }]);
        setPage(1);
    };

    return {
        data: equipment,
        loading,
        error,
        total,
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