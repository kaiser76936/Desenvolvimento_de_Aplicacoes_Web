import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeFromCart } from '../state/cartSlice';
import { RootState, AppDispatch } from '../state/store';
import type { Product } from '../../../../server/src/models/product';

/**
 * ShoppingCart component that displays the items in the cart and allows removing them.
 * 
 * @component
 */
const ShoppingCart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      {orders.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        orders.map((item: Product) => (
          <div key={item.id} className="shopping-cart-item">
            <p>{item.name}</p>
            <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ShoppingCart;