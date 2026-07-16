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
        whileHover: { y: -6, boxShadow: '0 20px 40px -12px rgba(17, 24, 39, 0.18)' },
        transition: { duration: 0.25 , ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      className={`
        rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-colors duration-300
        dark:border-white/10 dark:bg-[#090909] 
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