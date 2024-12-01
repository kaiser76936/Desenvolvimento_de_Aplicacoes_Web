import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../state/axiosConfig'; 
import { login } from '../state/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      const response = await axios.post('/api/users/login', { email, password });
      const { userId } = response.data;
      dispatch(login({ email, userId }));
      navigate('/message?message=Welcome back!&type=success');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-template">
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        {error && <p className="error">{error}</p>}
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
