import { useMemo } from 'react';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { useBuildings } from '../../../services/hooks';
import { Building } from '../../../services/types';

export type FacilityItem = {
  id: string;
  label: string;
  children?: FacilityItem[];
};

export default function useFacilityTree(): TreeViewBaseItem<FacilityItem>[] {
  const { buildings } = useBuildings();

  const treeData = useMemo<TreeViewBaseItem<FacilityItem>[]>(() => {
    if (!buildings || buildings.length === 0) return [];

    const buildingNodes: TreeViewBaseItem<FacilityItem>[] = buildings.map((b: Building) => ({
      id: b.name,
      label: b.description,
    }));

    return [
      {
        id: 'campus-vgu',
        label: 'VGU Campus',
        children: buildingNodes,
      },
    ];
  }, [buildings]);

  return treeData;
}
