// src/utils/localOrdersStorage.js

const STORAGE_KEY = 'zw_admin_orders';

function readOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/**
 * Creates a new order and persists it to localStorage.
 * Shape mirrors what a real backend order-creation endpoint would expect/return,
 * so this can later be swapped for services/orders.js's submitOrder() with
 * minimal changes at the call site.
 */
export function createOrder({ items, customerInfo, total }) {
  const orders = readOrders();

  const newOrder = {
    id: `ORD-${Date.now()}`,
    customerName: customerInfo.fullName,
    phone: customerInfo.phone,
    wilaya: customerInfo.wilaya,
    commune: customerInfo.commune,
    address: customerInfo.address,
    items,
    total,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder); // newest first
  writeOrders(orders);

  return newOrder;
}

/**
 * Returns all orders, newest first.
 */
export function getAllOrders() {
  return readOrders();
}

/**
 * Returns a single order by ID, or null if not found.
 */
export function getOrderById(id) {
  const orders = readOrders();
  return orders.find((order) => order.id === id) || null;
}

/**
 * Updates the status of a single order.
 * Valid statuses: 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Cancelled'
 */
export function updateOrderStatus(id, status) {
  const orders = readOrders();
  const updated = orders.map((order) =>
    order.id === id ? { ...order, status } : order
  );
  writeOrders(updated);
  return updated;
}

/**
 * Permanently removes an order from storage.
 */
export function deleteOrder(id) {
  const orders = readOrders();
  const updated = orders.filter((order) => order.id !== id);
  writeOrders(updated);
  return updated;
}

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};