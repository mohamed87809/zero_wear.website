// src/redux/features/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, name, price, image, size, color, quantity }
};

const findLineItemIndex = (items, { id, size, color }) =>
  items.findIndex(
    (item) => item.id === id && item.size === size && item.color === color
  );

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, size, color, quantity = 1 } =
        action.payload;

      const existingIndex = findLineItemIndex(state.items, { id, size, color });

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ id, name, price, image, size, color, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      );
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const index = findLineItemIndex(state.items, { id, size, color });

      if (index !== -1) {
        state.items[index].quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;