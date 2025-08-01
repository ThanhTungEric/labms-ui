import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view';
import useFacilityTree from './facilitiesData'

export default function FacilitiesTreeView() {
  const treeItems = useFacilityTree();

  return (
    <Box sx={{ minHeight: 352, minWidth: 260, flexGrow: 1 }}>
      <RichTreeView
        items={treeItems}
        defaultExpandedItems={['campus-vgu']}
        getItemLabel={(item) => item.label}
      />
    </Box>
  );
}
