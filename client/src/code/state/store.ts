import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice'; 

/**
 * Configures the Redux store with the specified reducers.
 * 
 * @module store
 * @requires @reduxjs/toolkit
 * @requires ./userSlice
 * @requires ./cartSlice
 * @requires ./productsSlice
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer, 
  },
});

/**
 * Type representing the root state of the Redux store.
 * 
 * @typedef {Object} RootState
 * @property {ReturnType<typeof store.getState>} state - The root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function of the Redux store.
 * 
 * @typedef {Function} AppDispatch
 * @property {typeof store.dispatch} dispatch - The dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;