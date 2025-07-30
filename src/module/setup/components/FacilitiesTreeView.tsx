// FacilitiesTreeView.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { FACILITIES_DATA, FacilityItem } from './facilitiesData';

export default function FacilitiesTreeView() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 260, flexGrow: 1 }}>
      <RichTreeView
        items={FACILITIES_DATA as readonly FacilityItem[]}
        defaultExpandedItems={['campus-vgu', 'building-1', 'floor-1-1']}
      />
    </Box>
  );
}