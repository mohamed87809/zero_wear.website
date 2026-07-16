// src/pages/Wishlist.jsx

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, X } from 'lucide-react';

import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

import {
  selectWishlistItems,
  toggleWishlist,
} from '../redux/features/wishlistSlice.js';
import { addToCart } from '../redux/features/cartSlice.js';

function formatPrice(value) {
  return `${(value || 0).toLocaleString('en-US')} DZD`;
}

function Wishlist() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: 'One Size',
        color: 'Default',
        quantity: 1,
      })
    );
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f9fafb] text-[#374151] dark:bg-white/5 dark:text-white/50">
          <Heart size={26} />
        </div>
        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">
          Your Wishlist is Empty
        </h1>
        <p className="max-w-sm text-sm text-[#374151] dark:text-white/60">
          Save products you love by tapping the heart icon — they'll show up
          here.
        </p>
        <Link to="/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
          Wishlist
        </h1>
        <p className="text-sm text-[#374151] dark:text-white/60">
          {items.length} item{items.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            padding="none"
            className="flex flex-col overflow-hidden"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#f9fafb] dark:bg-white/5">
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(item)}
                aria-label="Remove from wishlist"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
              <Link to={`/products/${item.id}`}>
                <h3 className="line-clamp-1 text-sm font-semibold text-[#111827] dark:text-white">
                  {item.name}
                </h3>
              </Link>
              <span className="text-base font-bold text-[#111827] dark:text-white">
                {formatPrice(item.price)}
              </span>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(item)}
                className="mt-1 gap-2"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;