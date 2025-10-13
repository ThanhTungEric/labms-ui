import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Box, TextField, InputAdornment, styled, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from "lodash.debounce";

// 🎨 Container tổng
const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
  padding: '4px 0',
}));

// 🎨 TextField đồng bộ style
const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: 220,
  '& .MuiOutlinedInput-root': {
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
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
      fontSize: 13,
      padding: '0 8px',
    },
  },
}));

const FilterSection = forwardRef(({ onSearch }: { onSearch: (filters: any) => void }, ref) => {
  const [searchValue, setSearchValue] = useState('');

  // ✅ Debounce search
  useEffect(() => {
    const handler = debounce(() => {
      onSearch({ search: searchValue });
    }, 500);
    handler();
    return handler.cancel;
  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch({ search: '' });
  };

  useImperativeHandle(ref, () => ({
    reset: handleClear,
  }));

  return (
    <StyledContainer>
      <StyledTextField
        size="small"
        placeholder="Enter text to search"
        value={searchValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledContainer>
  );
});

export default FilterSection;
