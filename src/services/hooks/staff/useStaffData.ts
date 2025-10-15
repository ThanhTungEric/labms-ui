import { useState, useMemo, useEffect, useCallback } from "react";
import { getAllStaff, getStaffById } from "@/services/api";
import type { Staff, StaffDetail, StaffSort, StaffOrderField } from "@/services/types";
import { useDebounce } from "@/utils";

const mapSortFieldToApi = (f: StaffOrderField): StaffSort["field"] => f;

export const useStaffData = (id?: number) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sorts, setSorts] = useState<Array<{ field: StaffOrderField; dir: "asc" | "desc" }>>([]);

  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const dCode = useDebounce(searchCode, 400);
  const dName = useDebounce(searchName, 400);
  const dPhone = useDebounce(searchPhoneNumber, 400);
  const dEmail = useDebounce(searchEmail, 400);

  const [data, setData] = useState<Array<Staff | StaffDetail>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const apiSorts: StaffSort[] = useMemo(() => {
    if (!sorts.length) return [];
    return sorts.map((s) => ({ field: mapSortFieldToApi(s.field), dir: s.dir }));
  }, [sorts]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const detail = await getStaffById(id);
        setData([detail]);
        setTotal(1);
      } else {
        const { data, meta } = await getAllStaff({
          page,
          pageSize,
          searchCode: dCode || undefined,
          searchName: dName || undefined,
          searchPhoneNumber: dPhone || undefined,
          searchEmail: dEmail || undefined,
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
  }, [id, page, pageSize, dCode, dName, dPhone, dEmail, apiSorts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRequestSort = (field: StaffOrderField) => {
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

    searchCode,
    setSearchCode,
    searchName,
    setSearchName,
    searchPhoneNumber,
    setSearchPhoneNumber,
    searchEmail,
    setSearchEmail,
  };
};
