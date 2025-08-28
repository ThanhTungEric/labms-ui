import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import { useEquipment } from '../../../services/hooks';

import EquipmentTable, { EquipmentRow } from '../../../module/equipment/master/EquipmentTable';
import EquipmentActions from '../../../module/equipment/master/EquipmentAction';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { MoreActionItem } from '../../../components/MoreActionsMenu';
import { useDebounce } from '../../../utils';

import type { EquipmentListItem, EquipmentSort } from '../../../services/types';


type UiField = 'id' | 'code' | 'name' | 'manufacturer' | 'price' | 'modelCode';
const mapSortFieldToApi = (f: UiField): EquipmentSort['field'] => {
    switch (f) {
        case 'id':
            return 'id';
        case 'code':
            return 'code';
        case 'name':
            return 'name';
        case 'manufacturer':
            return 'manufacturer';
        case 'price':
            return 'price';
        case 'modelCode':
            return 'modelCode';
        default:
            return 'id';
    }
};


const toRow = (item: EquipmentListItem): EquipmentRow => ({
    id: item.id,
    code: item.code,
    name: item.name,
    manufacturer: item.manufacturer,
    photo: item.photo,
    manual: item.manual,
    price: item.price,
    priceCategory: item.priceCategory,
    modelCode: item.modelCode,
    components: item.components,
    specifications: item.specifications,
    form: item.form,
    categories: item.categories,
    domains: item.domains,
});

const EquipmentManagement: React.FC = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [sorts, setSorts] = useState<Array<{ field: UiField; dir: 'asc' | 'desc' }>>([]);

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [canAdd] = useState<boolean>(true);

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput, 400);
    useEffect(() => {
        setSearch(debouncedSearch);
        setPage(1);
    }, [debouncedSearch]);

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
        search: search || undefined,
        sorts: apiSorts,
    });

    const rows: EquipmentRow[] = useMemo(
        () => (equipment as EquipmentListItem[]).map(toRow),
        [equipment]
    );

    const handleMoreActionClick = (key: string) => console.log('More action clicked:', key);
    const moreActionItems: MoreActionItem[] = [];

    const handleAdd = () => {
        setSelectedItemId(null);
    };
    const handleEdit = () => {
        if (selectedItemId == null) return;
    };
    const handleDelete = () => {
        if (selectedItemId == null) return;
        setIsConfirmModalOpen(true);
    };
    const handleConfirmDelete = async () => {
        if (selectedItemId == null) return;
        setIsConfirmModalOpen(false);
        reload();
    };
    const handleExportReport = () => console.log('Exporting equipment report...');

    const orderBy = (sorts?.[0]?.field as UiField) || 'id';
    const order = (sorts?.[0]?.dir as 'asc' | 'desc') || 'asc';

    const onRequestSort = (field: UiField) => {
        if (sorts?.[0]?.field === field) {
            const nextDir = sorts[0].dir === 'asc' ? 'desc' : 'asc';
            setSorts([{ field, dir: nextDir }]);
        } else {
            setSorts([{ field, dir: 'asc' }]);
        }
        setPage(1);
    };

    const isEditing = selectedItemId != null;

    return (
        <Box>
            <EquipmentActions
                selectedItemId={selectedItemId}
                canAdd={canAdd}
                moreActionItems={moreActionItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onExportReport={handleExportReport}
                onMoreActionClick={handleMoreActionClick}
                searchValue={searchInput}
                onSearchChange={setSearchInput}
            />

            {loading ? (
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Paper>
            ) : error ? (
                <Box sx={{ color: 'error.main', mb: 2 }}>
                    Failed to load data
                </Box>
            ) : (
                <EquipmentTable
                    rows={rows}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onRequestSort}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={setPage}
                    onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
                />
            )}

            <ConfirmationModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this equipment? This action cannot be undone."
            />
        </Box>
    );
};

export default EquipmentManagement;
