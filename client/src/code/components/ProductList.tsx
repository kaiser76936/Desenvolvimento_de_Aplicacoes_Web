import React from 'react';
import { ProductView } from './ProductView';
import { Product } from '../../models/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export const ProductList: React.FC = () => {
  const products: Product[] = useSelector((state: RootState) => state.products.products);

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      {products.map(product => (
        <div key={product.id} className="product-container">
          <ProductView product={product} />
        </div>
      ))}
    </div>
  );
};