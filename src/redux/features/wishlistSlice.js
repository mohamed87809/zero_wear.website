// src/redux/features/wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'zw_wishlist';

function loadPersistedWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadPersistedWishlist(), // { id, name, price, image }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const { id, name, price, image } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === id);

      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push({ id, name, price, image });
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (state, id) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;