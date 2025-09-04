// FilterSection.tsx
import React, { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Box, TextField, Button, useTheme, styled, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from "lodash.debounce";
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
  const debouncedSearch = useMemo(
      () =>
        debounce((value: string) => {
          onSearch({ search: value });
        }, 500), // 500ms sau khi ngừng gõ mới gọi
      [onSearch]
    );
  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      height: '32px',
      padding: '0 8px',
      borderRadius: '8px',
      
      '& fieldset': {
        borderColor: theme.palette.grey[400],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[500],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiInputBase-input': {
        padding: '0',
      },
    },
  }));

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

  // Expose reset method to parent
  useImperativeHandle(ref, () => ({
    reset: handleReset
  }));

  return (
    <Box p={0} display="flex" gap={0} flexWrap="wrap">
      <StyledTextField
        fullWidth
        size="small"
        placeholder="Enter char to search"
        value={filters.idOrName}
        onChange={(e) => {
          const value = e.target.value;
          handleChange("idOrName", value);
          debouncedSearch(value); // chỉ gọi debounce thôi
        }}

        InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ) ,
            }}
      />
      
    </Box>
  );
});

export default FilterSection;
