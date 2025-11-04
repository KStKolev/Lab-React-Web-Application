import { configureStore } from "@reduxjs/toolkit";
import { CART_ITEMS, AUTH_USER } from "@/constants/localStorage";
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
    localStorage.setItem(AUTH_USER, JSON.stringify(state.auth.user));
    const cartData = JSON.parse(JSON.stringify(state.cart));
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartData));
  } else {
    localStorage.removeItem(AUTH_USER);
    localStorage.removeItem(CART_ITEMS);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
