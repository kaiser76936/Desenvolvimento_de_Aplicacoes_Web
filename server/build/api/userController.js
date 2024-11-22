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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const { id } = yield (0, database_1.addUser)({ name, email, password });
        res.status(201).json({ id, name, email });
    }
    catch (error) {
        res.status(500).send('Error creating user');
    }
}));
exports.userController = router;
