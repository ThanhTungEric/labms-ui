import { useState } from 'react';
import {
    createEquipmentItem,
    updateEquipmentItem,
    deleteEquipmentItem,
    CreateEquipmentItemDto,
    UpdateEquipmentItemDto,
} from '@/services/api';
import { EquipmentItem } from '@/services/types';

interface UseEquipmentItemMutations {
    creating: boolean;
    updating: boolean;
    removing: boolean;
    error: string | null;

    create: (dto: CreateEquipmentItemDto) => Promise<EquipmentItem | null>;
    update: (id: number, dto: UpdateEquipmentItemDto) => Promise<EquipmentItem | null>;
    remove: (id: number) => Promise<boolean>;
}

export const useEquipmentItemMutations = (): UseEquipmentItemMutations => {
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (dto: CreateEquipmentItemDto) => {
        try {
            setCreating(true);
            const item = await createEquipmentItem(dto);
            return item;
        } catch (err: any) {
            setError(err.message || 'Failed to create equipment item');
            return null;
        } finally {
            setCreating(false);
        }
    };

    const update = async (id: number, dto: UpdateEquipmentItemDto) => {
        try {
            setUpdating(true);
            const item = await updateEquipmentItem(id, dto);
            return item;
        } catch (err: any) {
            setError(err.message || 'Failed to update equipment item');
            return null;
        } finally {
            setUpdating(false);
        }
    };

    const remove = async (id: number) => {
        try {
            setRemoving(true);
            await deleteEquipmentItem(id);
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to delete equipment item');
            return false;
        } finally {
            setRemoving(false);
        }
    };

    return { creating, updating, removing, error, create, update, remove };
};
