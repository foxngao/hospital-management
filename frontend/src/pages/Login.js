import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ tenDangNhap: '', matKhau: '' });

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Login failed: ' + error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={credentials.tenDangNhap}
        onChange={(e) => setCredentials({ ...credentials, tenDangNhap: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={credentials.matKhau}
        onChange={(e) => setCredentials({ ...credentials, matKhau: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} color="primary">
        Login
      </Button>
    </Container>
  );
};

export default Login;