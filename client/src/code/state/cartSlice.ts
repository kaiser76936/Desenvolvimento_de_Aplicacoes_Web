// CARTSLICE.TS
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../../../server/src/models/product'; 
import { Order } from '../../../../server/src/models/order';

/**
 * Interface representing a product with quantity.
 */
export interface ProductOrder extends Product {
    quantity: number;
}

/**
 * Interface representing the state of the cart.
 */
interface CartState {
    products: ProductOrder[];
    isCompleted: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

/**
 * Initial state for the cart slice.
 */
const initialState: CartState = {
    products: [],
    isCompleted: false,
    status: 'idle',
    error: null,
};

/**
 * Async thunk for submitting the order.
 */
export const submitOrder = createAsyncThunk(
    'cart/submitOrder',
    async (userId: number, { getState, rejectWithValue }) => {
        const state = getState() as { cart: CartState };
        const order: Omit<Order, 'id' | 'updatedAt'> = {
            userId,
            products: state.cart.products.map(product => ({
                ...product,
                quantity: product.quantity,
            })),
            status: 'Completed',
            createdAt: new Date(),
        };
        try {
            const response = await axios.post('/api/orders', order);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

/**
 * Async thunk for fetching cart items.
 */
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/cart');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

/**
 * Slice for managing cart state.
 */
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const existingProduct = state.products.find(product => product.id === action.payload);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.products = state.products.filter(product => product.id !== action.payload);
                }
            }
        },
        completeOrder: (state) => {
            state.isCompleted = true;
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isCompleted = true;
                state.products = [];
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
        builder
            .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<ProductOrder[]>) => {
                state.products = action.payload;
            });
    },
});

export const { addToCart, removeFromCart, completeOrder } = cartSlice.actions;
export default cartSlice.reducer;