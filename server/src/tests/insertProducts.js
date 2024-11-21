const Datastore = require('nedb');
const path = require('path');

// Initialize NeDB for products
const productDB = new Datastore({
  filename: path.join(__dirname, '../../data/products.db'),
  autoload: true,
});

// Define the products to be added
const products = [
  { id: 1, name: 'BMW', price: 10000.00 },
  { id: 2, name: 'Baguete', price: 4.99 },
  { id: 3, name: 'Product C', price: 5.49 },
];

// Function to add products to the database
const addProducts = () => {
  products.forEach(product => {
    productDB.insert(product, (err, newProduct) => {
      if (err) {
        console.error('Error adding product:', err);
      } else {
        console.log(`Product added with ID: ${newProduct.id}`);
      }
    });
  });
};

// Run the function
addProducts();