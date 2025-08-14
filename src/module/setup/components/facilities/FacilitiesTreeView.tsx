import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view';
import useFacilityTree from '../../data/facilitiesData';
import { CircularProgress, Typography } from '@mui/material';

type FacilitiesTreeViewProps = {
  onSelect: (itemId: string | null) => void;
};

export default function FacilitiesTreeView({ onSelect }: FacilitiesTreeViewProps) {
  const { items, loading, error } = useFacilityTree();

  const handleItemSelectionToggle = useCallback((event: React.SyntheticEvent | null, itemId: string, isSelected: boolean) => {
    onSelect(isSelected ? itemId : null);
  }, [onSelect]);

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
        onItemSelectionToggle={handleItemSelectionToggle}
        disableSelection={false}
        multiSelect={false}
      />
    </Box>
  );
}