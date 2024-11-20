import React from 'react';
import { Product } from '../../models/Product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../state/cartSlice';

interface ProductViewProps {
  product: Product;
}

export const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};