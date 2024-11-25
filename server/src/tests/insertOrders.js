const Datastore = require('nedb');
const path = require('path');

// Initialize NeDB for orders
const orderDB = new Datastore({
  filename: path.join(__dirname, '../../data/orders.db'),
  autoload: true,
});

// Define the orders to be added
const orders = [
  {
    id: 1,
    userId: 101,
    products: [
      {
        id: 1,
        name: 'Product A',
        price: 10.99,
        quantity: 2,
        description: 'Description of Product A', // Added this line
        image: 'image1.jpg',
      },
      {
        id: 2,
        name: 'Product B',
        price: 20.99,
        quantity: 1,
        description: 'Description of Product B', // Added this line
        image: 'image2.jpg',
      },
    ],
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 102,
    products: [
      {
        id: 3,
        name: 'Product C',
        price: 5.49,
        quantity: 5,
        description: 'Description of Product C', // Added this line
        image: 'image3.jpg',
      },
    ],
    status: 'Completed',
    createdAt: new Date(),
  },
];

// Function to add orders to the database
const addOrders = () => {
  orders.forEach(order => {
    orderDB.insert(order, (err, newOrder) => {
      if (err) {
        console.error('Error adding order:', err);
      } else {
        console.log(`Order added with ID: ${newOrder.id}`);
      }
    });
  });
};

// Run the function
addOrders();