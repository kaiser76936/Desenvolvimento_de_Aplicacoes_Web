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
      userId: 4,
      products: [
        {
          id: 2,
          name: 'Kawasaki Z900RS',
          price: 15950,
          description: 'The Kawasaki Z900RS blends retro styling with modern performance.',
          image: 'http://localhost:3000/images/Kawasaki_Z900RS.jpg',
          quantity: 1,
        }
      ],
      status: 'Completed',
      createdAt: new Date(),
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