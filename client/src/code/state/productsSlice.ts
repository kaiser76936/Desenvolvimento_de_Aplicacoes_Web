import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../../../server/src/models/product'; 

/**
 * Interface representing the state of the products.
 */
interface ProductsState {
  products: Product[];
}

/**
 * Initial state for the products slice.
 * 
 * @type {ProductsState}
 */
const initialState: ProductsState = {
  products: [],
};

const SERVER_URL = 'http://localhost:3000';

/**
 * Async thunk for fetching products.
 * 
 * @async
 * @function fetchProducts
 * @returns {Promise<Product[]>} The fetched products.
 */
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>(`${SERVER_URL}/api/products`);
  const basePath = `${SERVER_URL}/images/`; 
  return response.data.map(product => ({
    ...product,
    image: product.image ? basePath + product.image : undefined, 
  }));
});

/**
 * Slice for managing products state.
 * 
 * @module productsSlice
 * @requires @reduxjs/toolkit
 * @requires axios
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    });
  },
});

export default productsSlice.reducer;