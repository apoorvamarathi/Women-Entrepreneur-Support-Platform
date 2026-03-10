import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(145deg, #667eea 0%, #764ba2 100%)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "200%",
    height: "200%",
    top: "-50%",
    left: "-50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)",
    animation: "spin 20s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
  "& svg": {
    fontSize: 40,
    color: "white",
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login", { email, password });
  };

  return (
    <GradientBackground>
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <GlassPaper elevation={0}>
            <LogoBox>
              <StyledAvatar>
                {/* Women Entrepreneur Logo: female symbol + briefcase */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <line x1="12" y1="12" x2="12" y2="20" />
                  <line x1="8" y1="16" x2="16" y2="16" />
                  <rect x="4" y="14" width="16" height="6" rx="1" />
                  <line x1="8" y1="14" x2="8" y2="18" />
                  <line x1="16" y1="14" x2="16" y2="18" />
                </svg>
              </StyledAvatar>
              <Typography variant="h5" color="primary" gutterBottom>
                Women Entrepreneur
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Support Platform
              </Typography>
            </LogoBox>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                Log in
              </Button>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Link>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Create account
                </Link>
              </Box>
            </form>
          </GlassPaper>
        </Fade>
      </Container>
    </GradientBackground>
  );
};

export default Login;