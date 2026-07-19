// src/services/storageService.js

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validates a File before upload.
 */
export function validateImageFile(file) {
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: `${file.name} is not an image file.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `${file.name} is larger than 5MB.`,
    };
  }

  return { valid: true };
}

/**
 * Upload image to Cloudinary
 */
export async function uploadProductImage(file) {
  const formData = new FormData();

  formData.append('file', file);

  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = await response.json();

  return data.secure_url;
}

/**
 * Cloudinary deletion requires a backend because it needs your API Secret.
 * For now we simply ignore deletes.
 */
export async function deleteProductImage() {
  return;
}

export default {
  validateImageFile,
  uploadProductImage,
  deleteProductImage,
};