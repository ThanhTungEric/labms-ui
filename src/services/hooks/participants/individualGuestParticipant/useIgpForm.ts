import { useEffect, useMemo, useState } from "react";
import type { IndividualGuestParticipant } from "@/services/types";
import { useIgpMutations } from "./useIgpMutations";

const getChangedFields = <T extends Record<string, any>>(initialState: T, currentState: T): Partial<T> => {
  const changed: Partial<T> = {};
  Object.keys(currentState).forEach(k => {
    const key = k as keyof T;
    if (currentState[key] !== initialState[key]) changed[key] = currentState[key];
  });
  return changed;
};

type IgpFormState = {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  description?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  title?: string | null;
};

const initialFormState: IgpFormState = {
  firstName: "",
  lastName: "",
  middleName: "",
  description: "",
  phoneNumber: "",
  email: "",
  title: "",
};

export const useIgpForm = (entity?: IndividualGuestParticipant | null) => {
  const isEditing = !!entity;
  const { create, update, busy, error } = useIgpMutations();

  const [form, setForm] = useState<IgpFormState>(initialFormState);

  const initialSnapshot = useMemo<IgpFormState>(() => ({
    firstName: entity?.firstName ?? "",
    lastName: entity?.lastName ?? "",
    middleName: entity?.middleName ?? "",
    description: entity?.description ?? "",
    phoneNumber: entity?.phoneNumber ?? "",
    email: entity?.email ?? "",
    title: entity?.title ?? "",
  }), [entity]);

  useEffect(() => { setForm(initialSnapshot); }, [initialSnapshot]);

  const change = (k: keyof IgpFormState, v: any) => setForm(s => ({ ...s, [k]: v }));

  const submit = async (onSuccess: () => void, onClose: () => void) => {
    try {
      if (isEditing && entity) {
        const changed = getChangedFields(initialSnapshot, form);
        await update(entity.id, changed);
      } else {
        await create(form);
      }
      onSuccess(); onClose();
    } catch (e) { /* đã handle trong mutation */ }
  };

  return { form, setForm, change, submit, busy, error, isEditing };
};
