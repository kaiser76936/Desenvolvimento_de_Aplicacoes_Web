import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    // Add other product-related reducers if needed
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;