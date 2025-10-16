/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const AUTH_KEY = "isAuthenticated";

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem(AUTH_KEY) === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state) {
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_KEY, "true");
    },
    signUp(state) {
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_KEY, "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem(AUTH_KEY);
    },
  },
});

export const { signIn, signUp, logout } = authSlice.actions;
export default authSlice.reducer;
