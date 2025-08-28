import { useState, useEffect, useMemo } from 'react';
import type { EquipmentListItem, CreateEquipmentDto, UpdateEquipmentDto } from '@/services/types';
import { useEquipmentMutations } from '@/services/hooks';

type EquipmentFormState = {
    code: string;
    name: string;
    manufacturer: string;
    photo: string;
    manual: string;
    price: number | null;
    modelCode: string;
    formId: number | null;
    components: string[];
    specifications: string[];
    categoryIds: number[];
    domainIds: number[];
};

const initialFormState: EquipmentFormState = {
    code: '',
    name: '',
    manufacturer: '',
    photo: '',
    manual: '',
    price: null,
    modelCode: '',
    formId: null,
    components: [],
    specifications: [],
    categoryIds: [],
    domainIds: [],
};

const diff = <T,>(prevArr: T[], nextArr: T[]) => {
    const prev = new Set(prevArr);
    const next = new Set(nextArr);
    const added = nextArr.filter((x) => !prev.has(x as any));
    const removed = prevArr.filter((x) => !next.has(x as any));
    return { added, removed };
};

export const useEquipmentForm = (equipment?: EquipmentListItem | null) => {
    const { create, update, busy, error } = useEquipmentMutations();
    const isEditing = !!equipment;
    const [formState, setFormState] = useState<EquipmentFormState>(initialFormState);

    const originalCategoryIds = useMemo(
        () => (equipment ? equipment.categories.map((c) => c.id) : []),
        [equipment]
    );
    const originalDomainIds = useMemo(
        () => (equipment ? equipment.domains.map((d) => d.id) : []),
        [equipment]
    );
    const originalComponents = useMemo(
        () => (equipment ? equipment.components : []),
        [equipment]
    );
    const originalSpecifications = useMemo(
        () => (equipment ? equipment.specifications : []),
        [equipment]
    );

    useEffect(() => {
        if (isEditing && equipment) {
            setFormState({
                code: equipment.code,
                name: equipment.name,
                manufacturer: equipment.manufacturer,
                photo: equipment.photo,
                manual: equipment.manual,
                price: equipment.price,
                modelCode: equipment.modelCode,
                formId: equipment.form?.id || null,
                components: equipment.components,
                specifications: equipment.specifications,
                categoryIds: equipment.categories.map((c) => c.id),
                domainIds: equipment.domains.map((d) => d.id),
            });
        } else {
            setFormState(initialFormState);
        }
    }, [isEditing, equipment]);

    const handleInputChange = (field: keyof EquipmentFormState, value: any) => {
        const v = field === 'price' ? (value === '' ? null : Number(value)) : value;
        setFormState((prev) => ({ ...prev, [field]: v }));
    };

    const handleMultiSelectChange = (
        field: keyof EquipmentFormState,
        keys: string[]
    ) => {
        setFormState((prev) => ({
            ...prev,
            [field]: keys.map(Number),
        }));
    };

    const handleFormSelectChange = (keys: string[]) => {
        const selectedKey = keys.length > 0 ? Number(keys[0]) : null;
        setFormState((prev) => ({
            ...prev,
            formId: selectedKey,
        }));
    };

    const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
        try {
            if (isEditing && equipment) {
                const { added: addedCategoryIds, removed: removedCategoryIds } = diff(
                    originalCategoryIds,
                    formState.categoryIds
                );
                const { added: addedDomainIds, removed: removedDomainIds } = diff(
                    originalDomainIds,
                    formState.domainIds
                );
                const { added: addedComponents, removed: removedComponents } = diff(
                    originalComponents,
                    formState.components
                );
                const { added: addedSpecifications, removed: removedSpecifications } = diff(
                    originalSpecifications,
                    formState.specifications
                );

                const payload: UpdateEquipmentDto = {
                    code: formState.code !== equipment.code ? formState.code : undefined,
                    name: formState.name !== equipment.name ? formState.name : undefined,
                    manufacturer: formState.manufacturer !== equipment.manufacturer ? formState.manufacturer : undefined,
                    photo: formState.photo !== equipment.photo ? formState.photo : undefined,
                    manual: formState.manual !== equipment.manual ? formState.manual : undefined,
                    price: formState.price !== equipment.price ? (formState.price ?? undefined) : undefined,
                    modelCode: formState.modelCode !== equipment.modelCode ? formState.modelCode : undefined,
                    formId: formState.formId !== (equipment.form?.id || null) ? (formState.formId ?? undefined) : undefined,
                    addedCategoryIds,
                    removedCategoryIds,
                    addedDomainIds,
                    removedDomainIds,
                    addedComponents,
                    removedComponents,
                    addedSpecifications,
                    removedSpecifications,
                };

                await update(equipment.id, payload);
            } else {
                const payload: CreateEquipmentDto = {
                    ...formState,
                    price: formState.price ?? 0,
                    formId: formState.formId ?? 0,
                };
                await create(payload);
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return {
        formState,
        isEditing,
        busy,
        error,
        handleInputChange,
        handleMultiSelectChange,
        handleFormSelectChange,
        handleSubmit,
    };
};