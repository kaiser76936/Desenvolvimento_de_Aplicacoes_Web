import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../../../server/src/models/order';

/**
 * Interface representing the state of the orders.
 */
interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

/**
 * Initial state for the orders slice.
 */
const initialState: OrdersState = {
  orders: [],
  status: 'idle',
  error: null,
};

/**
 * Async thunk for fetching user orders.
 */
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orders/user/${userId}`);
      console.log('API response:', response.data); 
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch orders');
    }
  }
);

/**
 * Slice for managing orders state.
 */
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
