import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './state/store';
import { fetchProducts } from './state/productsSlice';
import '../css/main.css';
import AppRouter from './router';

/**
 * Main application component that sets up the Redux provider and renders the AppRouter component.
 * 
 * @component
 */
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <AppRouter />;
};

/**
 * Home component that displays the home page content.
 * 
 * @component
 */
export const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to our store!</h1>
    </div>
  );
};

// Wrap App with Provider here
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  /**
   * Redux Provider component that makes the Redux store available to the rest of the app.
   * 
   * @component
   */
  <Provider store={store}>
    <App />
  </Provider>
);