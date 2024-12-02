//NOT UPDATED
const { addProduct } = require('../utils/database');

// Define the products to be added
const products = [
  {
    id: 1,
    name: 'admin',
    password: '',
    email: 'admin@ualg.pt',
  },
];

// Function to add products to the database
const insertProducts = async () => {
  for (const product of products) {
    try {
      const result = await addProduct(product);
      console.log(`Product added with ID: ${result.id}`);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  }
};

// Run the function
insertProducts();