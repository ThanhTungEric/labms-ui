import { useEffect, useMemo, useState } from "react";
import type { GroupGuestParticipant } from "@/services/types";
import { useGgpMutations } from "./useGgpMutations";

export const getChangedFields = <T extends Record<string, any>>(initialState: T, currentState: T): Partial<T> => {
  const changedFields: Partial<T> = {};
  Object.keys(currentState).forEach((key) => {
    const k = key as keyof T;
    if (currentState[k] !== initialState[k]) changedFields[k] = currentState[k];
  });
  return changedFields;
};

type GgpFormState = {
  name: string;
  description?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  members: string[];
};

const initialFormState: GgpFormState = {
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
  members: [],
};

const diffString = (prevArr: string[], nextArr: string[]) => {
  const prevSet = new Set(prevArr), nextSet = new Set(nextArr);
  return {
    added: nextArr.filter(x => !prevSet.has(x)),
    removed: prevArr.filter(x => !nextSet.has(x)),
  };
};

export const useGgpForm = (entity?: GroupGuestParticipant | null) => {
  const isEditing = !!entity;
  const { create, update, busy, error } = useGgpMutations();

  const [form, setForm] = useState<GgpFormState>(initialFormState);

  const origMembers = useMemo(() => entity?.members ?? [], [entity]);
  const initialSnapshot = useMemo<GgpFormState>(() => ({
    name: entity?.name ?? "",
    description: entity?.description ?? "",
    phoneNumber: entity?.phoneNumber ?? "",
    email: entity?.email ?? "",
    members: [...origMembers],
  }), [entity, origMembers]);

  useEffect(() => {
    setForm(initialSnapshot);
  }, [initialSnapshot]);

  const change = (k: keyof GgpFormState, v: any) => setForm(s => ({ ...s, [k]: v }));

  const submit = async (onSuccess: () => void, onClose: () => void) => {
    try {
      if (isEditing && entity) {
        const fieldChanges = getChangedFields(
          { ...initialSnapshot, members: undefined },
          { ...form, members: undefined }
        ) as Partial<Omit<GgpFormState, "members">>;

        const { added, removed } = diffString(origMembers, form.members);

        await update(entity.id, {
          ...fieldChanges,
          addedMembers: added.length ? added : undefined,
          removedMembers: removed.length ? removed : undefined,
        });
      } else {
        await create({
          name: form.name,
          description: form.description || undefined,
          phoneNumber: form.phoneNumber || undefined,
          email: form.email || undefined,
          members: form.members || [],
        });
      }
      onSuccess(); onClose();
    } catch (e) {
      // đã log ở mutation
    }
  };

  return { form, setForm, change, submit, busy, error, isEditing };
};
