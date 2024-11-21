import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product properties if needed
}

// Define the ProductsState interface
interface ProductsState {
  products: Product[];
}

// Define the initial state using the ProductsState interface
const initialState: ProductsState = {
  products: [],
};

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>('/api/products');
  return response.data;
});

// Create a slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    // Add other product-related reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    });
  },
});

// Export the setProducts action and the reducer
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;