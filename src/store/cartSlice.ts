import { createSlice } from "@reduxjs/toolkit";
import { CartProductProps } from "@/interfaces/cartProduct";
import { CART_ITEMS } from "@/localStorage";
import { logout } from "./authSlice";

const storedCart = localStorage.getItem(CART_ITEMS);
const initialState: CartProductProps[] = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.productName === action.payload.productName);
      if (existingItem) {
        existingItem.amount += 1;
        return;
      }
      state.push(action.payload);
    },
    updateAmount: (state, action) => {
      const existingItem = state.find((item) => item.productName === action.payload.productName);
      if (existingItem) {
        existingItem.amount = action.payload.amount;
      }
    },
    removeSelectedItems: (state, action) => {
      return state.filter((item) => !action.payload.includes(item.productName));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return [];
    });
  },
});

export const { addToCart, updateAmount, removeSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
