// src/components/shared/ThemeToggle.jsx

import { Sun, Moon } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme.js';

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-[#111827] transition-colors hover:bg-[#f9fafb] dark:text-white dark:hover:bg-white/10 ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;