// src/pages/Products.jsx

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, AlertTriangle, Search } from 'lucide-react';

import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import { ProductCardSkeleton } from '../components/ui/Loading.jsx';

import { categories } from '../data/products.js';
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
  selectFilters,
  setCategory,
  setSearchTerm,
  setSortBy,
  clearFilters,
} from '../redux/features/productsSlice.js';

function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const allProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const filters = useSelector(selectFilters);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      dispatch(setCategory(categoryParam));
    }
  }, [searchParams, dispatch]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.category && filters.category !== 'All') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters]);

  const isLoading = status === 'loading' && allProducts.length === 0;
  const hasError = status === 'failed' && allProducts.length === 0;
  const hasActiveFilters =
    filters.category !== 'All' || filters.searchTerm.trim() !== '';

  return (
    <div className="bg-white transition-colors duration-300 dark:bg-[#090909]">
      {/* Page header */}
      <div className="border-b border-[#e5e7eb] dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-3 text-4xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-5xl"
          >
            Shop All
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-sm text-[#374151] dark:text-white/60 sm:text-base"
          >
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''} available
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {hasError && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/25 dark:bg-red-500/10">
            <AlertTriangle size={18} className="shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">
              {error || 'Failed to load products. Please try again.'}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => dispatch(fetchProducts())}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#374151]/50 dark:text-white/40"
            />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search products..."
              className="w-full rounded-full border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-4 text-sm text-[#111827] placeholder:text-[#374151]/50 transition-colors focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#2563eb]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#f9fafb] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="rounded-full border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-colors focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:focus:border-[#2563eb]"
            >
              <option
                value="featured"
                className="bg-white text-[#111827] dark:bg-[#111827] dark:text-white"
              >
                Featured
              </option>
              <option
                value="price-asc"
                className="bg-white text-[#111827] dark:bg-[#111827] dark:text-white"
              >
                Price: Low to High
              </option>
              <option
                value="price-desc"
                className="bg-white text-[#111827] dark:bg-[#111827] dark:text-white"
              >
                Price: High to Low
              </option>
              <option
                value="rating"
                className="bg-white text-[#111827] dark:bg-[#111827] dark:text-white"
              >
                Top Rated
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Category filter sidebar (desktop) */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <CategoryFilterList filters={filters} dispatch={dispatch} />
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] overflow-y-auto bg-white p-6 shadow-2xl dark:bg-[#090909] lg:hidden"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#111827] dark:text-white">
                      Filters
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      aria-label="Close filters"
                      className="rounded-lg p-1.5 text-[#374151] hover:bg-[#f9fafb] dark:text-white/70 dark:hover:bg-white/10"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <CategoryFilterList filters={filters} dispatch={dispatch} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f9fafb] text-[#374151] dark:bg-white/5 dark:text-white/50">
                  <Search size={26} />
                </div>
                <p className="text-lg font-semibold text-[#111827] dark:text-white">
                  No products found
                </p>
                <p className="max-w-sm text-sm text-[#374151] dark:text-white/60">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={() => dispatch(clearFilters())}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryFilterList({ filters, dispatch }) {
  const allOption = { id: 'all', name: 'All', slug: 'All' };
  const options = [allOption, ...categories];

  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#374151] dark:text-white/50">
        Category
      </h3>
      {options.map((option) => {
        const isActive = filters.category === option.slug;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => dispatch(setCategory(option.slug))}
            className={`rounded-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-[#111827] text-white shadow-sm dark:bg-white dark:text-[#090909]'
                : 'text-[#374151] hover:bg-[#f9fafb] dark:text-white/70 dark:hover:bg-white/10'
            }`}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}

export default Products;