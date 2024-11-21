import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};