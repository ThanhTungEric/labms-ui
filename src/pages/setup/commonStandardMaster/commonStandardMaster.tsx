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
import FilterSection from '../../../components/fiterSearch';
import ActionBar from '../../../components/actionBar';
import { useAcademicTitles } from '../../../services/hooks/academicTitle/academicTitle';

export default function CommonStandardMaster() {
    const { masterData, loading, error } = useMasterData();
    const [selected, setSelected] = React.useState('');
    const { academicTitles, loadingAcademicTitles, errorAcademicTitles } = useAcademicTitles();

    const {notify, showSuccess, showError, showInfo,showWarning, close} = useNotification();
   // Hiển thị thông báo khi có lỗi tải dữ liệu
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
const selectedItem = useMemo(() => {
  if (!selected) return [];

  const dataMap: Record<string, any[]> = {
    'academic-titles': academicTitles || [],
    // sau này thêm các loại khác ở đây
  };

  return dataMap[selected] || [];
}, [selected, academicTitles]);

  const handleFilter = (filters: any) => {
    showError('Tìm kiếm với:'+ filters);
    // Gọi API hoặc setState truyền filter vào bảng
  };
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
              basePath: item.basePath
            }))
          ) || []
        }
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          const selectedValue = newValue?.basePath || '';
          setSelected(selectedValue);
          
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
          <FilterSection onSearch={handleFilter} />   
          <ActionBar
              onImport={(file) => {
                console.log('📥 Imported CSV:', file.name);
                // parse CSV logic...
              }}
              onExport={() => {
                console.log('📤 Export CSV triggered');
                // generate CSV logic...
              }}
            />
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Mã</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {selectedItem.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.id}</TableCell>
                    </TableRow>
                  ))}
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
