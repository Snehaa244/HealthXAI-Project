"use client";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/");
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError;
      setErrorMessage(
        error.response?.data?.error || error.message || "Login failed"
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }} />
        <Typography variant="h5">Login</Typography>
        <Box sx={{ mt: 1 }} component="form" onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
        }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || buttonDisabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup">Don&apos;t have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;