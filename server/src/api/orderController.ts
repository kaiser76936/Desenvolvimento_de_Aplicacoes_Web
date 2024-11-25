import { Router, Request, Response } from 'express';
import { orderDB, addOrder, removeOrder, updateOrder, productDB } from '../utils/database';
import { Order, ProductOrder } from '../models/order';
import { Product } from '../models/product';

const router = Router();

/**
 * Populates product details for each product order.
 * @param {ProductOrder[]} products - Array of product orders.
 * @returns {Promise<ProductOrder[]>} - Promise resolving to array of populated product orders.
 */
const populateProducts = async (products: ProductOrder[]): Promise<ProductOrder[]> => {
    return Promise.all(products.map(async (productOrder) => {
        return new Promise<ProductOrder>((resolve, reject) => {
            productDB.findOne({ id: productOrder.id }, (err: Error | null, product: Product | null) => {
                if (err || !product) {
                    reject(err || new Error('Product not found'));
                } else {
                    resolve({
                        ...productOrder,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                    });
                }
            });
        });
    }));
};

/**
 * Retrieves all orders from the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/', async (req, res) => {
    orderDB.find({}, async (err: Error | null, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
        try {
            const populatedOrders = await Promise.all(orders.map(async (order) => ({
                ...order,
                products: await populateProducts(order.products),
            })));
            res.json(populatedOrders);
        } catch (populateError) {
            res.status(500).json({ error: 'Failed to populate products' });
        }
    });
});

/**
 * Adds an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/', async (req, res) => {
    const { userId, products, status } = req.body;
    try {
        const newOrder = await addOrder({
            userId,
            products,
            status,
            createdAt: new Date(),
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add order' });
    }
});

/**
 * Updates an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.put('/:id', async (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const updates: Partial<Order> = req.body;
    try {
        const success = await updateOrder(orderId, updates);
        if (success) {
            res.json({ message: 'Order updated successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

/**
 * Removes an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.delete('/:id', async (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    try {
        const success = await removeOrder(orderId);
        if (success) {
            res.json({ message: 'Order removed successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove order' });
    }
});

/**
 * Retrieves all orders for a specific user.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/user/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    orderDB.find({ userId }, async (err: Error | null, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
        try {
            const populatedOrders = await Promise.all(orders.map(async (order) => ({
                ...order,
                products: await populateProducts(order.products),
            })));
            res.json(populatedOrders);
        } catch (populateError) {
            res.status(500).json({ error: 'Failed to populate products' });
        }
    });
});

export  const orderController = router;