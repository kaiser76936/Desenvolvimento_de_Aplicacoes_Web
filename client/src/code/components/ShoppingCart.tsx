import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { removeFromCart } from '../state/cartSlice';
import { Product } from '../../models/Product';

/**
 * ShoppingCart component that displays the items in the cart and allows removing them.
 * 
 * @component
 */
export const ShoppingCart: React.FC = () => {
  const cartItems: Product[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item: Product) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};