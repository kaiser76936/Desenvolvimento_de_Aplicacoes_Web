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
/**
 * Retrieve all products from the database.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.get('/', (req, res) => {
    database_1.productDB.find({}, (err, products) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(products);
    });
});
/**
 * Retrieve a single product by its ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
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
/**
 * Add a new product to the database.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image } = req.body;
        const { id } = yield (0, database_1.addProduct)({ name, price, image });
        res.status(201).json({ id, name, price, image });
    }
    catch (error) {
        res.status(500).send('Error creating product');
    }
}));
exports.productController = router;
