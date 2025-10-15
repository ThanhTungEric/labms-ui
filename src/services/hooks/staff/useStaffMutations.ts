import { useCallback, useState } from "react";
import {
  createStaff,
  updateStaff,
  deleteStaff,
  deleteStaffs,
} from "@/services/api";
import type { StaffDetail } from "@/services/types";

export function useStaffMutations() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (payload: {
    code: string;
    function: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    title: string;
    expertises: string[];
    academicTitleIds: number[];
    programIds: number[];
  }): Promise<StaffDetail> => {
    try {
      setBusy(true);
      setError(null);
      return await createStaff(payload);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  const update = useCallback(async (id: number, payload: {
    code?: string;
    function?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    title?: string;
    addedExpertises?: string[];
    removedExpertises?: string[];
    addedAcademicTitleIds?: number[];
    removedAcademicTitleIds?: number[];
    addedProgramIds?: number[];
    removedProgramIds?: number[];
  }): Promise<StaffDetail> => {
    try {
      setBusy(true);
      setError(null);
      return await updateStaff(id, payload);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  const remove = useCallback(async (id: number): Promise<void> => {
    try {
      setBusy(true);
      setError(null);
      await deleteStaff(id);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  const removeMany = useCallback(async (ids: number[]): Promise<void> => {
    try {
      setBusy(true);
      setError(null);
      await deleteStaffs(ids);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  return { create, update, remove, removeMany, busy, error };
}
