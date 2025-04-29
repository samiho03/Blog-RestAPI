import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Box, Link, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import loginImage from "../components/login_image.jpeg"; // Add your image here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/signin", {
        email,
        password,
      });
      if (response.data.status) {
        localStorage.setItem("token", response.data.data.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google?action=login";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5EFE8",
          padding: "20px", // Further reduced padding
        }}
      >
        <Box
          sx={{
            maxWidth: "350px", // Reduced max width
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom sx={{ color: "#262628", fontWeight: "bold", mb: 3 }}>
            Welcome back!
          </Typography>
          <Typography variant="body2" sx={{ color: "#262628", mb: 2 }}>
            Simplify your workflow and boost your productivity with Blog App.
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 1, fontSize: "0.875rem" }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                background: "#FFF",
                borderRadius: "12px", // Slightly reduced border radius
                mb: 1, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px", // Apply border radius to the outline
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px", // Reduced padding inside the text field
                  fontSize: "0.875rem", // Smaller font size
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem", // Smaller label font size
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                background: "#FFF",
                borderRadius: "12px", // Slightly reduced border radius
                mb: 1, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px", // Apply border radius to the outline
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px", // Reduced padding inside the text field
                  fontSize: "0.875rem", // Smaller font size
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem", // Smaller label font size
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Link href="#" sx={{ color: "#D6DC82", textDecoration: "none", fontSize: "0.875rem" }}>
                Forgot your password?
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "#D6DC82",
                color: "#262628",
                fontWeight: "bold",
                borderRadius: "12px", // Slightly reduced border radius
                py: 1, // Reduced padding
                fontSize: "0.875rem", // Smaller font size
                "&:hover": { background: "#C4CA72" },
              }}
            >
              Login
            </Button>
          </form>
          <Divider sx={{ my: 1.5, color: "#262628" }}>or continue with</Divider>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              background: "#FFF",
              color: "#262628",
              border: "1px solid #ddd",
              borderRadius: "12px", // Slightly reduced border radius
              py: 1, // Reduced padding
              fontSize: "0.875rem", // Smaller font size
              "&:hover": { background: "#f8f8f8" },
            }}
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon sx={{ fontSize: "1rem" }} />} // Smaller icon size
          >
            Sign in with Google
          </Button>
          <Typography sx={{ mt: 4, color: "#262628", fontSize: "0.875rem" }}>
            Not a member?{" "}
            <Link href="/signup" sx={{ color: "#D6DC82", fontWeight: "bold", textDecoration: "none" }}>
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" }, // Hide on small screens
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
};

export default Login;