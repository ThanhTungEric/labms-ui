// services/hooks/useRooms.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllRooms, RoomsSort } from '../../api/room/room';
import { RoomListItem } from '../../types/room.type';

export type UseRoomsOptions = {
    skip?: number;
    take?: number;
    search?: string;
    sorts?: RoomsSort[];
    debounceMs?: number;
    enabled?: boolean;
};

export function useRooms(opts: UseRoomsOptions = {}) {
    const {
        skip: skip0 = 0,
        take: take0 = 30,
        search: search0 = '',
        sorts: sorts0,
        debounceMs = 300,
        enabled = true,
    } = opts;

    const [rooms, setRooms] = useState<RoomListItem[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const [skip, setSkip] = useState<number>(skip0);
    const [take, setTake] = useState<number>(take0);
    const [search, setSearch] = useState<string>(search0);
    const [sorts, setSorts] = useState<RoomsSort[] | undefined>(sorts0);

    // reload thủ công
    const [version, setVersion] = useState(0);
    const reload = () => setVersion(v => v + 1);

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            setDebouncedSearch(search);
        }, debounceMs);

        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, [search, debounceMs]);

    useEffect(() => {
        if (!enabled) return;

        let active = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getAllRooms({
                    skip,
                    take,
                    search: debouncedSearch || undefined,
                    sorts: sorts && sorts.length ? sorts : undefined,
                });

                if (!active) return;
                setRooms(res?.data ?? []);
                setCount(res?.meta?.count ?? (res?.data?.length ?? 0));
            } catch (e) {
                if (!active) return;
                setError(e as Error);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, [skip, take, debouncedSearch, JSON.stringify(sorts), version, enabled]);

    const hasPrev = useMemo(() => skip > 0, [skip]);
    const hasNext = useMemo(() => skip + take < count, [skip, take, count]);
    const nextPage = () => hasNext && setSkip(s => s + take);
    const prevPage = () => hasPrev && setSkip(s => Math.max(0, s - take));
    const setPage = (pageIndex: number) => setSkip(Math.max(0, pageIndex * take));

    return {
        rooms,
        count,
        loading,
        error,

        skip, setSkip,
        take, setTake,
        search, setSearch,
        sorts, setSorts,

        hasPrev, hasNext, prevPage, nextPage, setPage,

        reload,
    };
}
