import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/app';
import { Login } from './components/Login';
import { Message } from './components/Message';
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
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/message" element={<Message/>} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;