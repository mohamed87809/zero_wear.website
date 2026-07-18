// src/utils/colorMap.js
//
// Maps color names (as typed by the admin) to real CSS colors. Used by
// the color swatch selector on the Product Details page, and by the
// Admin Dashboard when saving a product's colors — fixes the bug where
// every color was hardcoded to black.

export const colorMap = {
  beige: '#E8DCC8',
  taupe: '#8B7D6B',
  mocha: '#6F4E37',
  'dusty blue': '#7A93A8',
  'olive green': '#708238',
  'concrete gray': '#95999C',
  'concrete grey': '#95999C',
  black: '#111827',
  'light grey': '#D1D5DB',
  'light gray': '#D1D5DB',
  white: '#FFFFFF',
  navy: '#1E3A8A',
  khaki: '#78716C',
  stone: '#78716C',
  grey: '#6B7280',
  gray: '#6B7280',
};

const FALLBACK_COLOR = '#9CA3AF'; // neutral gray for unrecognized names

/**
 * Returns the best-known hex value for a color name. Falls back to a
 * neutral gray for unrecognized names, instead of defaulting to black.
 */
export function getColorHex(name) {
  if (!name) return FALLBACK_COLOR;
  return colorMap[name.trim().toLowerCase()] || FALLBACK_COLOR;
}

export default colorMap;