// src/utils/productHelpers.js

import { products } from '../data/products.js';

export const getProductById = (id) => products.find((p) => p.id === id);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

export const getRelatedProducts = (id, limit = 4) => {
  const current = getProductById(id);
  if (!current) return [];
  return products
    .filter((p) => p.id !== id && p.category === current.category)
    .slice(0, limit);
};

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);