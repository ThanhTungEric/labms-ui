import {
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {actionBar} from '../services/types/actionBar.type';
import { useNotification } from '../services/hooks/notification/notification';
import LabSearch from './LabSearch';
import FilterSection from './fiterSearch';
import { useRef } from 'react';

export default function ActionBar({ type, onDelete, onImport, onExport, selectedIds, onAdd, handleFilter }: actionBar) {
  const hiddenAddTypes = ["equipment-statuses", "lab-positions", "something-else"];
  const { notify, showSuccess, showError, showInfo, showWarning, close } = useNotification();
  const filterRef = useRef<{ reset: () => void }>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && typeof onImport === 'function') {
      onImport(file);
    }
    e.target.value = ''; // reset input để chọn lại cùng file
  };
  
 

  return (
    <Box
      mt={2}
      p={1}
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      alignItems="center"
      border="1px solid #e0e0e0"
      borderRadius={1}
      mb={1}
    >
      <Box display="flex"  gap={1}>
        {!hiddenAddTypes.includes(type) && (
          
          <Tooltip title="Add">
            
            <IconButton component="label" size="small" onClick={onAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}

        
        {/* <Tooltip title='View'>
            <IconButton component="label" size="small" color="primary">
                <VisibilityIcon />
            </IconButton>
        </Tooltip> */}
        {/* <Tooltip title='Edit'>
            <IconButton component="label" size="small" color="primary">
                <EditIcon />
            </IconButton>
        </Tooltip> */}
        
        {!hiddenAddTypes.includes(type) && (
          <Tooltip title='Delete'>
            <IconButton component="label" size="small"  onClick={() => {
              if (onDelete ) {
                onDelete(selectedIds);
              }
            }}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        )}

        {/* Import CSV */}
        <Tooltip title="Import CSV">
          <IconButton component="label" size="small" >
            <FileUploadOutlinedIcon />
            <input
              type="file"
              hidden
              accept=".csv"
              onChange={handleFileChange}
            />
          </IconButton>
        </Tooltip>

        {/* Export CSV */}
        <Tooltip title="Export CSV">
          <IconButton size="small" onClick={onExport}>
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Tooltip>
                  <FilterSection ref={filterRef} onSearch={handleFilter} />

      </Box>
    </Box>
  );
}
