"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = require("express");
const database_1 = require("../utils/database");
const router = (0, express_1.Router)();
// Get all users
router.get('/', (req, res) => {
    database_1.userDB.find({}, (err, users) => {
        if (err) {
            return res.status(500).send('Error fetching users');
        }
        res.json(users);
    });
});
// Get user by ID
router.get('/:id', (req, res) => {
    database_1.userDB.findOne({ id: parseInt(req.params.id) }, (err, user) => {
        if (err) {
            return res.status(500).send('Error fetching user');
        }
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send('User not found');
        }
    });
});
exports.userController = router;
