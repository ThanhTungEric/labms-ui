import { useCallback, useState } from "react";
import {
  createGroupGuestParticipant,
  updateGroupGuestParticipant,
  deleteGroupGuestParticipant,
  deleteGroupGuestParticipants,
} from "@/services/api";
import type { GroupGuestParticipantDetail } from "@/services/types";

export function useGgpMutations() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (payload: {
    name: string;
    description?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    members?: string[];
  }): Promise<GroupGuestParticipantDetail> => {
    try { setBusy(true); setError(null); return await createGroupGuestParticipant(payload); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const update = useCallback(async (id: number, payload: {
    name?: string;
    description?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    addedMembers?: string[];
    removedMembers?: string[];
  }): Promise<GroupGuestParticipantDetail> => {
    try { setBusy(true); setError(null); return await updateGroupGuestParticipant(id, payload); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const remove = useCallback(async (id: number): Promise<void> => {
    try { setBusy(true); setError(null); await deleteGroupGuestParticipant(id); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  const removeMany = useCallback(async (ids: number[]): Promise<void> => {
    try { setBusy(true); setError(null); await deleteGroupGuestParticipants(ids); }
    catch (e) { setError(e as Error); throw e; }
    finally { setBusy(false); }
  }, []);

  return { create, update, remove, removeMany, busy, error };
}
