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
exports.productController = void 0;
const express_1 = require("express");
const database_1 = require("../utils/database");
const router = (0, express_1.Router)();
// Get all products
router.get('/', (req, res) => {
    database_1.productDB.find({}, (err, products) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(products);
    });
});
// Get product by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    database_1.productDB.findOne({ id }, (err, product) => {
        if (err) {
            return res.status(500).send('Error fetching product');
        }
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).send('Product not found');
        }
    });
});
// Create new product
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield (0, database_1.addProduct)(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).send('Error adding product');
    }
}));
// Remove a product
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const success = yield (0, database_1.removeProduct)(id);
        if (success) {
            res.status(200).send('Product removed');
        }
        else {
            res.status(404).send('Product not found');
        }
    }
    catch (error) {
        res.status(500).send('Error removing product');
    }
}));
exports.productController = router;
