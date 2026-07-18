import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Button from '../ui/Button.jsx';

function Hero() {
  return (
    <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/hero5.jpg"
        alt="Zero Wear"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:px-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Walk
              <br />
              Different.
            </h1>

            <p className="mt-4 text-base text-white/85 sm:text-lg">
              Premium Footwear & Essentials
            </p>

            <div className="mt-8">
              <Link to="/products">
                <Button size="lg" className="group">
                  Shop Collection
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;