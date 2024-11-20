import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { productController } from './api/productController';
import { userController } from './api/userController';
import { orderController } from './api/orderController';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/products', productController);
app.use('/api/users', userController);
app.use('/api/orders', orderController);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the REST API Server');
});

// Export the app instance
export { app };