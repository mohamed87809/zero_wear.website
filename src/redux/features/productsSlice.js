// src/redux/features/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts,
  createProduct,
  updateProduct as updateProductInFirestore,
  deleteProduct as deleteProductInFirestore,
} from '../../services/productsService.js';

/**
 * Fetches all products from Firestore.
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load products.');
    }
  }
);

/**
 * Creates a new product in Firestore.
 */
export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product.');
    }
  }
);

/**
 * Updates an existing product in Firestore.
 * Payload: { id, updates }
 */
export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      return await updateProductInFirestore(id, updates);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product.');
    }
  }
);

/**
 * Deletes a product from Firestore.
 */
export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductInFirestore(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product.');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  // Separate status/error for create/update/delete mutations, so a failed
  // mutation doesn't get confused with a failed initial fetch.
  mutationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  mutationError: null,

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
    clearMutationError: (state) => {
      state.mutationError = null;
      state.mutationStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load products.';
      })

      // Create product
      .addCase(createProductThunk.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError = action.payload || 'Failed to create product.';
      })

      // Update product
      .addCase(updateProductThunk.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError = action.payload || 'Failed to update product.';
      })

      // Delete product
      .addCase(deleteProductThunk.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError = action.payload || 'Failed to delete product.';
      });
  },
});

export const {
  setCategory,
  setSearchTerm,
  setSortBy,
  clearFilters,
  clearMutationError,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsMutationStatus = (state) =>
  state.products.mutationStatus;
export const selectProductsMutationError = (state) =>
  state.products.mutationError;
export const selectFilters = (state) => state.products.filters;

export default productsSlice.reducer;