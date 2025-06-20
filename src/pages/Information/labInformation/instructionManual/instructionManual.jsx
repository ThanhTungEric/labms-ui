import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import LabInformation from '../labInformation';
import RoomUsageLog from '../roomUsageLog/roomUsageLog';

export default function FileUpload() {
  // Mock router
  const [pathname, setPathname] = useState('/information/labInformation/instructionManual');
  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Mock user info
  const mockUser = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    avatar: 'https://i.imgur.com/9wCbcYz.png',
  };

  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      name: file.name,
      lastModified: new Date(file.lastModified).toLocaleDateString('en-GB'),
      uploadedBy: mockUser,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Routing
  switch (router.pathname) {
    case '/information/labInformation':
      return <LabInformation />;
    case '/information/labInformation/roomUsageLog':
      return <RoomUsageLog />;
    case '/information/labInformation/instructionManual':
    default:
      break;
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.navigate('/information/labInformation')}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'gray',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#1565c0',
              color: 'white',
            },
          }}
        >
          Room Facilities
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.navigate('/information/labInformation/roomUsageLog')}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'gray',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#1565c0',
              color: 'white',
            },
          }}
        >
          Room Usage Log
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.navigate('/information/labInformation/instructionManual')}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'primary',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
          }}
        >
          Instruction Manual
        </Button>
      </Box>

      {/* File Table */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Attached Files
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>File Names</strong></TableCell>
              <TableCell><strong>Last Modified</strong></TableCell>
              <TableCell><strong>Uploaded By</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((fileObj, index) => (
              <TableRow key={index}>
                <TableCell>
                  <a href={URL.createObjectURL(fileObj.file)} target="_blank" rel="noreferrer">
                    {fileObj.name}
                  </a>
                </TableCell>
                <TableCell>{fileObj.lastModified}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={fileObj.uploadedBy.avatar} />
                    <Box>
                      <div>{fileObj.uploadedBy.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'gray' }}>{fileObj.uploadedBy.email}</div>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Upload Button */}
      <Box mt={3}>
        <input
          accept="*"
          type="file"
          id="upload-file"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-file">
          <Button variant="contained" startIcon={<UploadFileIcon />} component="span">
            Upload Attached File
          </Button>
        </label>
      </Box>
    </Box>
  );
}
