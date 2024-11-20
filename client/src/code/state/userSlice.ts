import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: '',
  isLoggedIn: false,
};

interface LoginPayload {
  email: string;
  password: string;
}

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