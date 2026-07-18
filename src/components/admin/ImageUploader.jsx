// src/components/admin/ImageUploader.jsx
//
// Reusable image uploader for the Admin Dashboard's product form. Handles
// multi-file selection, drag & drop, upload state, previews, deletion,
// and reordering. Fully controlled — the parent owns the `images` array
// (Firebase Storage download URLs) and receives updates via onChange.

import { useRef, useState } from 'react';
import { UploadCloud, X, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';

import {
  validateImageFile,
  uploadProductImage,
} from '../../services/storageService.js';

const MAX_IMAGES = 8;

function ImageUploader({ images, onChange, disabled = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState('');
  const recentUploadsRef = useRef(new Set()); // dedupe key: name+size

  const canAddMore = images.length < MAX_IMAGES;

  const handleFiles = async (fileList) => {
    setError('');
    const files = Array.from(fileList);

    if (images.length + files.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images per product.`);
    }

    const room = Math.max(0, MAX_IMAGES - images.length);
    const filesToProcess = files.slice(0, room);

    const validFiles = [];
    filesToProcess.forEach((file) => {
      const key = `${file.name}-${file.size}`;
      if (recentUploadsRef.current.has(key)) {
        return; // skip exact duplicate selected/dropped twice
      }
      const { valid, error: validationError } = validateImageFile(file);
      if (!valid) {
        setError(validationError);
        return;
      }
      recentUploadsRef.current.add(key);
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    setUploadingCount((prev) => prev + validFiles.length);

    const uploadedUrls = [];
    for (const file of validFiles) {
      try {
        const url = await uploadProductImage(file);
        uploadedUrls.push(url);
      } catch {
        setError('One or more images failed to upload. Please try again.');
      }
    }

    setUploadingCount((prev) => prev - validFiles.length);

    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
    e.target.value = ''; // allow re-selecting the same file later if needed
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    const updated = [...images];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[#111827] dark:text-white">
        Product Images
      </label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && canAddMore && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          disabled || !canAddMore
            ? 'cursor-not-allowed border-[#e5e7eb] bg-[#f9fafb] opacity-60 dark:border-white/10 dark:bg-white/5'
            : isDragging
            ? 'cursor-pointer border-[#2563eb] bg-[#2563eb]/5 dark:border-[#2563eb] dark:bg-[#2563eb]/10'
            : 'cursor-pointer border-[#e5e7eb] bg-[#f9fafb] hover:border-[#2563eb]/50 dark:border-white/15 dark:bg-white/5'
        }`}
      >
        <UploadCloud size={22} className="text-[#374151]/60 dark:text-white/50" />
        <p className="text-sm font-medium text-[#111827] dark:text-white">
          {canAddMore
            ? 'Click or drag images here to upload'
            : `Maximum ${MAX_IMAGES} images reached`}
        </p>
        <p className="text-xs text-[#9ca3af] dark:text-white/50">
          PNG, JPG, or WEBP — up to 5MB each
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={disabled || !canAddMore}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      {/* Previews */}
      {(images.length > 0 || uploadingCount > 0) && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f9fafb] dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={url}
                alt={`Product image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-[#111827]/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Main
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemove(index)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={13} />
              </button>

              <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  aria-label="Move image earlier"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white disabled:opacity-30"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label="Move image later"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white disabled:opacity-30"
                >
                  <ChevronDown size={13} />
                </button>
              </div>
            </div>
          ))}

          {Array.from({ length: uploadingCount }).map((_, i) => (
            <div
              key={`uploading-${i}`}
              className="flex aspect-square items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f9fafb] dark:border-white/10 dark:bg-white/5"
            >
              <Loader2
                size={18}
                className="animate-spin text-[#374151]/60 dark:text-white/50"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;