// src/pages/Facilities/useFacilityTree.ts
import { useEffect, useMemo, useState } from 'react';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { Building, Floor, Room } from '../../../services/types';
import { getBuildingById } from '../../../services/api/building/building';
import { useBuildings } from '../../../services/hooks';

export type FacilityItem = {
  id: string;
  label: string;
  children?: FacilityItem[];
};

type TreeItem = TreeViewBaseItem<FacilityItem>;

export default function useFacilityTree(): {
  items: TreeItem[];
  loading: boolean;
  error: Error | null;
} {
  const { buildings, loading: listLoading, error: listError } = useBuildings();

  const [items, setItems] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (listError) throw listError;
        if (listLoading) return;

        const list = Array.isArray(buildings) ? buildings : [];
        if (list.length === 0) {
          if (active) setItems([]);
          return;
        }

        const detailedBuildings: (Building | null)[] = await Promise.all(
          list.map(async (b) => {
            try {
              const detail = await getBuildingById(b.id);
              return detail ?? null;
            } catch (e) {
              return null;
            }
          })
        );

        const buildingNodes: TreeItem[] = detailedBuildings
          .filter((b): b is Building => Boolean(b))
          .map((b) => {
            const bId = `b-${b.id}`;
            const floors: Floor[] = Array.isArray(b.floors) ? b.floors : [];

            const floorNodes: TreeItem[] = floors.map((f) => {
              const fId = `f-${f.id}`;
              const rooms: Room[] = Array.isArray(f.rooms) ? f.rooms : [];

              const roomNodes: TreeItem[] = rooms.map((r) => ({
                id: `r-${r.id}`,
                label: r.name ?? String(r.id),
              }));

              return {
                id: fId,
                label: String(f.level ?? f.id),
                children: roomNodes.length ? roomNodes : undefined,
              };
            });

            return {
              id: bId,
              label: b.description || b.code || String(b.id),
              children: floorNodes.length ? floorNodes : undefined,
            };
          });

        const tree: TreeItem[] = [
          {
            id: 'campus-vgu',
            label: 'VGU Campus',
            children: buildingNodes,
          },
        ];

        if (active) setItems(tree);
      } catch (err) {
        if (active) setError(err as Error);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [buildings, listLoading, listError]);

  const stableItems = useMemo(() => items, [items]);

  return { items: stableItems, loading, error };
}
