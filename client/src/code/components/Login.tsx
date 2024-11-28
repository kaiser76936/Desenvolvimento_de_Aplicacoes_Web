import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../state/userSlice';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Login component that provides a login form for users.
 * 
 * @component
 */
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      const { userId } = response.data;
      dispatch(login({ email, password, userId }));
      navigate('/message?message=Welcome back!&type=success');
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally, handle login error by setting error state or displaying a message
    }
  };

  return (
    <div className="login-template">
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <p>Not registered? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  );
};