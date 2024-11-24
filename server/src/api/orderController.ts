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

// Add a new order
router.post('/', async (req, res) => {
    try {
        const { userId, products, status } = req.body;
        const createdAt = new Date(); // Capture the current date and time for order creation
        const { id } = await addOrder({ userId, products, status, createdAt });
        res.status(201).json({ id, userId, products, status, createdAt });
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

// Update an existing order (e.g., status change)
router.put('/:id', (req, res) => {
    const { status, products } = req.body;
    const id = parseInt(req.params.id);
    const updatedAt = new Date(); // Update the updatedAt field on order update
    orderDB.update({ id }, { $set: { status, products, updatedAt } }, {}, (err, numReplaced) => {
        if (err) {
            return res.status(500).send('Error updating order');
        }
        if (numReplaced) {
            res.json({ id, status, products, updatedAt });
        } else {
            res.status(404).send('Order not found');
        }
    });
});

// Delete an order
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const success = await removeOrder(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting order');
    }
});

export const orderController = router;
