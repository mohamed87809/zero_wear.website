// src/redux/features/productsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products.js';

const initialState = {
  items: products,
  status: 'succeeded', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: 'All',
    searchTerm: '',
    sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setCategory, setSearchTerm, setSortBy, clearFilters } =
  productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;

export default productsSlice.reducer;