const Datastore = require('nedb');
const path = require('path');

// Initialize NeDB for products
const productDB = new Datastore({
  filename: path.join(__dirname, '../../data/products.db'),
  autoload: true,
});

// Define the products to be added
const products = [
  {
    id: 1,
    name: 'Product A',
    price: 10.99,
    description: 'Description of Product A', // Added this line
    image: 'image1.png',
  },
  {
    id: 2,
    name: 'Product B',
    price: 20.99,
    description: 'Description of Product B', // Added this line
    image: 'image2.jpg',
  },
  {
    id: 3,
    name: 'Product C',
    price: 5.49,
    description: 'Description of Product C', // Added this line
    image: 'image3.jpg',
  },
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