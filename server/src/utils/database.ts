import Datastore from 'nedb';
import path from 'path';

const dataDir = path.join(__dirname, '../../data');

/**
 * Datastore for products, with each product having an ID, name, price, and optional image.
 * Products are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; name: string; price: number; description: string; image?: string }>}
 */
export const productDB = new Datastore<{ id: number; name: string; price: number; description: string; image?: string }>({
  filename: path.join(dataDir, 'products.db'),
  autoload: true,
});

/**
 * Datastore for users, with each user having an ID, name, email, and password.
 * Users are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; name: string; email: string; password: string }>}
 */
export const userDB = new Datastore<{ id: number; name: string; email: string; password: string }>({
  filename: path.join(dataDir, 'users.db'),
  autoload: true,
});

/**
 * Datastore for orders, with each order having an ID, a user ID, a list of products with quantities,
 * a status, and timestamps for creation and optional updates.
 * Orders are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; userId: number; products: { id: number; name: string; price: number; image?: string; quantity: number }[]; status: string; createdAt: Date; updatedAt?: Date }>}
 */
export const orderDB = new Datastore<{ id: number; userId: number; products: { id: number; name: string; price: number; image?: string; quantity: number }[]; status: string; createdAt: Date; updatedAt?: Date; }>({
  filename: path.join(dataDir, 'orders.db'),
  autoload: true,
});

/**
 * Generates the next unique ID for a new entry in the database.
 *
 * @param {Datastore<any>} db - The NeDB datastore instance.
 * @returns {Promise<number>} A promise that resolves to the next unique ID.
 */
const getNextId = (db: Datastore<any>): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.find({}).sort({ id: -1 }).limit(1).exec((err, docs) => {
      if (err) return reject(err);
      const maxId = docs.length > 0 ? docs[0].id : 0;
      resolve(maxId + 1);
    });
  });
};

/**
 * Adds a new user to the database.
 *
 * @param {Object} user - An object containing the name, email, and password of the user.
 * @returns {Promise<{id: number}>} A promise that resolves to an object containing the ID of the added user.
 */
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

/**
 * Removes a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the removal was successful, otherwise false.
 */
export const removeUser = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    userDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};

/**
 * Adds a new product to the database.
 *
 * @param {Object} product - An object containing the name, price, and optional image of the product.
 * @returns {Promise<{id: number}>} A promise that resolves to an object containing the ID of the added product.
 */
export const addProduct = async (product: { name: string; price: number; description: string;  image?: string; }): Promise<{ id: number }> => {
  const id = await getNextId(productDB);
  const newProduct = { id, ...product };
  return new Promise((resolve, reject) => {
      productDB.insert(newProduct, (err, insertedProduct) => {
          if (err) {
              reject(err);
          } else {
              resolve({ id: insertedProduct.id });
          }
      });
  });
};

/**
 * Removes a product from the database by its ID.
 *
 * @param {number} id - The ID of the product to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the removal was successful, otherwise false.
 */
export const removeProduct = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    productDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};

/**
 * Updates an existing order with the specified ID and updates.
 *
 * @param id - The ID of the order to update.
 * @param updates - An object containing the fields to update.
 * @returns A promise that resolves to true if the update was successful, otherwise false.
 */
export const updateOrder = (id: number, updates: Partial<{ status: string; products: { id: number; name: string; price: number; image?: string; quantity: number }[]; updatedAt: Date; }>): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    orderDB.update({ id }, { $set: updates }, {}, (err, numReplaced) => {
      if (err) return reject(err);
      resolve(numReplaced > 0);
    });
  });
};

/**
 * Adds a new order to the database.
 *
 * @param order - The order details to add.
 * @returns {Promise<{ id: number }>} A promise that resolves to an object containing the new order's ID.
 */
export const addOrder = async (order: { userId: number; products: { id: number; name: string; price: number; image?: string; quantity: number }[]; status: string; createdAt: Date; updatedAt?: Date; }): Promise<{ id: number }> => {
  const id = await getNextId(orderDB);
  const newOrder = { id, ...order };
  return new Promise((resolve, reject) => {
    orderDB.insert(newOrder, (err: Error | null, doc: any) => {
      if (err) return reject(err);
      resolve({ id: doc.id });
    });
  });
};

/**
 * Removes an order from the database by its ID.
 *
 * @param id - The ID of the order to remove.
 * @returns A promise that resolves to true if the removal was successful, otherwise false.
 */
export const removeOrder = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    orderDB.remove({ id }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved > 0);
    });
  });
};