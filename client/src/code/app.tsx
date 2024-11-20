import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ProductList } from './components/ProductList';

const App = () => (
  <Provider store={store}>
    <ProductList />
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);