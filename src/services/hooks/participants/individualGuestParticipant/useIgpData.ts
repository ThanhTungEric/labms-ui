import { useState, useMemo, useEffect, useCallback } from "react";
import { getAllIndividualGuestParticipants, getIndividualGuestParticipantById } from "@/services/api";
import { useDebounce } from "@/utils";
import type { IndividualGuestParticipant, IgpSort, IgpOrderField } from "@/services/types";

type UiField = IgpOrderField;

const mapSortFieldToApi = (f: UiField): IgpOrderField => f;

export const useIgpData = (id?: number) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorts, setSorts] = useState<Array<{ field: UiField; dir: "asc" | "desc" }>>([]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  const [data, setData] = useState<IndividualGuestParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const apiSorts: IgpSort[] = useMemo(() => {
    if (!sorts.length) return [];
    return sorts.map((s) => ({ field: mapSortFieldToApi(s.field), dir: s.dir }));
  }, [sorts]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const detail = await getIndividualGuestParticipantById(id);
        setData([detail]);
        setTotal(1);
      } else {
        const { data, meta } = await getAllIndividualGuestParticipants({
          page,
          pageSize,
          searchName: debouncedSearch || undefined,
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
  }, [id, page, pageSize, debouncedSearch, apiSorts]);

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
    searchInput,
    setSearchInput,
  };
};
