// src/pages/Products.jsx

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, AlertTriangle } from 'lucide-react';

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

  // Sync ?category= from URL into Redux on mount / param change
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
        break; // 'featured' keeps original catalog order
    }

    return result;
  }, [allProducts, filters]);

  const isLoading = status === 'loading' && allProducts.length === 0;
  const hasError = status === 'failed' && allProducts.length === 0;
  const hasActiveFilters =
    filters.category !== 'All' || filters.searchTerm.trim() !== '';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          Shop All
        </h1>
        <p className="text-sm text-[#374151]">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {hasError && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle size={18} className="shrink-0 text-red-600" />
          <p className="text-sm text-red-700">
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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search products..."
          className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#374151]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] sm:max-w-xs"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#f9fafb] lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Category filter sidebar (desktop) */}
        <aside className="hidden w-48 shrink-0 lg:block">
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
                className="fixed inset-0 z-50 bg-[#111827]/50 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#111827]">
                    Filters
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    aria-label="Close filters"
                    className="rounded-lg p-1.5 hover:bg-[#f9fafb]"
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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <p className="text-lg font-semibold text-[#111827]">
                No products found
              </p>
              <p className="max-w-sm text-sm text-[#374151]">
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
  );
}

function CategoryFilterList({ filters, dispatch }) {
  const allOption = { id: 'all', name: 'All', slug: 'All' };
  const options = [allOption, ...categories];

  return (
    <div className="flex flex-col gap-1">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#374151]">
        Category
      </h3>
      {options.map((option) => {
        const isActive = filters.category === option.slug;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => dispatch(setCategory(option.slug))}
            className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#111827] text-white'
                : 'text-[#374151] hover:bg-[#f9fafb]'
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