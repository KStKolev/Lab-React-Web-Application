import { configureStore } from "@reduxjs/toolkit";
import { cartItems, authUser } from "@/constants/localStorage";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  if (state.auth.user) {
    localStorage.setItem(authUser, JSON.stringify(state.auth.user));
    const cartData = JSON.parse(JSON.stringify(state.cart));
    localStorage.setItem(cartItems, JSON.stringify(cartData));
  } else {
    localStorage.removeItem(authUser);
    localStorage.removeItem(cartItems);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
