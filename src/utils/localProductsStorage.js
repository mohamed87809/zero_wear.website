// src/utils/localProductsStorage.js

import { products as seedProducts } from '../data/products.js';

const STORAGE_KEY = 'zw_admin_products';

function readProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    // First-time seed: populate from the existing static catalog
    writeProducts(seedProducts);
    return seedProducts;
  } catch {
    return [];
  }
}

function writeProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Returns all admin-managed products, seeding from the static catalog
 * (src/data/products.js) on first use.
 */
export function getAllProducts() {
  return readProducts();
}

/**
 * Returns a single product by ID, or null if not found.
 */
export function getProductById(id) {
  const products = readProducts();
  return products.find((p) => p.id === id) || null;
}

/**
 * Adds a new product to storage.
 * FUTURE BACKEND MIGRATION: replace with a POST /products call;
 * the server would generate the id instead of the client.
 */
export function addProduct(productData) {
  const products = readProducts();

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
  writeProducts(updated);
  return newProduct;
}

/**
 * Updates an existing product with partial data.
 */
export function updateProduct(id, updates) {
  const products = readProducts();
  const updated = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  writeProducts(updated);
  return updated.find((p) => p.id === id);
}

/**
 * Permanently removes a product from storage.
 */
export function deleteProduct(id) {
  const products = readProducts();
  const updated = products.filter((p) => p.id !== id);
  writeProducts(updated);
  return updated;
}

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};