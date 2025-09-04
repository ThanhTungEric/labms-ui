import { useEffect, useState, useCallback } from 'react';
import { getAllEquipment, getEquipmentById } from '../../api/equipments/equipment';
import {
    EquipmentListItem,
    EquipmentDetail,
    EquipmentQuery,
    EquipmentSort,
} from '../../types';

type UseEquipmentOpts = EquipmentQuery & {
    page?: number;
    pageSize?: number;
};

export function useEquipment(id?: number, initial?: UseEquipmentOpts) {
    const [equipment, setEquipment] = useState<EquipmentListItem[] | EquipmentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [page, setPage] = useState(initial?.page ?? 1);
    const [pageSize, setPageSize] = useState(initial?.pageSize ?? 10);
    const [total, setTotal] = useState(0);

    // ---- Filters theo Equipment (master) ----
    const [search, setSearch] = useState(initial?.search ?? '');
    const [formId, setFormId] = useState<number | undefined>(initial?.formId);
    const [categoryIds, setCategoryIds] = useState<number[]>(initial?.categoryIds ?? []);
    const [domainIds, setDomainIds] = useState<number[]>(initial?.domainIds ?? []);
    const [manufacturer, setManufacturer] = useState(initial?.manufacturer ?? '');
    const [ids, setIds] = useState<number[]>(initial?.ids ?? []);
    const [sorts, setSorts] = useState<EquipmentSort[]>(initial?.sorts ?? []);

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
                    search,
                    formId,
                    categoryIds,
                    domainIds,
                    manufacturer,
                    ids,
                    sorts,
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
        search,
        formId,
        categoryIds,
        domainIds,
        manufacturer,
        ids,
        sorts,
    ]);

    useEffect(() => {
        fetchEquipment();
    }, [fetchEquipment]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
        equipment,
        loading,
        error,
        reload: fetchEquipment,

        // pagination
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
        totalPages,

        // filters
        search,
        setSearch,
        formId,
        setFormId,
        categoryIds,
        setCategoryIds,
        domainIds,
        setDomainIds,
        manufacturer,
        setManufacturer,
        ids,
        setIds,

        // sorts
        sorts,
        setSorts,
    };
}
