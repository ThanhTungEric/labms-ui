import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VGUFullLogo from '../assets/VGU_logo.png';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (username === 'finnk' && password === '123456') {
      setSuccess(true);
      setError('');
    } else {
      setError('Invalid username or password');
      setSuccess(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}
    >
      <Grid container maxWidth="lg" spacing={4}>
        {/* Login Form */}
        <Grid item xs={12} md={6} sx={{ maxWidth: 400 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box
              component="img"
              src={VGUFullLogo}
              alt="VGU Logo"
              sx={{ height: 40, mb: 1 }}
            />

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Box position="relative">
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                sx={{ position: 'absolute', top: 25, right: 10 }}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>

            {/* Feedback Messages */}
            {error && (
              <Box mt={1}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            {success && (
              <Box mt={1}>
                <Alert severity="success">Login successful!</Alert>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                mt: 2,
                backgroundColor: '#d35400',
                '&:hover': { backgroundColor: '#b94300' },
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
