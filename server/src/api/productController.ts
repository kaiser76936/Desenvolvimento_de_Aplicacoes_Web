import { Router } from 'express';
import { productDB, addProduct, removeProduct } from '../utils/database';
import { Product } from '../models/product';

const router = Router();

// Get all products
router.get('/', (req, res) => {
  productDB.find({}, (err: Error | null, products: Product[]) => {
    if (err) {
      return res.status(500).send('Error fetching products');
    }
    res.json(products);
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  productDB.findOne({ id }, (err: Error | null, product: Product | null) => {
    if (err) {
      return res.status(500).send('Error fetching product');
    }
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  });
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, image } = req.body; // Include image
    const { id } = await addProduct({ name, price, image }); // Pass image to addProduct
    res.status(201).json({ id, name, price, image });
  } catch (error) {
    res.status(500).send('Error creating product');
  }
});

export const productController = router;