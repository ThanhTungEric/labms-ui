import React, { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';

const mockUser = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  avatar: 'https://i.imgur.com/9wCbcYz.png', // Replace with your image path
};

const FileUpload = () => {
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

  return (
    <Box p={4}>
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
};

export default FileUpload;
