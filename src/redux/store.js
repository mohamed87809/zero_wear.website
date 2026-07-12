// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './features/productsSlice.js';
import cartReducer from './features/cartSlice.js';
import wishlistReducer from './features/wishlistSlice.js';
import uiReducer from './features/uiSlice.js';
import ordersReducer from './features/ordersSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    orders: ordersReducer,
  },
});