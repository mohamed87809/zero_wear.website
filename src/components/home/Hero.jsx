// src/components/home/Hero.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Button from '../ui/Button.jsx';

function Hero() {
  return (
    <section className="bg-[#f9fafb]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Text content */}
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]"
          >
            New Season Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight text-[#111827] sm:text-6xl lg:text-7xl"
          >
            Wear Less.
            <br />
            Mean More.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-base leading-relaxed text-[#374151] sm:text-lg"
          >
            Premium essentials designed with intention. Minimal silhouettes,
            considered materials, built for everyday movement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 flex flex-wrap items-center gap-4"
          >
            <Link to="/products">
              <Button variant="primary" size="lg" className="group">
                Shop Collection
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>

            <Link to="/about">
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative order-first lg:order-last"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000"
              alt="Zero Wear DZ premium collection"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;