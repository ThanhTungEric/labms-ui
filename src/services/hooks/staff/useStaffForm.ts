import { useEffect, useMemo, useState } from "react";
import { useStaffMutations } from "./useStaffMutations";
import type { Staff, StaffFormState, StaffUpdatePayload } from "@/services/types";
import { getChangedFields } from "@/utils";

export const useStaffForm = (entity?: Staff | null) => {
    const isEditing = !!entity;
    const { create, update, busy, error } = useStaffMutations();

    const [form, setForm] = useState<StaffFormState>({
        code: "",
        function: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phoneNumber: undefined,
        email: undefined,
        title: "",
        expertises: [],
        academicTitleIds: [],
        programIds: [],
    });

    const initialSnapshot = useMemo(() => ({
        code: entity?.code ?? "",
        function: entity?.function ?? "",
        firstName: entity?.firstName ?? "",
        lastName: entity?.lastName ?? "",
        middleName: entity?.middleName ?? "",
        phoneNumber: entity?.phoneNumber || undefined,
        email: entity?.email || undefined,
        title: entity?.title ?? "",
        expertises: entity?.expertises ?? [],
        academicTitleIds: entity?.academicTitles?.map((at) => at.id) ?? [],
        programIds: entity?.programs?.map((p) => p.id) ?? [],
    }), [entity]);

    const initialIdSnapshot = useMemo(() => ({
        academicTitleIds: initialSnapshot.academicTitleIds,
        programIds: initialSnapshot.programIds,
        expertises: initialSnapshot.expertises,
    }), [initialSnapshot]);

    useEffect(() => {
        setForm(initialSnapshot);
    }, [initialSnapshot]);

    const change = (k: keyof StaffFormState, v: any) => setForm(s => ({ ...s, [k]: v }));

    const addStringItems = (key: 'expertises', raw: string) => {
        const parts = raw
            .split(/[,;\n]/)
            .map((x) => x.trim())
            .filter(Boolean);

        if (!parts.length) return;

        const current = form[key] as string[];
        const existing = new Set(current.map((m) => m.trim().toLowerCase()));
        const next = [...current];

        for (const p of parts) {
            const lowerP = p.toLowerCase();
            if (!existing.has(lowerP)) {
                existing.add(lowerP);
                next.push(p);
            }
        }
        change(key, next);
    };

    const removeStringItem = (key: 'expertises', item: string) => {
        const next = (form[key] as string[]).filter((x) => x !== item);
        change(key, next);
    };

    const addIdItem = (key: 'academicTitleIds' | 'programIds', id: number) => {
        const current = form[key] as number[];
        if (!current.includes(id)) {
            change(key, [...current, id]);
        }
    };

    const removeIdItem = (key: 'academicTitleIds' | 'programIds', id: number) => {
        const next = (form[key] as number[]).filter((x) => x !== id);
        change(key, next);
    };

    const submit = async (onSuccess: () => void, onClose: () => void) => {
        try {
            const changedFields = getChangedFields(initialSnapshot, form);

            const currentExpertises = new Set(form.expertises);
            const initialExpertises = new Set(initialSnapshot.expertises);

            const currentAcademicTitleIds = new Set(form.academicTitleIds);
            const initialAcademicTitleIds = new Set(initialSnapshot.academicTitleIds);

            const currentProgramIds = new Set(form.programIds);
            const initialProgramIds = new Set(initialSnapshot.programIds);

            const updatePayload: StaffUpdatePayload = {};

            Object.assign(updatePayload, changedFields);

            const addedExpertises = form.expertises.filter(e => !initialExpertises.has(e));
            if (addedExpertises.length > 0) {
                updatePayload.addedExpertises = addedExpertises;
            }
            const removedExpertises = initialSnapshot.expertises.filter(e => !currentExpertises.has(e));
            if (removedExpertises.length > 0) {
                updatePayload.removedExpertises = removedExpertises;
            }

            const addedAcademicTitleIds = form.academicTitleIds.filter(id => !initialAcademicTitleIds.has(id));
            if (addedAcademicTitleIds.length > 0) {
                updatePayload.addedAcademicTitleIds = addedAcademicTitleIds;
            }
            const removedAcademicTitleIds = initialSnapshot.academicTitleIds.filter(id => !currentAcademicTitleIds.has(id));
            if (removedAcademicTitleIds.length > 0) {
                updatePayload.removedAcademicTitleIds = removedAcademicTitleIds;
            }

            const addedProgramIds = form.programIds.filter(id => !initialProgramIds.has(id));
            if (addedProgramIds.length > 0) {
                updatePayload.addedProgramIds = addedProgramIds;
            }
            const removedProgramIds = initialSnapshot.programIds.filter(id => !currentProgramIds.has(id));
            if (removedProgramIds.length > 0) {
                updatePayload.removedProgramIds = removedProgramIds;
            }

            if (isEditing && entity) {
                if (Object.keys(updatePayload).length > 0) {
                    await update(entity.id, updatePayload);
                }
            } else {
                const createPayload = {
                    code: form.code,
                    function: form.function,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    middleName: form.middleName,
                    phoneNumber: form.phoneNumber ?? "",
                    email: form.email ?? "",
                    title: form.title,
                    expertises: form.expertises,
                    academicTitleIds: form.academicTitleIds,
                    programIds: form.programIds,
                };
                await create(createPayload);
            }

            onSuccess();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        form,
        setForm,
        change,
        submit,
        busy,
        error,
        isEditing,
        addStringItems,
        removeStringItem,
        addIdItem,
        removeIdItem,
    };
};