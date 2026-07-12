// src/components/layout/AnnouncementBar.jsx

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden bg-[#111827]"
        >
          <div className="relative flex items-center justify-center px-10 py-2.5 text-center">
            <p className="text-xs font-medium tracking-wide text-white sm:text-sm">
              Free shipping on orders over 5,000 DZD — Limited time
            </p>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 text-white/70 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnnouncementBar;
