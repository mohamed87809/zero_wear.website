// src/components/layout/Navbar.jsx

import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';

import { selectCartCount } from '../../redux/features/cartSlice.js';
import { selectWishlistCount } from '../../redux/features/wishlistSlice.js';
import {
  toggleMobileMenu,
  toggleCartDrawer,
} from '../../redux/features/uiSlice.js';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-label="Open menu"
          className="-ml-2 flex items-center justify-center rounded-lg p-2 text-[#111827] transition-colors hover:bg-[#f9fafb] lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl"
        >
          ZERO WEAR <span className="text-[#2563eb]">DZ</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#111827]'
                    : 'text-[#374151] hover:text-[#111827]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden items-center justify-center rounded-lg p-2 text-[#111827] transition-colors hover:bg-[#f9fafb] sm:flex"
          >
            <Search size={20} />
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden items-center justify-center rounded-lg p-2 text-[#111827] transition-colors hover:bg-[#f9fafb] sm:flex"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => dispatch(toggleCartDrawer())}
            aria-label="Cart"
            className="relative flex items-center justify-center rounded-lg p-2 text-[#111827] transition-colors hover:bg-[#f9fafb]"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;