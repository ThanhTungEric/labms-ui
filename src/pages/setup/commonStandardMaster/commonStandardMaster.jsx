import * as React from 'react';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

// Dropdown data
const csmCategory = [
  { value: 'equipment', label: 'Equipment' },
  { value: 'program', label: 'Program' },
  { value: 'priceCategory', label: 'Price Category' },
  { value: 'equipmentStatus', label: 'Equipment Status' },
  { value: 'equipmentItem', label: 'Equipment Item' },
  { value: 'functionCategory', label: 'Function Category' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'academicTitle', label: 'Academic Title' }
];

// Sắp xếp ASC theo label
const sortedCsmCategory = [...csmCategory].sort((a, b) =>
  a.label.localeCompare(b.label)
);

  



export default function CommonStandardMaster() {
    const [selected, setSelected] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();
   const handleChange = async (event) => {
    const value = event.target.value;
    setSelected(value);

    try {
      setLoading(true);
      if(value =='academicTitle')
      {
        console.log(value);
      }
      // const response = await axios.post('/api/handle-selection', {
      //   selectedValue: value
      // });

      // Ví dụ: response.data = { message: 'Đã lưu thành công' }
      
    } catch (err) {
      setError('Error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="csm-category-label">Enter char to auto search</InputLabel>
        <Select
          labelId="csm-category-label"
          id="csm-category"
          value={selected}
          label="Enter char to auto search"
          onChange={handleChange}
        >
          {sortedCsmCategory.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
