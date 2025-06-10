import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(no, labcode, labname, faculty, location, area, supervisor, state) {
  return { no, labcode, labname, faculty, location, area, supervisor, state };
}

const initialData = [
  createData(1, 'Lab-001', 'AI', 'Engineering', 'Block A - R.101', 50, 'Nguyen Van A', 'approve'),
  createData(2, 'Lab-002', 'ML', 'Engineering', 'Block A - R.102', 40, 'Nguyen Van B', 'pending'),
  createData(3, 'Lab-003', 'Robotics', 'Engineering', 'Block B - R.201', 60, 'Nguyen Van C', 'approve'),
  createData(4, 'Lab-004', 'Networks', 'IT', 'Block C - R.301', 30, 'Nguyen Van D', 'reject'),
  createData(5, 'Lab-005', 'Security', 'IT', 'Block D - R.401', 35, 'Nguyen Van E', 'approve'),
  createData(6, 'Lab-006', 'Cloud', 'Business', 'Block E - R.501', 25, 'Nguyen Van F', 'pending'),
];

export default function BasicTable() {
  const [filterText, setFilterText] = React.useState('');
  const [labCodeFilter, setLabCodeFilter] = React.useState('');
  const [labNameFilter, setLabNameFilter] = React.useState('');
  const [locationFilter, setLocationFilter] = React.useState('');
  const [facultyFilter, setFacultyFilter] = React.useState('');
  const [showMoreFilters, setShowMoreFilters] = React.useState(false);

  const [rows, setRows] = React.useState(initialData);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editRowIndex, setEditRowIndex] = React.useState(null);
  const [formData, setFormData] = React.useState({
    labcode: '', labname: '', faculty: '', location: '', area: '', supervisor: '', state: ''
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuRow, setMenuRow] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const handleDelete = () => {
    setRows(rows.filter((r) => r.no !== menuRow.no));
    handleMenuClose();
  };

  const handleEdit = () => {
    setFormData(menuRow);
    setIsEditing(true);
    setEditRowIndex(rows.findIndex(r => r.no === menuRow.no));
    setOpen(true);
    handleMenuClose();
  };

  const handleClickOpen = () => {
    setIsEditing(false);
    setFormData({ labcode: '', labname: '', faculty: '', location: '', area: '', supervisor: '', state: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({ labcode: '', labname: '', faculty: '', location: '', area: '', supervisor: '', state: '' });
    setOpen(false);
  };

  const handleConfirm = () => {
    if (isEditing && editRowIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editRowIndex] = { ...formData, no: rows[editRowIndex].no };
      setRows(updatedRows);
    } else {
      const newNo = rows.length + 1;
      setRows([...rows, createData(newNo, ...Object.values(formData))]);
    }
    handleClose();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const filteredRows = rows.filter((row) => {
    const generalMatch = Object.values(row).join(' ').toLowerCase().includes(filterText.toLowerCase());
    const labCodeMatch = row.labcode.toLowerCase().includes(labCodeFilter.toLowerCase());
    const labNameMatch = row.labname.toLowerCase().includes(labNameFilter.toLowerCase());
    const locationMatch = row.location.toLowerCase().includes(locationFilter.toLowerCase());
    const facultyMatch = row.faculty.toLowerCase().includes(facultyFilter.toLowerCase());

    return (
      generalMatch &&
      (!showMoreFilters || (labNameMatch && labCodeMatch && locationMatch && facultyMatch))
    );
  });

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Filter labs (any column)"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button
          onClick={() => setShowMoreFilters((prev) => !prev)}
          variant="outlined"
          color="primary"
          sx={{
            color: 'white',
            borderColor: 'none',
            backgroundColor: '#4682B4  ',
            '&:hover': {
              color: '#4682B4',
              backgroundColor: 'white',
            },
          }}
        >
          {showMoreFilters ? 'Hide Filters' : 'More Filters'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            borderRadius: '100px',
            backgroundColor: '#4682B4',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#4682B4',
              color: '#white',
              '& .hover-text': {
                display: 'inline',
                marginLeft: '8px',
              },
            },
          }}
        >
          <AddIcon fontSize="small" />
          <Box
            className="hover-text"
            sx={{
              display: 'none',
              transition: 'display 0.3s ease-in-out',
            }}
          >
            Add
          </Box>
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '100px',
            backgroundColor: '#4682B4',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#4682B4',
              color: '#white',
              '& .hover-text': {
                display: 'inline',
                marginLeft: '8px',
              },
            },
          }}
        >
          <UploadIcon fontSize="small" />
          <Box
            className="hover-text"
            sx={{
              display: 'none',
              transition: 'display 0.3s ease-in-out',
            }}
          >
            Import
          </Box>
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '100px',
            backgroundColor: '#4682B4',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#4682B4',
              color: '#white',
              '& .hover-text': {
                display: 'inline',
                marginLeft: '8px',
              },
            },
          }}
        >
          <DownloadIcon fontSize="small" />
          <Box
            className="hover-text"
            sx={{
              display: 'none',
              transition: 'display 0.3s ease-in-out',
            }}
          >
            Export
          </Box>
        </Button>
      </Box>

      {showMoreFilters && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Lab Name"
            variant="outlined"
            value={labNameFilter}
            onChange={(e) => setLabNameFilter(e.target.value)}
          />
          <TextField
            label="Lab Code"
            variant="outlined"
            value={labCodeFilter}
            onChange={(e) => setLabCodeFilter(e.target.value)}
          />
          <TextField
            label="Location"
            variant="outlined"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <TextField
            label="Faculty"
            variant="outlined"
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Lab' : 'Add New Lab'}</DialogTitle>
        <DialogContent>
          {['labcode','labname','faculty','location','area','supervisor','state'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === 'area' ? 'number' : 'text'}
              fullWidth
              value={formData[field]}
              onChange={handleFormChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="labs table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Lab Code</TableCell>
              <TableCell align="center">Lab Name</TableCell>
              <TableCell align="center">Faculty</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Area</TableCell>
              <TableCell align="center">Supervisor</TableCell>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.no}>
                <TableCell align="center">{row.no}</TableCell>
                <TableCell align="center">{row.labcode}</TableCell>
                <TableCell align="center">{row.labname}</TableCell>
                <TableCell align="center">{row.faculty}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">{row.supervisor}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuClick(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No matching results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={handleEdit}><EditIcon /></MenuItem>
        <MenuItem onClick={handleDelete}><DeleteIcon /></MenuItem>
      </Menu>
    </Box>
  );
}
