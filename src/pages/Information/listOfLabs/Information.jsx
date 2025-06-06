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
  DialogActions
} from '@mui/material';

function createData(no, labcode, labname, falcuty, location, area, supervisor, state, action = '...') {
  return { no, labcode, labname, falcuty, location, area, supervisor, state, action };
}

const initialData = [
  createData(1, 'Lab-001', 'AI', 'Engineering', 'Block A - R.101', 50, 'Nguyen Van A', 'approve', '...'),
  createData(2, 'Lab-002', 'ML', 'Engineering', 'Block A - R.102', 40, 'Nguyen Van B', 'pending', '...'),
  createData(3, 'Lab-003', 'Robotics', 'Engineering', 'Block B - R.201', 60, 'Nguyen Van C', 'approve', '...'),
  createData(4, 'Lab-004', 'Networks', 'IT', 'Block C - R.301', 30, 'Nguyen Van D', 'reject', '...'),
  createData(5, 'Lab-005', 'Security', 'IT', 'Block D - R.401', 35, 'Nguyen Van E', 'approve', '...'),
  createData(6, 'Lab-006', 'Cloud', 'Business', 'Block E - R.501', 25, 'Nguyen Van F', 'pending', '...'),
];

export default function BasicTable() {
  // State for filter & table rows
  const [filterText, setFilterText] = React.useState('');
  const [rows, setRows] = React.useState(initialData);

  // State to control the add-dialog
  const [open, setOpen] = React.useState(false);

  // State to store form input values
  const [formData, setFormData] = React.useState({
    labcode: '',
    labname: '',
    falcuty: '',
    location: '',
    area: '',
    supervisor: '',
    state: ''
  });

  // Handle opening/closing dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      labcode: '',
      labname: '',
      falcuty: '',
      location: '',
      area: '',
      supervisor: '',
      state: ''
    });
    setOpen(false);
  };

  // When the form is confirmed, add a new row to the table
  const handleConfirm = () => {
    const newNo = rows.length + 1;
    const newRow = createData(
      newNo,
      formData.labcode,
      formData.labname,
      formData.falcuty,
      formData.location,
      formData.area,
      formData.supervisor,
      formData.state
    );
    setRows([...rows, newRow]);
    handleClose();
  };

  // Update form data on change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Filter rows based on all column values
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Filter input and Add button in the same row */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField
          label="Filter labs (any column)"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{fontSize: '0.75rem', borderRadius: '100px'}}>
          Add
        </Button>
        <Button variant="contained" color="primary" sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap', minWidth: '150px', borderRadius: '100px' }}>
          Upload template
        </Button>
        <Button variant="contained" color="primary" sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap', minWidth: '170px', borderRadius: '100px' }}>
          Download template
        </Button>
      </Box>

      {/* Dialog for adding a new row */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Lab</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="labcode"
            label="Lab Code"
            type="text"
            fullWidth
            value={formData.labcode}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="labname"
            label="Lab Name"
            type="text"
            fullWidth
            value={formData.labname}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="falcuty"
            label="Faculty"
            type="text"
            fullWidth
            value={formData.falcuty}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={formData.location}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="area"
            label="Area"
            type="number"
            fullWidth
            value={formData.area}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="supervisor"
            label="Supervisor"
            type="text"
            fullWidth
            value={formData.supervisor}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="state"
            label="State"
            type="text"
            fullWidth
            value={formData.state}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
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
                <TableCell align="center">{row.falcuty}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">{row.supervisor}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.action}</TableCell>
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
    </Box>
  );
}