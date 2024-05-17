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
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id + item.baseId !== action.payload.id + action.payload.baseId
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id + item.baseId === action.payload.id + action.payload.baseId
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id + item.baseId === action.payload.id + action.payload.baseId);
      if (item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.id + item.baseId !== action.payload.id + action.payload.baseId
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
    },
    cleanCart:(state) => {
      state.cart = [];
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
