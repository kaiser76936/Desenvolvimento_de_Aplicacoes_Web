import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeFromCart, submitOrder } from '../state/cartSlice';
import { RootState, AppDispatch } from '../state/store';
import type { Product as ServerProduct } from '../../../../server/src/models/product';

interface Product extends ServerProduct {
  quantity: number;
}

/**
 * ShoppingCart component that displays the items in the cart with quantities and allows removing them.
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
              <p>
                <strong>{item.name}</strong><br />
                Price: ${item.price}<br />
                Quantity: {item.quantity}<br />
                Description: {item.description}
              </p>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <div className="finish-order-container">
            <button className="finish-order-button" onClick={handleFinishOrder} disabled={status === 'loading'}>
              {status === 'loading' ? 'Processing...' : 'Finish Order'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;