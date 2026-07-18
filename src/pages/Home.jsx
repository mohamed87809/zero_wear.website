// src/pages/Home.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Globe ,Send, CheckCircle2 } from 'lucide-react';
 
import Hero from '../components/home/Hero.jsx';
import Categories from '../components/home/Categories.jsx';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';



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
      <Newsletter />
    </>
  );
}

export default Home;