import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view';
import useFacilityTree from './facilitiesData';
import { CircularProgress, Typography } from '@mui/material';

export default function FacilitiesTreeView() {
  const { items, loading, error } = useFacilityTree();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Error: {error.message}
      </Typography>
    );
  }

  if (!items.length) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        No facilities to display.
      </Typography>
    );
  }

  return (
    <Box sx={{ minHeight: 352, minWidth: 260, flexGrow: 1 }}>
      <RichTreeView
        items={items}
        defaultExpandedItems={['campus-vgu']}
        getItemLabel={(item) => item.label}
        key={`tree-${items.length}`}
      />
    </Box>
  );
}
