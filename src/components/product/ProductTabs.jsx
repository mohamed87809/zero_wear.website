// src/components/product/ProductTabs.jsx

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'features', label: 'Features' },
  { id: 'delivery', label: 'Delivery Info' },
];

function formatPrice(value, currency = 'DZD') {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="flex flex-col gap-6">
      {/* Tab buttons */}
      <div className="flex items-center gap-6 overflow-x-auto border-b border-[#e5e7eb]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative shrink-0 pb-3 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-[#111827]'
                : 'text-[#374151]/60 hover:text-[#111827]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-[#2563eb]"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'description' && (
          <motion.div
            key="description"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
              {product.description}
            </p>
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-3">
              {product.features?.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                    <Check size={12} />
                  </span>
                  <span className="text-sm text-[#374151] sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {activeTab === 'delivery' && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Estimated Delivery Time
              </p>
              <p className="mt-1 text-sm text-[#374151]">
                {product.delivery?.estimate}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Free Shipping
              </p>
              <p className="mt-1 text-sm text-[#374151]">
                On orders over{' '}
                {formatPrice(
                  product.delivery?.freeShippingThreshold ?? 0,
                  product.currency
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Return Policy
              </p>
              <p className="mt-1 text-sm text-[#374151]">
                {product.delivery?.returnPolicy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductTabs;