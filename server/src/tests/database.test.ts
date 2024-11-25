import { addUser, removeUser, addProduct, removeProduct } from '../utils/database';

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

  // Updated test case
  it('should add a product', async () => {
    const product = {
      name: 'Test Product',
      price: 100,
      description: 'Test description', // Added this line
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
});