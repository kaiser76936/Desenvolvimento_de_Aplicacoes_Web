"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productController_1 = require("./api/productController");
const userController_1 = require("./api/userController");
const orderController_1 = require("./api/orderController");
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use('/api/products', productController_1.productController);
app.use('/api/users', userController_1.userController);
app.use('/api/orders', orderController_1.orderController);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API Server');
});
