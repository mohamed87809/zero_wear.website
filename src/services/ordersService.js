// src/services/ordersService.js
//
// Firestore-backed orders service. Mirrors src/utils/localOrdersStorage.js's
// function names/shapes for a smooth future migration. Not yet connected
// to Checkout.jsx or the Admin Dashboard — standalone until wired in later.

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

import { db } from '../firebase/firebase.js';

const ORDERS_COLLECTION = 'orders';

/**
 * Fetches all orders from Firestore, newest first.
 */
export async function getOrders() {
  const ordersQuery = query(
    collection(db, ORDERS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Fetches a single order by its Firestore document ID.
 * Returns null if it doesn't exist.
 */
export async function getOrder(id) {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Creates a new order document in Firestore.
 * Expects the same shape localOrdersStorage.js's createOrder() accepts:
 * { items, customerInfo, total }
 */
export async function createOrder({ items, customerInfo, total }) {
  const payload = {
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

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
}

/**
 * Updates the status of a single order.
 * Valid statuses: 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Cancelled'
 */
export async function updateOrderStatus(id, status) {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, { status });
  return getOrder(id);
}

/**
 * Permanently deletes an order document.
 */
export async function deleteOrder(id) {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await deleteDoc(docRef);
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};