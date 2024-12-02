const { addOrder } = require('../utils/database');

/**
 * Represents an array of orders to be added to the database.
 * @type {Array<Object>}
 */
const orders = [
  {
    userId:4,
    products:[
      {
        id:2,
        name: 'Kawasaki Z900RS',
        price: 15950,
        description: 'The Kawasaki Z900RS blends retro styling with modern performance, featuring a 948cc inline-four engine and classic design details.',
        image:'http://localhost:3000/images/Kawasaki_Z900RS.jpg',
        quantity: 1,
      }
    ],
    status: 'Completed',
    createdAt: new Date(),
  },
];

/**
 * Asynchronously inserts orders into the database.
 * @async
 * @function insertOrders
 */
const insertOrders = async () => {
  for (const order of orders) {
    try {
      const result = await addOrder(order);
      console.log(`Order added with ID: ${result.id}`);
    } catch (err) {
      console.error('Error adding order:', err);
    }
  }
};

// Run the function
insertOrders();