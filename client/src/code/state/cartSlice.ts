import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../../../server/src/models/product'; 

/**
 * Interface representing the state of the cart.
 */
interface CartState {
  products: Product[];
}

/**
 * Initial state for the cart slice.
 */
const initialState: CartState = {
  products: [],
};

/**
 * Async thunk for fetching cart items.
 *
 * @async
 * @function fetchCartItems
 * @returns {Promise<Product[]>} The fetched cart items.
 */
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await axios.get<Product[]>('/api/cart');
  const basePath = '../../images/'; 
  return response.data.map(product => ({
    ...product,
    image: product.image ? basePath + product.image : undefined,
  }));
});

/**
 * Slice for managing cart state.
 *
 * @module cartSlice
 * @requires @reduxjs/toolkit
 * @requires axios
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds a product to the cart.
     *
     * @function addToCart
     * @param {CartState} state - The current state of the cart.
     * @param {PayloadAction<Product>} action - The action containing the product to add.
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    /**
     * Removes a product from the cart.
     *
     * @function removeFromCart
     * @param {CartState} state - The current state of the cart.
     * @param {PayloadAction<number>} action - The action containing the ID of the product to remove.
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;