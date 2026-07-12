// src/components/layout/MobileMenu.jsx
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Search, Heart, ShoppingBag } from 'lucide-react';

import {
  selectIsMobileMenuOpen,
  closeMobileMenu,
} from '../../redux/features/uiSlice.js';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
];

function MobileMenu() {
  const isOpen = useSelector(selectIsMobileMenuOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => dispatch(closeMobileMenu());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#111827]/50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-50 flex h-full w-[80%] max-w-xs flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
              <span className="text-base font-bold tracking-tight text-[#111827]">
                ZERO WEAR <span className="text-[#2563eb]">DZ</span>
              </span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close menu"
                className="flex items-center justify-center rounded-lg p-2 text-[#111827] transition-colors hover:bg-[#f9fafb]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-5 py-3">
              <Search size={18} className="text-[#374151]" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#374151]/60 focus:outline-none"
              />
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#f9fafb] text-[#111827]'
                        : 'text-[#374151] hover:bg-[#f9fafb] hover:text-[#111827]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 border-t border-[#e5e7eb] px-5 py-4">
              <Link
                to="/wishlist"
                onClick={handleClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] py-3 text-sm font-medium text-[#111827] transition-colors hover:bg-[#f9fafb]"
              >
                <Heart size={16} />
                Wishlist
              </Link>
              <Link
                to="/checkout"
                onClick={handleClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-sm font-medium text-white transition-colors hover:bg-[#374151]"
              >
                <ShoppingBag size={16} />
                Cart
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
