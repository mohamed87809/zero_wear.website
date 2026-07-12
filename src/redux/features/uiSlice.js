// src/redux/features/uiSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  activeModal: null, // null | 'quickView' | 'sizeGuide' | ...
  modalPayload: null,
  isGlobalLoading: false,
  toast: {
    message: '',
    type: 'success', // 'success' | 'error' | 'info'
    isVisible: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload.name;
      state.modalPayload = action.payload.data ?? null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalPayload = null;
    },
    setGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'success',
        isVisible: true,
      };
    },
    hideToast: (state) => {
      state.toast.isVisible = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleCartDrawer,
  openCartDrawer,
  closeCartDrawer,
  openModal,
  closeModal,
  setGlobalLoading,
  showToast,
  hideToast,
} = uiSlice.actions;

// Selectors
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectIsCartDrawerOpen = (state) => state.ui.isCartDrawerOpen;
export const selectActiveModal = (state) => state.ui.activeModal;
export const selectModalPayload = (state) => state.ui.modalPayload;
export const selectIsGlobalLoading = (state) => state.ui.isGlobalLoading;
export const selectToast = (state) => state.ui.toast;

export default uiSlice.reducer;