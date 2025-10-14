import { useCallback, useState } from "react";
import {
  createIndividualGuestParticipant,
  updateIndividualGuestParticipant,
  deleteIndividualGuestParticipant,
  deleteIndividualGuestParticipants,
} from "@/services/api";
import type { IndividualGuestParticipantDetail } from "@/services/types";

export function useIgpMutations() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (payload: {
    firstName: string;
    lastName: string;
    middleName?: string | null;
    description?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    title?: string | null;
  }): Promise<IndividualGuestParticipantDetail> => {
    try { setBusy(true); setError(null); return await createIndividualGuestParticipant(payload); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const update = useCallback(async (id: number, payload: Partial<{
    firstName: string;
    lastName: string;
    middleName?: string | null;
    description?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    title?: string | null;
  }>): Promise<IndividualGuestParticipantDetail> => {
    try { setBusy(true); setError(null); return await updateIndividualGuestParticipant(id, payload); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const remove = useCallback(async (id: number): Promise<void> => {
    try { setBusy(true); setError(null); await deleteIndividualGuestParticipant(id); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const removeMany = useCallback(async (ids: number[]): Promise<void> => {
    try { setBusy(true); setError(null); await deleteIndividualGuestParticipants(ids); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  return { create, update, remove, removeMany, busy, error };
}
