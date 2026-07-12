// src/components/shared/SearchBar.jsx

import { useSelector, useDispatch } from 'react-redux';
import { Search, X } from 'lucide-react';

import {
  selectFilters,
  setSearchTerm,
} from '../../redux/features/productsSlice.js';

function SearchBar({
  onNavigate,
  autoFocus = false,
  placeholder = 'Search products...',
  className = '',
}) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchTerm(''));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filters.searchTerm.trim()) {
      onNavigate?.();
    }
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 ${className}`}
    >
      <Search size={17} className="shrink-0 text-[#374151]" />

      <input
        type="text"
        value={filters.searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#374151]/50 focus:outline-none"
      />

      {filters.searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="shrink-0 text-[#374151] transition-colors hover:text-[#111827]"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;