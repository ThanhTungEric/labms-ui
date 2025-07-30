import { TreeViewBaseItem } from '@mui/x-tree-view/models';

export type FacilityItem = {
  id: string;
  label: string;
  children?: FacilityItem[];
};

export const FACILITIES_DATA: TreeViewBaseItem<FacilityItem>[] = [
  {
    id: 'campus-vgu',
    label: 'VGU Campus',
    children: [
      {
        id: 'building-1',
        label: 'Building 1',
        children: [
          {
            id: 'floor-1-1',
            label: 'Floor 1',
            children: [
              { id: 'room-1-1-1', label: 'Room 101' },
              { id: 'room-1-1-2', label: 'Room 102' },
            ],
          },
          {
            id: 'floor-1-2',
            label: 'Floor 2',
            children: [
              { id: 'room-1-2-1', label: 'Room 201' },
              { id: 'room-1-2-2', label: 'Room 202' },
            ],
          },
        ],
      },
      {
        id: 'building-2',
        label: 'Building 2',
        children: [
          {
            id: 'floor-2-1',
            label: 'Floor 1',
            children: [
              { id: 'room-2-1-1', label: 'Room 101' },
              { id: 'room-2-1-2', label: 'Room 102' },
            ],
          },
        ],
      },
      { id: 'building-3', label: 'Building 3' },
      { id: 'building-4', label: 'Building 4' },
      { id: 'building-5', label: 'Building 5' },
      { id: 'building-6', label: 'Building 6' },
      { id: 'building-7', label: 'Building 7' },
    ],
  },
];