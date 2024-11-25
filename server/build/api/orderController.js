"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const express_1 = require("express");
const database_1 = require("../utils/database");
const router = (0, express_1.Router)();
/**
 * Populates product details for each product order.
 * @param {ProductOrder[]} products - Array of product orders.
 * @returns {Promise<ProductOrder[]>} - Promise resolving to array of populated product orders.
 */
const populateProducts = (products) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all(products.map((productOrder) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            database_1.productDB.findOne({ id: productOrder.id }, (err, product) => {
                if (err || !product) {
                    reject(err || new Error('Product not found'));
                }
                else {
                    resolve(Object.assign(Object.assign({}, productOrder), { name: product.name, price: product.price, image: product.image, description: product.description }));
                }
            });
        });
    })));
});
/**
 * Retrieves all orders from the database.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.orderDB.find({}, (err, orders) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
        try {
            const populatedOrders = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, order), { products: yield populateProducts(order.products) }));
            })));
            res.json(populatedOrders);
        }
        catch (populateError) {
            res.status(500).json({ error: 'Failed to populate products' });
        }
    }));
}));
/**
 * Adds an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, products, status } = req.body;
    try {
        const newOrder = yield (0, database_1.addOrder)({
            userId,
            products,
            status,
            createdAt: new Date(),
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add order' });
    }
}));
/**
 * Updates an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id, 10);
    const updates = req.body;
    try {
        const success = yield (0, database_1.updateOrder)(orderId, updates);
        if (success) {
            res.json({ message: 'Order updated successfully' });
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
}));
/**
 * Removes an order by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id, 10);
    try {
        const success = yield (0, database_1.removeOrder)(orderId);
        if (success) {
            res.json({ message: 'Order removed successfully' });
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove order' });
    }
}));
/**
 * Retrieves all orders for a specific user.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/user/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10);
    database_1.orderDB.find({ userId }, (err, orders) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
        try {
            const populatedOrders = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, order), { products: yield populateProducts(order.products) }));
            })));
            res.json(populatedOrders);
        }
        catch (populateError) {
            res.status(500).json({ error: 'Failed to populate products' });
        }
    }));
}));
exports.orderController = router;
