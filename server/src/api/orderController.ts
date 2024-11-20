import { Router } from 'express';

const router = Router();

// Define an interface for the order object
interface Order {
  id: number;
  product: string;
  quantity: number;
}

// Mock data for orders
const orders: Order[] = [];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// Create new order
router.post('/', (req, res) => {
  const newOrder: Order = { id: orders.length + 1, ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

export const orderController = router;