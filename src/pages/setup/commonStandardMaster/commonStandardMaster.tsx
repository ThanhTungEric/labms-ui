import  React , { useEffect,useMemo, useState } from 'react';
import {
   Box,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import Notification from '../../../components/Notification';
import { useMasterData } from '../../../services/hooks/masterData/masterData';
import { useNotification } from '../../../services/hooks/notification/notification';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
export default function CommonStandardMaster() {
    const { masterData, loading, error } = useMasterData();
    const [selected, setSelected] = React.useState('');
    const {notify, showSuccess, showError, showInfo,showWarning, close} = useNotification();
   // Hiển thị thông báo khi có lỗi tải dữ liệu
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
  const selectedItem = useMemo(() => {
    if (!selected || !masterData) return null;
    for (const group of masterData) {
      const item = group.items.find((i) => i.code === selected);
      if (item) return item;
    }
    return null;
  }, [selected, masterData]);  
  return (
    
    <Box sx={{ p: 2 }}>
      
      <Autocomplete
        disabled={loading || !!error}
        options={
          masterData?.flatMap((group) =>
            group.items.map((item) => ({
              label: item.name,
              value: item.code,
              group: group.name,
            }))
          ) || []
        }
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          const selectedValue = newValue?.value || '';
          setSelected(selectedValue);
          if (selectedValue) {
            showSuccess(`Selected: ${selectedValue}`);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter char to auto search"
            error={!!error}
            helperText={error ? 'Cannot download list' : ''}
          />
        )}
      />
      {selectedItem && (
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <IconButton size="small"><AddIcon /></IconButton>
                    <IconButton size="small"><EditIcon /></IconButton>
                    <IconButton size="small"><VisibilityIcon /></IconButton>
                    <IconButton size="small"><DeleteIcon /></IconButton>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Mã</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{selectedItem.name}</TableCell>
                  <TableCell>{selectedItem.code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Notification
        open = {notify.open}
        message={notify.message}
        severity={notify.severity}
        onClose={close}
      />
    </Box>
    
  );
}
