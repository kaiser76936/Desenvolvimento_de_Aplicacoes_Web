import { Router } from 'express';
import { productDB, addProduct, removeProduct } from '../utils/database';
import { Product } from '../models/product';

const router = Router();

/**
 * Retrieve all products from the database.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.get('/', (req, res) => {
  productDB.find({}, (err: Error | null, products: Product[]) => {
    if (err) {
      return res.status(500).send('Error fetching products');
    }
    res.json(products);
  });
});

/**
 * Retrieve a single product by its ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
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

/**
 * Add a new product to the database.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.post('/', async (req, res) => {
  try {
      const { name, price, description, image } = req.body; 
      const { id } = await addProduct({ name, price, description, image }); 
      res.status(201).json({ id, name, price, description, image }); 
  } catch (error) {
      res.status(500).send('Error creating product');
  }
});

export const productController = router;