// src/pages/FAQ.jsx

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      {
        question: 'How long does delivery take?',
        answer:
          'Orders are typically delivered within 2–4 business days across most wilayas. Remote areas may take slightly longer.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes — orders over 5,000 DZD qualify for free shipping. Orders below that threshold include a flat 500 DZD shipping fee.',
      },
      {
        question: 'Can I track my order?',
        answer:
          'Once your order is confirmed, you will receive tracking details via the phone number provided at checkout.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 14-day exchange window from the date of delivery. Items must be unworn, unwashed, and in original packaging.',
      },
      {
        question: 'How do I start a return?',
        answer:
          'Contact our support team via the Contact page with your order ID, and we will guide you through the exchange process.',
      },
    ],
  },
  {
    category: 'Sizing & Products',
    items: [
      {
        question: 'How do I find my correct size?',
        answer:
          'Each product page lists available sizes. If you are between sizes, we generally recommend sizing up for our oversized fits.',
      },
      {
        question: 'Are the product photos accurate?',
        answer:
          'Yes — all photos represent the actual products. Slight color variation may occur depending on your screen display.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We currently support cash on delivery nationwide, with online payment options coming soon.',
      },
    ],
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  let runningIndex = -1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-12 flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#374151] sm:text-base">
          Everything you need to know before you shop.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {faqs.map((group) => (
          <div key={group.category}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#2563eb]">
              {group.category}
            </h2>

            <div className="flex flex-col gap-3">
              {group.items.map((faq) => {
                runningIndex += 1;
                const index = runningIndex;
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-[#111827] sm:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#374151] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm leading-relaxed text-[#374151]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;