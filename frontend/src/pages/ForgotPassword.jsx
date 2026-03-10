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
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

// Reuse same styled components (can be imported from a shared file)
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    setSubmitted(true);
    console.log("Password reset requested for:", email);
  };

  return (
    <GradientBackground>
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <GlassPaper elevation={0}>
            <LogoBox>
              <StyledAvatar>
                {/* Key icon for password reset */}
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
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </StyledAvatar>
              <Typography variant="h5" color="primary" gutterBottom>
                Forgot Password?
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Enter your email and we'll send you a link to reset your
                password.
              </Typography>
            </LogoBox>

            {submitted ? (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
                  Reset link sent! Check your email.
                </Alert>
                <Button
                  component={RouterLink}
                  to="/login"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: "primary.main",
                    color: "primary.main",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "primary.dark",
                      backgroundColor: "rgba(102, 126, 234, 0.04)",
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error}
                  helperText={error}
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
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  Send Reset Link
                </Button>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    ← Back to Login
                  </Link>
                </Box>
              </form>
            )}
          </GlassPaper>
        </Fade>
      </Container>
    </GradientBackground>
  );
};

export default ForgotPassword;