// FilterSection.tsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';

const FilterSection = forwardRef(({ onSearch }: { onSearch: (filters: any) => void }, ref) => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    applicationType: 'all',
    idOrName: '',
    owner: '',
    status: '',
    notSubmitted: false,
    department: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch({ search: filters.idOrName });
  };

  const handleReset = () => {
    const defaultValues = {
      applicationType: 'all',
      idOrName: '',
      owner: '',
      status: '',
      notSubmitted: false,
      department: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(defaultValues);
    onSearch({ search: '' });
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset
  }));

  return (
    <Box p={2} display="flex" gap={2} flexWrap="wrap">
      <TextField
        fullWidth
        size="small"
        label="Please enter char to search"
        value={filters.idOrName}
        onChange={(e) => handleChange('idOrName', e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
});

export default FilterSection;
