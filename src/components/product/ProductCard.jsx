// src/components/product/ProductCard.jsx

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Star, Eye } from 'lucide-react';

import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

import { addToCart } from '../../redux/features/cartSlice.js';
import {
  toggleWishlist,
  selectIsInWishlist,
} from '../../redux/features/wishlistSlice.js';
import { openModal } from '../../redux/features/uiSlice.js';

function formatPrice(value, currency = 'DZD') {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector((state) =>
    selectIsInWishlist(state, product.id)
  );

  const isOutOfStock = product.stock === 0;
  const hasDiscount = !!product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      })
    );
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.sizes?.[0] ?? 'One Size',
        color: product.colors?.[0]?.name ?? 'Default',
        quantity: 1,
      })
    );
  };

  const handleQuickView = () => {
    dispatch(openModal({ name: 'quickView', data: product.id }));
  };

  return (
    <Card padding="none" className="group flex flex-col overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f9fafb]">
        <Link to={`/products/${product.id}`}>
          <motion.img
            src={product.images[0]}
            alt={product.name}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tags?.includes('new') && (
            <Badge variant="accent">New</Badge>
          )}
          {hasDiscount && (
            <Badge variant="danger">-{discountPercent}%</Badge>
          )}
          {isOutOfStock && <Badge variant="default">Sold Out</Badge>}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Heart
            size={17}
            className={isWishlisted ? 'fill-[#2563eb] text-[#2563eb]' : ''}
          />
        </button>

        {/* Quick view overlay (desktop hover) */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 text-xs font-semibold text-[#111827] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:flex"
        >
          <Eye size={14} />
          Quick View
        </button>
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-[#111827] transition-colors hover:text-[#2563eb] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-[#374151]">
            {product.rating}
          </span>
          <span className="text-xs text-[#374151]/60">
            ({product.reviewsCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#111827] sm:text-base">
            {formatPrice(product.price, product.currency)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#374151]/50 line-through">
              {formatPrice(product.oldPrice, product.currency)}
            </span>
          )}
        </div>

        <Button
          variant={isOutOfStock ? 'outline' : 'primary'}
          size="sm"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="mt-1"
        >
          {isOutOfStock ? 'Sold Out' : 'Buy Now'}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;