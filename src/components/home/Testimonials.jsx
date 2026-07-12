// src/components/home/Testimonials.jsx

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

import Card from '../ui/Card.jsx';

const testimonials = [
  {
    name: 'Amine K.',
    role: 'Algiers',
    rating: 5,
    quote:
      'The quality completely exceeded my expectations. The hoodie feels premium and the fit is exactly as described. Definitely ordering again.',
  },
  {
    name: 'Sarah B.',
    role: 'Oran',
    rating: 5,
    quote:
      'Fast delivery and the packaging alone felt like a luxury unboxing experience. Zero Wear DZ is now my go-to for everyday essentials.',
  },
  {
    name: 'Yacine M.',
    role: 'Constantine',
    rating: 4,
    quote:
      'Clean, minimal designs that actually go with everything. The track jacket has become a staple in my rotation.',
  },
];

function Testimonials() {
  return (
    <section className="bg-[#f9fafb] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-sm text-[#374151] sm:text-base">
            Real experiences from real customers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card padding="lg" className="relative h-full overflow-hidden">
                <Quote
                  size={72}
                  className="absolute -right-3 -top-3 text-[#111827]/5"
                />

                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-[#e5e7eb]'
                        }
                      />
                    ))}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-[#374151]">
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#374151]/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
