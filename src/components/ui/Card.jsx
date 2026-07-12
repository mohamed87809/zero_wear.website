// src/components/ui/Card.jsx

import { motion } from 'framer-motion';

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

function Card({
  children,
  padding = 'md',
  hoverEffect = true,
  className = '',
  ...rest
}) {
  const hoverProps = hoverEffect
    ? {
        whileHover: { y: -4, boxShadow: '0 12px 24px -8px rgba(17, 24, 39, 0.12)' },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      className={`
        rounded-2xl border border-[#e5e7eb] bg-white shadow-sm
        ${paddingStyles[padding]}
        ${className}
      `}
      {...hoverProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default Card;