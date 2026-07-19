// src/components/admin/ImageUploader.jsx

import { useEffect, useRef, useState } from 'react';
import { UploadCloud, X, ChevronUp, ChevronDown, Loader2, AlertCircle } from 'lucide-react';

import {
  validateImageFile,
  uploadProductImage,
} from '../../services/storageService.js';

const MAX_IMAGES = 8;

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ImageUploader({ images, onChange, onUploadingChange, disabled = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Seeded once from the initial `images` prop. No effect re-syncs this
  // from the parent afterward — the parent remounts this component via a
  // `key` prop whenever it needs fresh state (switching Add/Edit), so
  // re-syncing here was unnecessary and was the source of the bug: it
  // wiped out other in-flight uploads every time one image finished.
  const [items, setItems] = useState(() =>
    images.map((url) => ({ id: makeId(), url, previewUrl: url, status: 'done' }))
  );
  const [error, setError] = useState('');
  const recentUploadsRef = useRef(new Set());

  const doneCount = items.filter((i) => i.status === 'done').length;
  const isUploading = items.some((i) => i.status === 'uploading');
  const canAddMore = items.length < MAX_IMAGES;

  // Notify the parent whenever the set of successfully uploaded URLs
  // actually changes — kept in its own effect (not inside setItems)
  // so it can't interfere with the uploader's own state updates.
  const lastSyncedRef = useRef('');
  useEffect(() => {
    const urls = items.filter((i) => i.status === 'done').map((i) => i.url);
    const joined = urls.join('|');
    if (joined !== lastSyncedRef.current) {
      lastSyncedRef.current = joined;
      onChange(urls);
    }
  }, [items, onChange]);

  // Let the parent know if an upload is still in progress, so it can
  // disable the Save button instead of relying on a stale image count.
  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  const updateItem = (id, patch) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const handleFiles = (fileList) => {
    setError('');
    const files = Array.from(fileList);

    if (doneCount + files.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images per product.`);
    }

    const room = Math.max(0, MAX_IMAGES - items.length);
    const filesToProcess = files.slice(0, room);
    const newItems = [];

    filesToProcess.forEach((file) => {
      const key = `${file.name}-${file.size}`;
      if (recentUploadsRef.current.has(key)) return;

      const { valid, error: validationError } = validateImageFile(file);
      if (!valid) {
        setError(validationError);
        return;
      }

      recentUploadsRef.current.add(key);
      newItems.push({
        id: makeId(),
        key,
        file,
        previewUrl: URL.createObjectURL(file),
        url: null,
        status: 'uploading',
      });
    });

    if (newItems.length === 0) return;

    setItems((prev) => [...prev, ...newItems]);

    newItems.forEach((item) => {
      uploadProductImage(item.file)
        .then((url) => updateItem(item.id, { url, status: 'done' }))
        .catch((err) => {
          console.error('Image upload failed:', item.file.name, err);
          updateItem(item.id, { status: 'error' });
          recentUploadsRef.current.delete(item.key);
        });
    });
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRetry = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item?.file) return;

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'uploading' } : i))
    );

    uploadProductImage(item.file)
      .then((url) => updateItem(id, { url, status: 'done' }))
      .catch((err) => {
        console.error('Retry upload failed:', item.file.name, err);
        updateItem(id, { status: 'error' });
      });
  };

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[#111827] dark:text-white">
        Product Images
      </label>

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
          {canAddMore ? 'Click or drag images here to upload' : `Maximum ${MAX_IMAGES} images reached`}
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

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-500">
          <AlertCircle size={13} />
          {error}
        </p>
      )}

      {isUploading && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#2563eb]">
          <Loader2 size={13} className="animate-spin" />
          Uploading images... please wait before saving.
        </p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f9fafb] dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={item.previewUrl}
                alt={`Product image ${index + 1}`}
                className={`h-full w-full object-cover ${item.status !== 'done' ? 'opacity-40' : ''}`}
              />

              {item.status === 'uploading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Loader2 size={20} className="animate-spin text-white" />
                </div>
              )}

              {item.status === 'error' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/40 p-2 text-center">
                  <AlertCircle size={18} className="text-red-400" />
                  <button
                    type="button"
                    onClick={() => handleRetry(item.id)}
                    className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#111827]"
                  >
                    Retry
                  </button>
                </div>
              )}

              {index === 0 && item.status === 'done' && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-[#111827]/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Main
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
              >
                <X size={13} />
              </button>

              {item.status === 'done' && items.length > 1 && (
                <div className="absolute bottom-1.5 right-1.5 flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    aria-label="Move image earlier"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white disabled:opacity-30"
                  >
                    <ChevronUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move image later"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white disabled:opacity-30"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;