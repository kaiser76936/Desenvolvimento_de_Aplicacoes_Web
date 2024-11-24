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
// Get all orders
router.get('/', (req, res) => {
    database_1.orderDB.find({}, (err, orders) => {
        if (err) {
            return res.status(500).send('Error fetching orders');
        }
        res.json(orders);
    });
});
// Get order by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    database_1.orderDB.findOne({ id }, (err, order) => {
        if (err) {
            return res.status(500).send('Error fetching order');
        }
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).send('Order not found');
        }
    });
});
// Add a new order
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, products, status } = req.body;
        const createdAt = new Date(); // Capture the current date and time for order creation
        const { id } = yield (0, database_1.addOrder)({ userId, products, status, createdAt });
        res.status(201).json({ id, userId, products, status, createdAt });
    }
    catch (error) {
        res.status(500).send('Error creating order');
    }
}));
// Update an existing order (e.g., status change)
router.put('/:id', (req, res) => {
    const { status, products } = req.body;
    const id = parseInt(req.params.id);
    const updatedAt = new Date(); // Update the updatedAt field on order update
    database_1.orderDB.update({ id }, { $set: { status, products, updatedAt } }, {}, (err, numReplaced) => {
        if (err) {
            return res.status(500).send('Error updating order');
        }
        if (numReplaced) {
            res.json({ id, status, products, updatedAt });
        }
        else {
            res.status(404).send('Order not found');
        }
    });
});
// Delete an order
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const success = yield (0, database_1.removeOrder)(id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Order not found');
        }
    }
    catch (error) {
        res.status(500).send('Error deleting order');
    }
}));
exports.orderController = router;
