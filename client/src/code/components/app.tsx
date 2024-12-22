import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from '../state/store';
import { fetchProductsID } from '../state/productsSlice';
import '../../css/main.css';
import AppRouter from '../router';

/**
 * Main application component that sets up the Redux provider and renders the AppRouter component.
 * 
 * @component
 */
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchProductsID());
  }, [dispatch]);

  return <AppRouter />;
};

/**
 * Home component that displays the home page content.
 * 
 * @component
 */
/**
 * Home component that displays the home page content.
 * 
 * @component
 */
export const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
      dispatch(fetchProductsID());
  }, [dispatch]);

  return (
    <div>
      <section className="hero">
        <h1>Welcome to Our Webshop!</h1>
        <p>Discover amazing products at unbeatable prices.</p>
        <Link to="/products"><button>Shop Now</button></Link>
      </section>

      <section className="highlighted-products">
        <h2>Highlighted Products</h2>
        <div className="highlighted-products-list">
          {products.map(product => (
            <div key={product.id} className="product-container">
              {product.image && (
                <>
                  <img src={product.image} />
                </>
              )}
              <span>{product.name}</span>
              <span>{product.price}€</span>
              <p>{product.description}</p>
              <Link to ="/products"><button>Check it out</button></Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


export default App;

/**
   * Redux Provider component that makes the Redux store available to the rest of the app.
   * 
   * @component
   */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}><App /> </Provider>);