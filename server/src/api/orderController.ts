import { Router } from 'express';
import { orderDB, addOrder, removeOrder } from '../utils/database';
import { Order } from '../models/order';

const router = Router();

// Get all orders
router.get('/', (req, res) => {
  orderDB.find({}, (err: Error | null, orders: Order[]) => {
    if (err) {
      return res.status(500).send('Error fetching orders');
    }
    res.json(orders);
  });
});

// Get order by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  orderDB.findOne({ id }, (err: Error | null, order: Order | null) => {
    if (err) {
      return res.status(500).send('Error fetching order');
    }
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  });
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const { id } = await addOrder({ product, quantity });
    res.status(201).json({ id, product, quantity });
  } catch (error) {
    res.status(500).send('Error creating order');
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await removeOrder(id);
    if (success) {
      res.status(200).send('Order deleted');
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting order');
  }
});

export const orderController = router;