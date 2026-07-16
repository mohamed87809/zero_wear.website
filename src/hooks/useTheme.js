// src/hooks/useTheme.js

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'zw_theme';
const THEME_EVENT = 'zw-theme-change';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Manages the app-wide theme: persists to localStorage, detects system
 * preference when no explicit choice has been made, and keeps every
 * instance of this hook (Navbar's toggle, MobileMenu's toggle) in sync
 * via a lightweight custom event — no external state library needed.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply + persist whenever this instance's theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
  }, [theme]);

  // Stay in sync if another mounted instance toggles the theme
  useEffect(() => {
    const handleExternalChange = (e) => setTheme(e.detail);
    window.addEventListener(THEME_EVENT, handleExternalChange);
    return () => window.removeEventListener(THEME_EVENT, handleExternalChange);
  }, []);

  // Follow system preference changes, but only if the user hasn't
  // made an explicit choice yet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}

export default useTheme;