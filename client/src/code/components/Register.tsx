import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Register component that provides a registration form for new users.
 * 
 * @component
 */
export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', { name, email, password });
      if (response.status === 201) {
        navigate('/message?message=Registration successful! Please log in.&type=success');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-template">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};