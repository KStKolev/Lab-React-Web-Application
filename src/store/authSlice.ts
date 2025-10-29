/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AUTH_USER } from "@/constants/localStorage";

interface AuthState {
  user?: {
    username: string;
    password: string;
    profileDescription: string;
    profilePicture: string;
    authority: "user" | "admin";
  } | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(AUTH_USER) || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
