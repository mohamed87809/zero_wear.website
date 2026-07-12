// src/components/layout/Footer.jsx

import { Link } from 'react-router-dom';
import { Globe, Mail, Send } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'All Products', to: '/products' },
    { label: 'New Arrivals', to: '/products' },
    { label: 'Best Sellers', to: '/products' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="text-lg font-bold">
              ZERO WEAR <span className="text-[#2563eb]">DZ</span>
            </Link>

            <p className="mt-4 text-sm text-white/60">
              Minimalist, premium essentials designed for everyday movement.
            </p>

            <div className="mt-6 flex gap-3">
              {[1, 2, 3].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                >
                  <Globe size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {[...footerLinks.company, ...footerLinks.legal].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold">Stay Updated</h3>

            <p className="mt-4 text-sm text-white/60">
              Subscribe for early access to drops and offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/20 px-3">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8]"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Zero Wear DZ. All rights reserved.
          </p>

          <p className="text-xs text-white/50">
            Made in Algeria 🇩🇿
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;