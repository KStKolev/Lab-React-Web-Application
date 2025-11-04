import { createSlice } from "@reduxjs/toolkit";
import { cartItems } from "@/constants/localStorage";
import { CartProductProps } from "@/interfaces/cartProduct";
import { logout } from "./authSlice";

const storedCart = localStorage.getItem(cartItems);
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
    updateProductInCart: (state, action) => {
      const { oldTitle, newTitle, price, platforms } = action.payload;
      const existingItem = state.find((item) => item.productName === oldTitle);
      if (existingItem) {
        existingItem.productName = newTitle;
        existingItem.price = price;
        existingItem.platforms = platforms;
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

export const { addToCart, updateAmount, updateProductInCart, removeSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
