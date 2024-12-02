import { addUser, removeUser, addProduct, removeProduct, addOrder, removeOrder } from '../utils/database';

describe('Database Operations', () => {
  it('should add a user', async () => {
    const user = { name: 'Test User', email: 'test@example.com', password: 'password123' }; 
    const result = await addUser(user);
    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('number');
  });

  it('should remove a user', async () => {
    const userId = 1; 
    const result = await removeUser(userId);
    expect(result).toBe(true);
  });

  it('should add a product', async () => {
    const product = {
      name: 'Test Product',
      price: 100,
      description: 'Test description', 
    };
    const result = await addProduct(product);
    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('number');
  });

  it('should remove a product', async () => {
    const productId = 1; 
    const result = await removeProduct(productId);
    expect(result).toBe(true);
  });

  it('should add an order', async () => {
    const order = {
      userId: 1,
      products: [
        { id: 1, name: 'Product 1', price: 50, quantity: 2 },
        { id: 2, name: 'Product 2', price: 30, quantity: 1 }
      ],
      status: 'pending',
      createdAt: new Date()
    };
    const result = await addOrder(order);
    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('number');
  });

  it('should remove an order', async () => {
    const orderId = 1;
    const result = await removeOrder(orderId);
    expect(result).toBe(true);
  });
});