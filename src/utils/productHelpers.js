// src/utils/productHelpers.js
//
// Pure helper functions that operate on a products array passed in by the
// caller. These no longer import src/data/products.js directly — callers
// should source that array from Redux (selectAllProducts), which is itself
// backed by localStorage via localProductsStorage.js. This keeps a single
// source of truth for product data across the entire app.

export const getProductById = (products, id) =>
  products.find((p) => p.id === id) || null;

export const getFeaturedProducts = (products) =>
  products.filter((p) => p.isFeatured);

export const getRelatedProducts = (products, id, limit = 4) => {
  const current = getProductById(products, id);
  if (!current) return [];
  return products
    .filter((p) => p.id !== id && p.category === current.category)
    .slice(0, limit);
};

export const getProductsByCategory = (products, category) =>
  products.filter((p) => p.category === category);