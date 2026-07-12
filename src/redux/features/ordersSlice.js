// src/redux/features/ordersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialCustomerInfo = {
  fullName: '',
  phone: '',
  wilaya: '',
  commune: '',
  address: '',
};

const initialState = {
  customerInfo: initialCustomerInfo,
  currentOrder: null, // { id, items, customerInfo, total, createdAt, status }
  orderHistory: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    resetCustomerInfo: (state) => {
      state.customerInfo = initialCustomerInfo;
    },
    placeOrder: (state, action) => {
      const { items, customerInfo, total } = action.payload;

      const newOrder = {
        id: `ORD-${Date.now()}`,
        items,
        customerInfo,
        total,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      state.currentOrder = newOrder;
      state.orderHistory.push(newOrder);
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  setCustomerInfo,
  resetCustomerInfo,
  placeOrder,
  clearCurrentOrder,
} = ordersSlice.actions;

// Selectors
export const selectCustomerInfo = (state) => state.orders.customerInfo;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderHistory = (state) => state.orders.orderHistory;

export default ordersSlice.reducer;