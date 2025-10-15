import { useEffect, useState } from 'react';
import { useLabs, useEquipmentData } from '@/services/hooks';
import { useEquipmentItemMutations } from '@/services/hooks';
import type { EquipmentItem } from '@/services/types';
import { getChangedFields } from '@/utils/getChangedFields';
import { UpdateEquipmentItemDto } from '@/services/api';

interface Option {
    key: string;
    label: string;
}

interface FormState {
    serialNumber: string;
    baseId: number | '';
    labId: number | '';
    statusId: number | '';
    purchaseDate: string;
    warrantyExpiration: string;
}

export const useEquipmentItemForm = (item?: EquipmentItem | null) => {
    const isEditing = !!item;
    const { create, update } = useEquipmentItemMutations();

    const { labs, loading: loadingLabs } = useLabs();
    const { data: equipmentData, loading: loadingEquipment } = useEquipmentData();

    const [formState, setFormState] = useState<FormState>({
        serialNumber: '',
        baseId: '',
        labId: '',
        statusId: '',
        purchaseDate: new Date().toISOString().slice(0, 10),
        warrantyExpiration: new Date().toISOString().slice(0, 10),
    });

    const [initialState, setInitialState] = useState<FormState>(formState);

    useEffect(() => {
        if (item) {
            const newState: FormState = {
                serialNumber: item.serialNumber || '',
                baseId: item.base?.id ?? '',
                labId: item.lab?.id ?? '',
                statusId: item.status?.id ?? '',
                purchaseDate: item.purchaseDate ? item.purchaseDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
                warrantyExpiration: item.warrantyExpiration ? item.warrantyExpiration.slice(0, 10) : new Date().toISOString().slice(0, 10),
            };
            setFormState(newState);
            setInitialState(newState);
        } else {
            const newState: FormState = {
                serialNumber: '',
                baseId: '',
                labId: '',
                statusId: '',
                purchaseDate: new Date().toISOString().slice(0, 10),
                warrantyExpiration: new Date().toISOString().slice(0, 10),
            };
            setFormState(newState);
            setInitialState(newState);
        }
    }, [item]);

    const baseOptions: Option[] = equipmentData?.map((b: any) => ({ key: String(b.id), label: b.name })) ?? [];
    const labOptions: Option[] = labs?.map((l: any) => ({ key: String(l.id), label: l.name })) ?? [];
    const statusOptions: Option[] = [
        { key: '1', label: 'Available' },
        { key: '2', label: 'In Use' },
        { key: '3', label: 'Under Maintenance' },
        { key: '4', label: 'Lost' },
    ];

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSelectChange = (field: keyof FormState, value: string | number) => {
        setFormState((prev) => ({ ...prev, [field]: Number(value) }));
    };

    const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
        try {
            if (isEditing && item) {
                const changedFields = getChangedFields(initialState, formState);

                if (Object.keys(changedFields).length === 0) {
                    onClose();
                    return;
                }

                const updatePayload: UpdateEquipmentItemDto = {
                    ...(changedFields.serialNumber && { serialNumber: changedFields.serialNumber }),
                    ...(changedFields.warrantyExpiration && {
                        warrantyExpiration: new Date(changedFields.warrantyExpiration).toISOString(),
                    }),
                    ...(changedFields.purchaseDate && {
                        purchaseDate: new Date(changedFields.purchaseDate).toISOString(),
                    }),
                    ...(changedFields.statusId && { status: Number(changedFields.statusId) }),
                    ...(changedFields.labId && { labId: Number(changedFields.labId) }),
                };

                await update(item.id, updatePayload);
            } else {
                await create({
                    serialNumber: formState.serialNumber,
                    warrantyExpiration: new Date(formState.warrantyExpiration).toISOString(),
                    purchaseDate: new Date(formState.purchaseDate).toISOString(),
                    status: Number(formState.statusId),
                    baseId: Number(formState.baseId),
                    labId: Number(formState.labId),
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Save error:', err);
            alert('Failed to save equipment item');
        }
    };

    return {
        formState,
        handleInputChange,
        handleSelectChange,
        handleSubmit,
        baseOptions,
        labOptions,
        statusOptions,
        loadingOptions: loadingEquipment || loadingLabs,
        busy: false,
        error: null,
        isEditing,
    };
};
