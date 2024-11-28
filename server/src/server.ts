import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { productController } from './api/productController';
import { userController } from './api/userController';
import { orderController } from './api/orderController';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ 
  origin: 'http://localhost:9000',
}));

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, '../images')));

// Routes
app.use('/api/products', productController);
app.use('/api/users', userController);
app.use('/api/orders', orderController);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the REST API Server');
});

export { app };