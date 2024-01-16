// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Save the token to localStorage or a state management solution
      // Example using localStorage:
      localStorage.setItem('token', token);
      // history.push('/programs');
      window.location.href = '/programs'; 
      // history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div class="container mt-5">
  <div class="card" style={{ maxWidth: '400px', margin: 'auto' }}>
    <div class="card-body">
      <h2 class="card-title">Login</h2>
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button class="btn btn-primary" onClick={handleLogin}>Login</button>
      <p class="mt-3">New user? <a href="/signup">Sign Up</a></p>
    </div>
  </div>
</div>

  );
};

export default Login;
