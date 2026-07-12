// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

import Button from '../components/ui/Button.jsx';

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
          <SearchX size={28} />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-[#111827] sm:text-7xl">
          404
        </h1>

        <div>
          <p className="text-lg font-semibold text-[#111827]">
            Page Not Found
          </p>
          <p className="mt-2 max-w-sm text-sm text-[#374151] sm:text-base">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;