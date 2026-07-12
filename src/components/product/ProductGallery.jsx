// src/components/product/ProductGallery.jsx

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function ProductGallery({ images = [], productName = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first image whenever the image set changes (e.g. navigating
  // to a different product via Related Products)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f9fafb]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${productName} — image ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`
                relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all
                ${
                  index === activeIndex
                    ? 'ring-2 ring-[#2563eb] ring-offset-2'
                    : 'border-[#e5e7eb] opacity-70 hover:opacity-100'
                }
              `}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;