import React, { useState } from 'react';
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Collapse,
  useTheme
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function FilterSection({ onSearch }: { onSearch: (filters: any) => void }) {
  const theme = useTheme();
  const [moreOpen, setMoreOpen] = useState(false);
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
    onSearch({
    search: filters.idOrName
    
  });
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
     onSearch({
    search: ''
    
  });
  };

  const smallFieldStyle = {
    height: 36,
    fontSize: 13
  };

  return (
    <Box
      p={2}
      borderRadius={2}
      boxShadow={1}
      display="flex"
      flexDirection="column"
      border="1px solid #e0e0e0"
      gap={2}
    >
      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          fullWidth
          size="small"
          label="Please enter char to search"
          value={filters.idOrName}
          onChange={(e) => handleChange('idOrName', e.target.value)}
          InputProps={{ sx: smallFieldStyle }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      

      
    </Box>
  );
}
