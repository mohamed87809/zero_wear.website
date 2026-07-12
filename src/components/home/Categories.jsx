// src/components/home/Categories.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { categories } from '../../data/products.js';

const categoryImages = {
  'T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  Jackets: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
  Pants: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600',
  Hoodies: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
  Footwear: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
  Accessories:
    'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600',
};

function Categories() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Shop by Category
          </h2>
          <p className="text-sm text-[#374151] sm:text-base">
            Find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(category.slug)}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={categoryImages[category.slug]}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent transition-colors duration-300 group-hover:from-[#111827]/80" />
                <span className="absolute inset-x-0 bottom-3 text-center text-xs font-semibold text-white sm:bottom-4 sm:text-sm">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
