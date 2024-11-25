import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../state/ordersSlice';
import { RootState, AppDispatch } from '../state/store';
import { Order } from '../../../../server/src/models/order';

export const Orders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders, status, error } = useSelector((state: RootState) => state.orders);
  const userId = 1;

  useEffect(() => {
    dispatch(fetchUserOrders(userId));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p>Error fetching orders: {error}</p>;
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        orders.map((order: Order) => (
          <div key={order.id} className="order-item">
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <h3>Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};