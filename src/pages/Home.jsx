// src/pages/Home.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Globe ,Send, CheckCircle2 } from 'lucide-react';

import Hero from '../components/home/Hero.jsx';
import Categories from '../components/home/Categories.jsx';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

const instagramImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
  'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500',
  'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500',
];

function InstagramGallery() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Follow Us on Instagram
          </h2>
          <p className="text-sm text-[#374151] sm:text-base">
            @zerowear.dz — Tag us to be featured.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {instagramImages.map((image, index) => (
            <motion.a
              key={image}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={image}
                alt="Instagram post"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#111827]/0 transition-colors duration-300 group-hover:bg-[#111827]/50">
                <Globe
                  size={22}
                  className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="bg-[#111827] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the Movement
          </h2>
          <p className="mt-3 text-sm text-white/60 sm:text-base">
            Subscribe for early access to new drops, exclusive offers, and
            style inspiration.
          </p>

          {isSubscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-[#16a34a]">
              <CheckCircle2 size={20} />
              <span className="text-sm font-medium">
                Thanks for subscribing!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md items-center gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-[#2563eb] text-white transition-colors hover:bg-[#1d4ed8]"
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}

export default Home;