import cors from 'cors';
import path from 'path';
import { productController } from './api/productController';
import { userController } from './api/userController';
import { orderController } from './api/orderController';
import express from 'express';
import bodyParser from 'body-parser';

/**
 * Initializes the Express application.
 */
const app = express();

/**
 * The port number on which the server will listen.
 * Defaults to the value of the PORT environment variable or 3000.
 */
const port = process.env.PORT || 3000;

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(bodyParser.json());

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * Allows requests from 'http://localhost:9000'.
 */
app.use(cors({ 
  origin: 'http://localhost:9000',
}));

/**
 * Serves static files from the 'images' directory.
 */
app.use('/images', express.static(path.join(__dirname, '../images')));

/**
 * Routes for product-related API endpoints.
 */
app.use('/api/products', productController);

/**
 * Routes for user-related API endpoints.
 */
app.use('/api/users', userController);

/**
 * Routes for order-related API endpoints.
 */
app.use('/api/orders', orderController);

/**
 * Root route that sends a welcome message.
 */
app.get('/', (req, res) => {
  res.send('Welcome to the REST API Server');
});

/**
 * Starts the server and listens on the specified port.
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };