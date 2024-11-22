import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';

/**
 * Interface representing the state of the cart.
 */
interface CartState {
  items: Product[];
}

/**
 * Initial state for the cart slice.
 * 
 * @type {CartState}
 */
const initialState: CartState = {
  items: [],
};

/**
 * Slice for managing cart state.
 * 
 * @module cartSlice
 * @requires @reduxjs/toolkit
 * @requires ../../models/Product
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Action to add a product to the cart.
     * 
     * @param {CartState} state - The current state of the cart.
     * @param {PayloadAction<Product>} action - The action payload containing the product to add.
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    /**
     * Action to remove a product from the cart.
     * 
     * @param {CartState} state - The current state of the cart.
     * @param {PayloadAction<number>} action - The action payload containing the id of the product to remove.
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;