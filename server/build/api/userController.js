"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
// Mock data
const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
];
// Get all users
router.get('/', (req, res) => {
    res.json(users);
});
// Get user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
});
// Create new user
router.post('/', (req, res) => {
    const newUser = Object.assign({ id: users.length + 1 }, req.body);
    users.push(newUser);
    res.status(201).json(newUser);
});
exports.userController = router;
