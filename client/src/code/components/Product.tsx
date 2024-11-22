import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../state/productsSlice';
import { RootState, AppDispatch } from '../state/store';

/**
 * Product component that displays a list of products.
 * 
 * @component
 */
const Product: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-list-container">
        {products.map(product => (
          <div key={product.id} className="product-container">
            <span>{product.name} - ${product.price}</span>
            {product.image && <img src={product.image} alt={product.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;