import Datastore from 'nedb';
import path from 'path';

// Define the path to the data directory
const dataDir = path.join(__dirname, '../../data');

// Initialize NeDB for products
export const productDB = new Datastore<{ id: number; name: string; price: number; image?: string }>({
  filename: path.join(dataDir, 'products.db'),
  autoload: true,
});

// Initialize NeDB for users
export const userDB = new Datastore<{ id: number; name: string; email: string; password: string }>({
  filename: path.join(dataDir, 'users.db'),
  autoload: true,
});

// Initialize NeDB for orders
export const orderDB = new Datastore<{ id: number; userId: number; products: { productId: number; quantity: number; price: number }[]; status: string; createdAt: Date; updatedAt?: Date; }>({
  filename: path.join(dataDir, 'orders.db'),
  autoload: true,
});

// Function to get the next unique ID
const getNextId = (db: Datastore<any>): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.find({}).sort({ id: -1 }).limit(1).exec((err, docs) => {
      if (err) return reject(err);
      const maxId = docs.length > 0 ? docs[0].id : 0;
      resolve(maxId + 1);
    });
  });
};

// Add a user
export const addUser = async (user: { name: string; email: string; password: string }): Promise<{ id: number }> => {
  const id = await getNextId(userDB);
  const newUser = { id, ...user };
  return new Promise((resolve, reject) => {
    userDB.insert(newUser, (err, insertedUser) => {
      if (err) return reject(err);
      resolve({ id: insertedUser.id });
    });
  });
};

// Remove a user
export const removeUser = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    userDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};

// Add a product
export const addProduct = async (product: { name: string; price: number; image?: string }): Promise<{ id: number }> => {
  const id = await getNextId(productDB);
  const newProduct = { id, ...product };
  return new Promise((resolve, reject) => {
    productDB.insert(newProduct, (err, insertedProduct) => {
      if (err) return reject(err);
      resolve({ id: insertedProduct.id });
    });
  });
};

// Remove a product
export const removeProduct = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    productDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};

// Add an order
export const addOrder = async (order: { userId: number; products: { productId: number; quantity: number; price: number }[]; status: string; createdAt: Date; updatedAt?: Date }): Promise<{ id: number }> => {
  const id = await getNextId(orderDB);
  const newOrder = { id, ...order, createdAt: new Date(), updatedAt: new Date() };
  return new Promise((resolve, reject) => {
    orderDB.insert(newOrder, (err, insertedOrder) => {
      if (err) return reject(err);
      resolve({ id: insertedOrder.id });
    });
  });
};

// Remove an order
export const removeOrder = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    orderDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};