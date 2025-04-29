import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Container, Typography, Box, Link, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      if (response.data.status) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google?action=signup";
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: "#FFF6EE",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "#FFF6EE",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#262628", fontWeight: "bold" }}>
          Join Us!
        </Typography>
        <Typography variant="body1" sx={{ color: "#262628", mb: 4 }}>
          Make your work easier and organized with Tugat's App.
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ background: "#FFF", borderRadius: "8px", mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ background: "#FFF", borderRadius: "8px", mb: 2 }}
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
            sx={{ background: "#FFF", borderRadius: "8px", mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "#D6DC82",
              color: "#262628",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": { background: "#C4CA72" },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Divider sx={{ my: 3, color: "#262628" }}>or continue with</Divider>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            background: "#FFF",
            color: "#262628",
            border: "1px solid #ddd",
            py: 1.5,
            "&:hover": { background: "#f8f8f8" },
          }}
          onClick={handleGoogleSignup}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Typography sx={{ mt: 3, color: "#262628" }}>
          Already have an account?{" "}
          <Link href="/login" sx={{ color: "#D6DC82", fontWeight: "bold", textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;