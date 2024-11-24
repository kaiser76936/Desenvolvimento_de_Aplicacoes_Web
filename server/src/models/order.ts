export interface Order {
    id: number;                    // Unique identifier for the order
    userId: number;               // ID of the user who placed the order
    products: ProductOrder[];     // Array of products included in the order
    status: string;               // Order status (e.g., 'pending', 'completed', 'shipped', etc.)
    createdAt: Date;              // Timestamp for when the order was placed
    updatedAt?: Date;             // Timestamp for when the order was last updated (optional)
}

export interface ProductOrder {
    productId: number;            // ID of the product
    quantity: number;             // Quantity of the product ordered
    price: number;                // Price at the time of order (to lock the price in case it changes later)
}
