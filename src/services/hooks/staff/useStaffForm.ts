import { useEffect, useMemo, useState } from "react";
import { useStaffMutations } from "./useStaffMutations";
import type { Staff, StaffFormState, StaffUpdatePayload } from "@/services/types";

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
    
    // Lưu trữ snapshot ID ban đầu để tính toán added/removed khi submit
    const initialIdSnapshot = useMemo(() => ({
        academicTitleIds: initialSnapshot.academicTitleIds,
        programIds: initialSnapshot.programIds,
        expertises: initialSnapshot.expertises,
    }), [initialSnapshot]);


    useEffect(() => {
        setForm(initialSnapshot);
    }, [initialSnapshot]);

    const change = (k: keyof StaffFormState, v: any) => setForm(s => ({ ...s, [k]: v }));

    // --- LOGIC QUẢN LÝ MẢNG CHUỖI (Dùng cho Expertises) ---
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
    
    // --- LOGIC QUẢN LÝ MẢNG ID (Dùng cho AcademicTitles và Programs) ---
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
    // ------------------------------------------------------------------

    const submit = async (onSuccess: () => void, onClose: () => void) => {
        try {
            const basePayload = {
                code: form.code,
                function: form.function,
                firstName: form.firstName,
                lastName: form.lastName,
                middleName: form.middleName,
                phoneNumber: form.phoneNumber ?? "",
                email: form.email ?? "",
                title: form.title,
            };

            if (isEditing && entity) {
                // Tính toán added/removed cho StaffUpdatePayload
                const currentAcademicTitleIds = new Set(form.academicTitleIds);
                const initialAcademicTitleIds = new Set(initialIdSnapshot.academicTitleIds);
                
                const currentProgramIds = new Set(form.programIds);
                const initialProgramIds = new Set(initialIdSnapshot.programIds);
                
                const currentExpertises = new Set(form.expertises);
                const initialExpertises = new Set(initialIdSnapshot.expertises);

                const updatePayload: StaffUpdatePayload = {
                    ...basePayload,
                    addedAcademicTitleIds: form.academicTitleIds.filter(id => !initialAcademicTitleIds.has(id)),
                    removedAcademicTitleIds: initialIdSnapshot.academicTitleIds.filter(id => !currentAcademicTitleIds.has(id)),

                    addedProgramIds: form.programIds.filter(id => !initialProgramIds.has(id)),
                    removedProgramIds: initialIdSnapshot.programIds.filter(id => !currentProgramIds.has(id)),
                    
                    addedExpertises: form.expertises.filter(e => !initialExpertises.has(e)),
                    removedExpertises: initialIdSnapshot.expertises.filter(e => !currentExpertises.has(e)),
                };

                await update(entity.id, updatePayload);
            } else {
                // Đối với tạo mới, không cần tính added/removed, chỉ cần payload cơ bản (giả định API chấp nhận)
                const createPayload = {
                    ...basePayload,
                    expertises: form.expertises,
                    academicTitleIds: form.academicTitleIds,
                    programIds: form.programIds,
                };
                await create(createPayload);
            }

            onSuccess();
            onClose();
        } catch (e) {
            // handle error
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