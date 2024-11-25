// SHOPPINGCART.TSX
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeFromCart, submitOrder } from '../state/cartSlice';
import { RootState, AppDispatch } from '../state/store';
import type { Product } from '../../../../server/src/models/product';

/**
 * ShoppingCart component that displays the items in the cart and allows removing them.
 * 
 * @component
 */
const ShoppingCart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector((state: RootState) => state.cart);
  const userId = 1; 

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleFinishOrder = () => {
    dispatch(submitOrder(userId));
  };

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      {products.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          {products.map((item: Product) => (
            <div key={item.id} className="shopping-cart-item">
              <p>{item.name}</p>
              <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <button className="finish-order-button" onClick={handleFinishOrder} disabled={status === 'loading'}>
            {status === 'loading' ? 'Processing...' : 'Finish Order'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;