import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import VGULogo from '../assets/VGU_logo.png';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid container maxWidth="lg" spacing={4}>
        {/* Login Form */}
        <Grid sx={{ maxWidth: 400 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box
              component="img"
              src={VGULogo}
              alt="VGU Logo"
              sx={{ height: 40, mb: 1 }}
            />

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Box position="relative">
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: 'absolute', top: 25, right: 10 }}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#d35400',
                '&:hover': { backgroundColor: '#b94300' },
                '&:focus': { outline: 'none'},
              }}
            >
              Log in
            </Button>

            <Typography
              variant="body2"
              sx={{ mt: 1, color: '#d35400', cursor: 'pointer' }}
            >
              Lost password?
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

 