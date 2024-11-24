import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the state of the user.
 */
interface UserState {
  email: string;
  isLoggedIn: boolean;
}

/**
 * Initial state for the user slice.
 * 
 * @type {UserState}
 */
const initialState: UserState = {
  email: '',
  isLoggedIn: false,
};

/**
 * Interface representing the payload for the login action.
 */
interface LoginPayload {
  email: string;
  password: string; 
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
    },
    logout: (state) => {
      state.email = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;