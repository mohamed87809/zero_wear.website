// src/components/home/WhyChooseUs.jsx

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Nationwide shipping within 2–4 business days.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'Carefully sourced materials, built to last.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14-day hassle-free exchange on every order.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Real humans, ready to help whenever you need.',
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="text-sm text-[#374151] sm:text-base">
            Everything you'd expect from a premium experience.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-semibold text-[#111827] sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#374151] sm:text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;