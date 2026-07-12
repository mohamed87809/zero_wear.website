// src/pages/About.jsx

import { motion } from 'framer-motion';
import { Leaf, Gem, CircleDot } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    description:
      'Every piece is crafted from premium materials, built to outlast trends.',
  },
  {
    icon: CircleDot,
    title: 'Intentional Minimalism',
    description:
      'Clean silhouettes and considered details — nothing excessive, nothing wasted.',
  },
  {
    icon: Leaf,
    title: 'Responsible Production',
    description:
      'Thoughtful sourcing and small-batch production to reduce our footprint.',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '50+', label: 'Curated Products' },
  { value: '48', label: 'Wilayas Served' },
  { value: '4.8/5', label: 'Average Rating' },
];

function About() {
  return (
    <div>
      {/* Intro */}
      <section className="bg-[#f9fafb] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl"
          >
            Designed With Intention
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base leading-relaxed text-[#374151] sm:text-lg"
          >
            Zero Wear DZ was founded on a simple belief: premium essentials
            shouldn't be complicated. We design minimal, versatile pieces
            that move with you — built to last, styled to matter.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-[#111827]">
                    {value.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-[#374151]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#111827] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs text-white/60 sm:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + text */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000"
              alt="Zero Wear DZ studio"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Built From Algeria, For The World
            </h2>
            <p className="text-base leading-relaxed text-[#374151]">
              We started Zero Wear DZ with a small collection and a clear
              vision: create pieces we'd actually want to wear every day.
              Every drop since has been guided by the same standard —
              quality first, trends second.
            </p>
            <p className="text-base leading-relaxed text-[#374151]">
              Today, we ship nationwide and continue to grow with the same
              attention to detail we started with.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;