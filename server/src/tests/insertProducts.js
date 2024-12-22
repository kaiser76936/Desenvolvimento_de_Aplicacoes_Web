const Datastore = require('nedb');
const path = require('path');

/**
 * Initializes NeDB datastore for products.
 * @type {Datastore}
 */
const productDB = new Datastore({
  filename: path.join(__dirname, '../../data/products.db'),
  autoload: true,
});

/**
 * Represents a product.
 * @typedef {Object} Product
 * @property {number} id - Unique identifier for the product.
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Description of the product.
 * @property {string} image - Image filename for the product.
 */

/**
 * Array of products to be added.
 * @type {Product[]}
 */
const products = [
  {
    id: 1,
    name: 'Indian FTR 1200',
    price: 11990,
    description: 'The Indian FTR 1200 combines racing-inspired design with a powerful 1203cc V-twin engine, offering premium performance and style.',
    image: 'Indian_FT_1200.jpg',
  },
  {
    id: 2,
    name: 'Kawasaki Z900RS',
    price: 13000,
    description: 'The Kawasaki Z900RS blends retro styling with modern performance, featuring a 948cc inline-four engine and classic design details.',
    image: 'Kawasaki_Z900RS.jpg',
  },
  {
    id: 3,
    name: 'Moto Guzzi V7', 
    price: 9190,
    description: 'The Moto Guzzi V7 is a timeless classic, offering a 744cc V-twin engine, iconic design, and a smooth, enjoyable ride.',
    image: 'Moto_Guzzi_V7.jpg',
  },
  {
    id: 4,
    name: 'Triumph Trident',
    price: 7500,
    description: 'The Triumph Trident is a sleek roadster with a 660cc triple engine, delivering dynamic performance and modern style.',
    image: 'Triumph_Trident.jpg', 
  },  
  {
    id: 5,
    name: 'Vitpilen 701',
    price: 9499,
    description: 'The Vitpilen 701 is a minimalist café racer with a 692cc single-cylinder engine, offering sharp performance and striking design.',
    image: 'Vitpilen_701.jpg' 
  },
  {
    id: 6,
    name: 'CBR1000RR-R Fireblade SP 2024',
    price: 270000,
    description: 'The CBR1000RR-R Fireblade SP 2024 is a high-performance superbike with a 999cc inline-four engine, offering exceptional power and handling.',
    image: 'CBR1000RR-R_Fireblade_SP_2024.jpg' 
  },
  {
    id: 7,
    name: 'MV Agusta F4 Tamburini',
    price: 52000,
    description: 'The MV Agusta F4 Tamburini is a limited-edition superbike with a 998cc inline-four engine, offering stunning design and track-ready performance.',
    image: 'MV-AGUSTA_F4-1000-Tamburini-2005.jpg' 
  },
  {
    id: 8,
    name: 'Kawasaki z900rs Cafe',
    price: 13395,
    description: 'The Kawasaki Z900RS Cafe is a retro-styled café racer with a 948cc inline-four engine, offering modern performance and classic design.',
    image: 'Kawasaki_z900rs_Cafe.png' 
  },
  {
    id: 9,
    name: 'Triumph_Bonneville_Bobber',
    price: 16000,
    description: 'The Triumph Bonneville Bobber is a stylish cruiser with a 1200cc parallel-twin engine, offering classic design and a comfortable ride.',
    image: 'Triumph_Bonneville_Bobber.jpg' 
  },
{
    id: 10,
    name: 'Harley Dyna Lowrider',
    price: 23600,
    description: 'The Harley Dyna Lowrider is a stylish cruiser with a 1200cc parallel-twin engine, offering classic design and a comfortable ride.',
    image: 'Harley_Dyna_Lowrider.png' 
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