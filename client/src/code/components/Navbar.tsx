import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { logout } from '../state/userSlice';

/**
 * Navbar component that provides navigation links.
 * 
 * @component
 */
export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {!user.isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li><Link to="/cart">Cart</Link></li>
            <Link to="/orders">Orders</Link>
            <li>{user.email}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};