import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate('/message?message=Welcome back!&type=success');
  };

  return (
    <div className="login-template">
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <p>Not registered? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  );
};