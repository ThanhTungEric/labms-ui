import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider
} from "@mui/material";

import VGUFullLogo from "../../assets/VGULogo_horizontal-orange.png";
import { styled } from "@mui/system";

const DiagonalBackground = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
    linear-gradient(135deg, rgb(238, 151, 89) 25%, #ffffff 25% 50%, #F28130 50%)
  `,
  zIndex: 0,
}));

function LoginPage({onLoginSuccess}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden", textAlign: "center" }}>
      <DiagonalBackground />

      <Grid
        container
        sx={{ position: "relative", zIndex: 1, minHeight: "100vh" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={6} sx={{ px: 4 }}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              p: 4,
              borderRadius: 2,
              maxWidth: 500,
              mx: "auto",
              color: "#0a6663",
              boxShadow: 3,
            }}
          >
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Box
                component="img"
                src={VGUFullLogo}
                alt="VGU Logo"
                sx={{ width: 270, height: 60, mb: 2 }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                This is the portal for the Lab Management System
                <br />
                of Vietnam-Germany University.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              sx={{
                width: { xs: "90%", sm: "320px" },
                mx: "auto",
                display: "block"
              }}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={password}
              sx={{
                width: { xs: "90%", sm: "320px" },
                mx: "auto",
                display: "block"
              }}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#F28130",
                "&:hover": { backgroundColor: "#d96a1a" },
                color: "#fff",
                fontWeight: "bold",
                width: { xs: "90%", sm: "160px" },
              }}
              onClick={onLoginSuccess}
            >
              Đăng nhập
            </Button>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "#F28130",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;