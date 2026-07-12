// src/services/orders.js

import api from './api.js';

/**
 * Submits a new order to the backend.
 * Expects the same shape ordersSlice.js's placeOrder reducer already builds:
 * { items, customerInfo, total }
 *
 * NOTE: No backend is currently connected. Until one exists, order placement
 * is handled entirely client-side via Redux (see ordersSlice.js / Checkout.jsx).
 * This function is ready to be wired in once a real API is available —
 * callers should wrap it in try/catch and fall back to local state on failure.
 */
export async function submitOrder(orderPayload) {
  return api.post('/orders', orderPayload);
}

/**
 * Fetches a single order by its ID from the backend.
 * Useful for a future "track your order" page or refreshing order status
 * after a page reload (since Redux state does not persist across reloads).
 */
export async function fetchOrderById(orderId) {
  return api.get(`/orders/${orderId}`);
}

/**
 * Fetches order history for a given phone number.
 * There is currently no user account/login system in this app, so phone
 * number (collected at checkout via customerInfo.phone) is the most natural
 * identifier available for a future "my orders" lookup feature.
 */
export async function fetchOrderHistory(phone) {
  return api.get(`/orders?phone=${encodeURIComponent(phone)}`);
}

export default {
  submitOrder,
  fetchOrderById,
  fetchOrderHistory,
};