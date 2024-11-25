import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Orders } from './components/Orders';
import { Product } from './components/Product';
import { Register } from './components/Register';
import  ShoppingCart from './components/ShoppingCart';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;