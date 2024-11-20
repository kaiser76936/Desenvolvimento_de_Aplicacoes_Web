"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
// Mock data for orders
const orders = [];
// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});
// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).send('Order not found');
    }
});
// Create new order
router.post('/', (req, res) => {
    const newOrder = Object.assign({ id: orders.length + 1 }, req.body);
    orders.push(newOrder);
    res.status(201).json(newOrder);
});
exports.orderController = router;
