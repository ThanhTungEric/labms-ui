import { useState, useEffect, useMemo } from 'react';
import type { Equipment, CreateEquipmentDto, UpdateEquipmentDto } from '@/services/types';
import { useEquipmentMutations } from '@/services/hooks';

type EquipmentFormState = {
    code: string; name: string; manufacturer: string; photo: string; manual: string;
    price: number | null; modelCode: string; formId: number | null;
    components: string[]; specifications: string[]; categoryIds: number[]; domainIds: number[];
};

const initialFormState: EquipmentFormState = {
    code: '', name: '', manufacturer: '', photo: '', manual: '',
    price: null, modelCode: '', formId: null,
    components: [], specifications: [], categoryIds: [], domainIds: [],
};

const diffNumber = (prevArr: number[], nextArr: number[]) => {
    const prevSet = new Set(prevArr), nextSet = new Set(nextArr);
    return { added: nextArr.filter(x => !prevSet.has(x)), removed: prevArr.filter(x => !nextSet.has(x)) };
};

const diffString = (prevArr: string[], nextArr: string[]) => {
    const prevSet = new Set(prevArr), nextSet = new Set(nextArr);
    return { added: nextArr.filter(x => !prevSet.has(x)), removed: prevArr.filter(x => !nextSet.has(x)) };
};

export const useEquipmentForm = (equipment?: Equipment | null) => {
    const { create, update, busy, error } = useEquipmentMutations();
    const isEditing = !!equipment;
    const [formState, setFormState] = useState<EquipmentFormState>(initialFormState);

    const originalCategoryIds = useMemo(() => equipment ? equipment.categories.map(c => c.id) : [], [equipment]);
    const originalDomainIds = useMemo(() => equipment ? equipment.domains.map(d => d.id) : [], [equipment]);
    const originalComponents = useMemo(() => equipment ? equipment.components : [], [equipment]);
    const originalSpecifications = useMemo(() => equipment ? equipment.specifications : [], [equipment]);

    useEffect(() => {
        if (isEditing && equipment) {
            setFormState({
                code: equipment.code, name: equipment.name, manufacturer: equipment.manufacturer,
                photo: equipment.photo, manual: equipment.manual, price: equipment.price,
                modelCode: equipment.modelCode, formId: equipment.form?.id || null,
                components: equipment.components || [], specifications: equipment.specifications || [],
                categoryIds: equipment.categories.map(c => c.id), domainIds: equipment.domains.map(d => d.id),
            });
        } else setFormState(initialFormState);
    }, [isEditing, equipment]);

    const handleInputChange = (field: keyof EquipmentFormState, value: any) => {
        const v = field === 'price' ? (value === '' ? null : Number(value)) : value;
        setFormState(prev => ({ ...prev, [field]: v }));
    };

    const handleMultiSelectChange = (field: keyof EquipmentFormState, keys: string[]) =>
        setFormState(prev => ({ ...prev, [field]: keys.map(Number) }));

    const handleFormSelectChange = (keys: string[]) =>
        setFormState(prev => ({ ...prev, formId: keys.length > 0 ? Number(keys[0]) : null }));

    const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
        try {
            const currentCategoryIds = formState.categoryIds.map(Number);
            const currentDomainIds = formState.domainIds.map(Number);

            if (isEditing && equipment) {
                const { added: addedCategoryIds, removed: removedCategoryIds } = diffNumber(originalCategoryIds, currentCategoryIds);
                const { added: addedDomainIds, removed: removedDomainIds } = diffNumber(originalDomainIds, currentDomainIds);
                const { added: addedComponents, removed: removedComponents } = diffString(originalComponents, formState.components);
                const { added: addedSpecifications, removed: removedSpecifications } = diffString(originalSpecifications, formState.specifications);

                const payload: UpdateEquipmentDto = {
                    code: formState.code !== equipment.code ? formState.code : undefined,
                    name: formState.name !== equipment.name ? formState.name : undefined,
                    manufacturer: formState.manufacturer !== equipment.manufacturer ? formState.manufacturer : undefined,
                    photo: formState.photo !== equipment.photo ? formState.photo : undefined,
                    manual: formState.manual !== equipment.manual ? formState.manual : undefined,
                    price: formState.price !== equipment.price ? (formState.price ?? undefined) : undefined,
                    modelCode: formState.modelCode !== equipment.modelCode ? formState.modelCode : undefined,
                    formId: formState.formId !== (equipment.form?.id || null) ? (formState.formId ?? undefined) : undefined,
                    addedComponents, removedComponents, addedSpecifications, removedSpecifications,
                    addedCategoryIds: addedCategoryIds.map(Number), removedCategoryIds: removedCategoryIds.map(Number),
                    addedDomainIds: addedDomainIds.map(Number), removedDomainIds: removedDomainIds.map(Number),
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
            onSuccess(); onClose();
        } catch (err) {
            console.error('❌ Equipment save failed:', err);
        }
    };

    return { formState, isEditing, busy, error, handleInputChange, handleMultiSelectChange, handleFormSelectChange, handleSubmit };
};
