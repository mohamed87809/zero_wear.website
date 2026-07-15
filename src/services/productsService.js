// src/services/productsService.js
//
// Firestore-backed products service. Mirrors the function names and
// return shapes already used by src/utils/localProductsStorage.js, so
// that when the app is later switched over, call sites in Redux/pages
// change from localProductsStorage imports to productsService imports
// with minimal rewrites (mainly adding async/await).
//
// NOT YET CONNECTED to Redux or any page — this file is standalone
// until a later migration step wires it in.


import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db , auth } from '../firebase/firebase.js';

const PRODUCTS_COLLECTION = 'products';

/**
 * Fetches all products from Firestore.
 */
export async function getProducts() {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Fetches a single product by its Firestore document ID.
 * Returns null if it doesn't exist.
 */
export async function getProduct(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Creates a new product document in Firestore.
 * Firestore auto-generates the document ID (unlike the localStorage
 * version, which generated `zw-${Date.now()}` client-side).
 */
export async function createProduct(productData) {
  console.log("Current User:", auth.currentUser);
  const payload = {
    isFeatured: false,
    rating: 0,
    reviewsCount: 0,
    tags: [],
    images: [],
    sizes: [],
    colors: [],
    ...productData,
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
}

/**
 * Updates an existing product with partial data.
 */
export async function updateProduct(id, updates) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, updates);
  return getProduct(id);
}

/**
 * Permanently deletes a product document.
 */
export async function deleteProduct(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};