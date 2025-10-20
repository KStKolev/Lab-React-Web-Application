/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user?: {
    username: string;
    password: string;
    profileDescription: string;
    profilePicture: string;
  } | null;
}

const AUTH_USER = "currentUser";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(AUTH_USER) || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      localStorage.setItem(AUTH_USER, JSON.stringify(action.payload));
      state.user = action.payload;
    },
    signUp(state, action) {
      localStorage.setItem(AUTH_USER, JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem(AUTH_USER);
      state.user = null;
    },
    updateUser(state, action) {
      localStorage.setItem(AUTH_USER, JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { signIn, signUp, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
