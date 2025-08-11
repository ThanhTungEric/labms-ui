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
  Paper, Checkbox
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
import { useProgramsCSM } from '../../../services/hooks/programsCSM/programsCSM';
import { usePriceCategories } from '../../../services/hooks/priceCategories/priceCategoties';
import { useEquipmentStatuses } from '../../../services/hooks/equipmentStatuses/equipmentStatuses';
export default function CommonStandardMaster() {

    const [searchKey, setSearchKey] = useState("");
    const { masterData, loading, error } = useMasterData();
    const [selected, setSelected] = React.useState('');
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

    const { academicTitles, loadingAcademicTitles, errorAcademicTitles } = useAcademicTitles();
    const { programsCSM, loadingProgramsCSM, errorProgramsCSM } = useProgramsCSM(searchKey);
    const { priceCategories, loadingPriceCategories, errorPriceCategories } = usePriceCategories();
    const { equipmentStatuses, loadingEquipmentStatuses, errorEquipmentStatuses } = useEquipmentStatuses();
    const {notify, showSuccess, showError, showInfo,showWarning, close} = useNotification();
   // Hiển thị thông báo khi có lỗi tải dữ liệu
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);

const selectedItem = useMemo(() => {
  if (!selected) return [];

  const dataMap: Record<string, any> = {
    "academic-titles": academicTitles || [],
    "programs": programsCSM || [],
    "price-categories": priceCategories || [],
    "equipment-statuses": equipmentStatuses || [],
  };
  const rawData = dataMap[selected];
  // Trường hợp API trả về mảng trực tiếp
  if (Array.isArray(rawData)) {
    return rawData;
  }
  // Trường hợp API trả về object có key data là mảng
  if (rawData && Array.isArray(rawData.data)) {
    return rawData.data;
  }
  return [];
}, [selected, academicTitles, programsCSM]);

console.log(selectedItem);
const items = selectedItem;
const keys = items.length > 0 
  ? Object.keys(items[0]).filter(k => k !== "faculty") 
  : [];
  const handleFilter = (filters: string) => {
   setSelected(selected);
   setSearchKey(filters);
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
      {selectedItem.length > 0 ? (
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
    <TableCell padding="checkbox" style={{ textAlign: "center", padding: "8px", background: "#f0f0f0" }}>
      <Checkbox
        indeterminate={selectedIds.length > 0 && selectedIds.length < items.length}
        checked={items.length > 0 && selectedIds.length === items.length}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedIds(items.map((item:any) => item.id)); // chọn hết
          } else {
            setSelectedIds([]); // bỏ chọn hết
          }
        }}
      />
    </TableCell>
    {keys.map((key) => (
      <TableCell key={key} style={{ textAlign: "center", padding: "8px", background: "#f0f0f0" }}>
        <b>{key.toUpperCase()}</b>
      </TableCell>
    ))}
  </TableRow>
</TableHead>

<TableBody>
  {items.map((row: Record<string, any>, rowIndex: number) => {
    const isSelected = selectedIds.includes(row.id);
    return (
      <TableRow key={rowIndex} selected={isSelected} hover role="checkbox" aria-checked={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onChange={() => {
              if (isSelected) {
                setSelectedIds(selectedIds.filter(id => id !== row.id));
              } else {
                setSelectedIds([...selectedIds, row.id]);
              }
            }}
          />
        </TableCell>
        {keys.map((key) => (
          <TableCell key={key} style={{ textAlign: "center", padding: "8px" }}>
            {row[key]}
          </TableCell>
        ))}
      </TableRow>
    );
  })}
</TableBody>

      </Table>
    </TableContainer>
        </Box>
      ): (
        <Box mt={2} textAlign="center" color="gray">
          No data to display
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
