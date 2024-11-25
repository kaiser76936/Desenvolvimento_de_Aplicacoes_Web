import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../state/productsSlice';
import { addToCart } from '../state/cartSlice';
import { RootState, AppDispatch } from '../state/store';
import type { Product as ProductType } from '../../../../server/src/models/product';

/**
 * Product component that displays a list of products.
 * 
 * @component
 */
export const Product: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: ProductType) => {
    if (isLoggedIn) {
      dispatch(addToCart(product));
    } else {
      window.alert('Please log in to add items to your cart.');
    }
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-list-container">
        {products.map(product => (
          <div key={product.id} className="product-container">
            <span>{product.name} - ${product.price}</span>
            <p>{product.description}</p>
            {product.image && <img src={product.image}/>}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};