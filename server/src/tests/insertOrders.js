const Datastore = require('nedb');
const path = require('path');

// Initialize NeDB for orders
const orderDB = new Datastore({
  filename: path.join(__dirname, '../../data/orders.db'),
  autoload: true,
});

// Define the orders to be added
const orders = [
  { id: 1, name: 'Baguete', price: 4.99 },
  { id: 2, name: 'BMW', price: 10000.00 },
  { id: 3, name: 'order C', price: 5.49 },
];

// Function to add orders to the database
const addorders = () => {
  orders.forEach(order => {
    orderDB.insert(order, (err, neworder) => {
      if (err) {
        console.error('Error adding order:', err);
      } else {
        console.log(`order added with ID: ${neworder.id}`);
      }
    });
  });
};

// Run the function
addorders();