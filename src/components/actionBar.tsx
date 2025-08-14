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

export default function ActionBar({ onDelete, onImport, onExport, selectedIds  }: actionBar) {
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
        <Tooltip title='Add'>
            <IconButton component="label" size="small" color="primary">
                <AddIcon />
            </IconButton>
        </Tooltip>
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
        <Tooltip title='Delete'>
            <IconButton component="label" size="small" color="primary" onClick={() => {
              if (onDelete && selectedIds.length > 0) {
                onDelete(selectedIds);
              }
            }}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        

        {/* Import CSV */}
        <Tooltip title="Import CSV">
          <IconButton component="label" size="small" color="primary">
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
          <IconButton size="small" color="primary" onClick={onExport}>
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
