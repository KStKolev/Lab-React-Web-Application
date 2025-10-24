/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AUTH_USER } from "@/localStorage";

interface AuthState {
  user?: {
    username: string;
    password: string;
    profileDescription: string;
    profilePicture: string;
  } | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(AUTH_USER) || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload;
    },
    signUp(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { signIn, signUp, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
