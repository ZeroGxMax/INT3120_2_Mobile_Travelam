import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id + item.baseId === action.payload.id + action.payload.baseId
      );
      if (!itemPresent) {
        state.cart.push({ ...action.payload});
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id + item.baseId !== action.payload.id + action.payload.baseId
      );
      state.cart = removeItem;
    },
    cleanCart:(state) => {
      state.cart = [];
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
