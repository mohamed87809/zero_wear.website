// src/services/storageService.js
//
// Firebase Storage service for product image uploads. Used exclusively by
// the Admin Dashboard's ImageUploader component. Follows the same
// service-layer pattern as productsService.js / ordersService.js — plain
// async functions, no UI or Redux concerns here.

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { storage } from '../firebase/firebase.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, matches storage.rules

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

/**
 * Validates a File before upload: must be an image, under the size limit.
 */
export function validateImageFile(file) {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: `${file.name} is not an image file.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `${file.name} is larger than 5MB.` };
  }
  return { valid: true };
}

/**
 * Uploads a single image file to Firebase Storage under /products and
 * returns its public download URL — the only thing saved into Firestore.
 */
export async function uploadProductImage(file) {
  const uniqueName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${sanitizeFileName(file.name)}`;
  const imageRef = ref(storage, `products/${uniqueName}`);

  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

/**
 * Deletes a previously uploaded product image from Storage, given its
 * public download URL.
 */
export async function deleteProductImage(url) {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    // Non-fatal — e.g. already deleted, or a legacy external URL that
    // isn't actually a Storage object. Don't block the UI on this.
    console.warn('Could not delete storage image:', error.message);
  }
}

export default {
  validateImageFile,
  uploadProductImage,
  deleteProductImage,
};