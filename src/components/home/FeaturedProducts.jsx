// src/components/home/FeaturedProducts.jsx

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import ProductCard from '../product/ProductCard.jsx';
import { ProductCardSkeleton } from '../ui/Loading.jsx';

import {
  selectAllProducts,
  selectProductsStatus,
} from '../../redux/features/productsSlice.js';
import { getFeaturedProducts } from '../../utils/productHelpers.js';

function FeaturedProducts() {
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  const featuredProducts = getFeaturedProducts(products);
  const isLoading = status === 'loading' && products.length === 0;

  return (
    <section className="bg-[#f9fafb] py-16 transition-colors duration-300 dark:bg-[#090909] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
              Featured Products
            </h2>
            <p className="text-sm text-[#6b7280] dark:text-white/70 sm:text-base">
              Hand-picked pieces from our latest collection.
            </p>
          </div>

          <Link
            to="/products"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#111827] transition-colors hover:text-[#2563eb] dark:text-white dark:hover:text-[#60a5fa]"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-[#6b7280] dark:text-white/70">
            No featured products available right now.
          </p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;