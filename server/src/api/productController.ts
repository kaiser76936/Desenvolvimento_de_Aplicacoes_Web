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

// Create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Error adding product');
  }
});

// Remove a product
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const success = await removeProduct(id);
    if (success) {
      res.status(200).send('Product removed');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send('Error removing product');
  }
});

export const productController = router;