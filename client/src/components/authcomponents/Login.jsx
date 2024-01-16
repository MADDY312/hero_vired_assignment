// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-backend-api/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Save the token to localStorage or a state management solution
      // Example using localStorage:
      localStorage.setItem('token', token);

      // Redirect or navigate to the authenticated area of your app
      // Example using React Router:
      // history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
