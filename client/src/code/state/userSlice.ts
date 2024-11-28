import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the state of the user.
 */
interface UserState {
  email: string;
  isLoggedIn: boolean;
  userId: number | null;
}

/**
 * Initial state for the user slice.
 * 
 * @type {UserState}
 */
const initialState: UserState = {
  email: '',
  isLoggedIn: false,
  userId: null,
};

/**
 * Interface representing the payload for the login action.
 */
interface LoginPayload {
  email: string;
  password: string;
  userId: number | null;
}

/**
 * Slice for managing user state.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.userId = action.payload.userId; 
      console.log('User logged in:', state.userId);
    },
    logout: (state) => {
      state.email = '';
      state.isLoggedIn = false;
      state.userId = null;
      console.log('User logged out');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;