import { useState, useMemo, useEffect, useCallback } from "react";
import {
  getAllGroupGuestParticipants,
  getGroupGuestParticipantById
} from "@/services/api";
import type {
  GroupGuestParticipant,
  GroupGuestParticipantDetail,
  GgpSort,
  GgpOrderField
} from "@/services/types";
import { useDebounce } from "@/utils";

export type UiField = GgpOrderField;

const mapSortFieldToApi = (f: UiField): GgpSort["field"] => f;

export const useGgpData = (id?: number) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sorts, setSorts] = useState<Array<{ field: UiField; dir: "asc" | "desc" }>>([]);


  const [searchName, setSearchName] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMember, setSearchMember] = useState("");


  const dName = useDebounce(searchName, 400);
  const dPhone = useDebounce(searchPhoneNumber, 400);
  const dEmail = useDebounce(searchEmail, 400);
  const dMember = useDebounce(searchMember, 400);

  const [data, setData] = useState<Array<GroupGuestParticipant | GroupGuestParticipantDetail>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const apiSorts: GgpSort[] = useMemo(() => {
    if (!sorts.length) return [];
    return sorts.map((s) => ({ field: mapSortFieldToApi(s.field), dir: s.dir }));
  }, [sorts]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const detail = await getGroupGuestParticipantById(id);
        setData([detail]);
        setTotal(1);
      } else {
        const { data, meta } = await getAllGroupGuestParticipants({
          page,
          pageSize,
          searchName: dName || undefined,
          searchPhoneNumber: dPhone || undefined,
          searchEmail: dEmail || undefined,
          searchMember: dMember || undefined,
          sorts: apiSorts,
        });
        setData(data);
        setTotal(meta?.count ?? 0);
      }
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [id, page, pageSize, dName, dPhone, dEmail, dMember, apiSorts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRequestSort = (field: UiField) => {
    const nextDir = sorts[0]?.field === field && sorts[0]?.dir === "asc" ? "desc" : "asc";
    setSorts([{ field, dir: nextDir }]);
    setPage(1);
  };

  return {
    data,
    loading,
    error,
    total,
    reload: fetchData,

    page,
    setPage,
    pageSize,
    setPageSize,

    sorts,
    onRequestSort,

    searchName,
    setSearchName,
    searchPhoneNumber,
    setSearchPhoneNumber,
    searchEmail,
    setSearchEmail,
    searchMember,
    setSearchMember,
  };
};
