// src/utils/localProductsStorage.js
//
// Canonical product data service. This is the ONLY module in the app that
// should ever import src/data/products.js. Redux (productsSlice), every
// storefront page, and the Admin Dashboard all read/write products
// exclusively through the functions exported here.
//
// FUTURE BACKEND MIGRATION (e.g. Firebase, or a real REST/GraphQL API):
// Only this file needs to change. Every exported function keeps its name
// and return shape; only the internals swap from localStorage to async
// SDK/API calls. Consumers would only need `await` added at call sites.

import { products as seedProducts } from '../data/products.js';

const STORAGE_KEY = 'zw_products';

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeRaw(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Seeds localStorage from data/products.js — but only if localStorage has
 * no product data yet. Safe to call repeatedly; it's a no-op after the
 * first successful seed.
 */
export function initializeProducts() {
  const existing = readRaw();
  if (existing === null) {
    writeRaw(seedProducts);
    return seedProducts;
  }
  return existing;
}

/**
 * Returns all products from localStorage, seeding on first-ever call.
 * This is the single read path every consumer in the app should use.
 */
export function getAllProducts() {
  const existing = readRaw();
  if (existing !== null) return existing;
  return initializeProducts();
}

/**
 * Returns a single product by ID, or null if not found.
 */
export function getProductById(id) {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
}

/**
 * Adds a new product to storage.
 * FUTURE BACKEND MIGRATION: replace with a POST /products call;
 * the server would generate the id instead of the client.
 */
export function addProduct(productData) {
  const products = getAllProducts();

  const newProduct = {
    id: `zw-${Date.now()}`,
    isFeatured: false,
    rating: 0,
    reviewsCount: 0,
    tags: [],
    images: [],
    sizes: [],
    colors: [],
    ...productData,
  };

  const updated = [newProduct, ...products];
  writeRaw(updated);
  return newProduct;
}

/**
 * Updates an existing product with partial data.
 */
export function updateProduct(id, updates) {
  const products = getAllProducts();
  const updated = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  writeRaw(updated);
  return updated.find((p) => p.id === id);
}

/**
 * Permanently removes a product from storage.
 */
export function deleteProduct(id) {
  const products = getAllProducts();
  const updated = products.filter((p) => p.id !== id);
  writeRaw(updated);
  return updated;
}

export default {
  initializeProducts,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};