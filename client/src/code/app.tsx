import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './state/store';
import { ProductList } from './components/ProductList';
import { fetchProducts } from './state/productsSlice';
import { Navbar } from './components/Navbar';
import '../css/main.css';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  );
};

// Wrap App with Provider here
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);