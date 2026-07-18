// src/components/product/ProductInfo.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, Minus, Plus, Truck, RotateCcw } from 'lucide-react';

import Button from '../ui/Button.jsx';
import { addToCart } from '../../redux/features/cartSlice.js';
import {
  toggleWishlist,
  selectIsInWishlist,
} from '../../redux/features/wishlistSlice.js';
import { showToast } from '../../redux/features/uiSlice.js';
import { getColorHex } from '../../utils/colorMap.js';

function formatPrice(value, currency = 'DZD') {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function ProductInfo({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isWishlisted = useSelector((state) =>
    selectIsInWishlist(state, product.id)
  );

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(product.sizes?.[0]);
    setSelectedColor(product.colors?.[0]?.name);
    setQuantity(1);
  }, [product.id, product.sizes, product.colors]);

  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock <= 10;
  const showStockInfo = product.showStock !== false;
  const hasDiscount = !!product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  const buildCartPayload = () => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    size: selectedSize ?? 'One Size',
    color: selectedColor ?? 'Default',
    quantity,
  });

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(addToCart(buildCartPayload()));
    dispatch(showToast({ message: `${product.name} added to cart`, type: 'success' }));
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    dispatch(addToCart(buildCartPayload()));
    navigate('/checkout');
  };

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

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      {/* Title + rating */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
          {product.category}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-[#374151]">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-[#374151]/60">
            ({product.reviewsCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-[#111827] sm:text-3xl">
          {formatPrice(product.price, product.currency)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-base text-[#374151]/50 line-through">
              {formatPrice(product.oldPrice, product.currency)}
            </span>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock status — only shown if the admin enabled it for this product */}
      {showStockInfo && (
        <>
          {isOutOfStock ? (
            <p className="text-sm font-semibold text-red-600">Out of Stock</p>
          ) : isLowStock ? (
            <p className="text-sm font-semibold text-[#2563eb]">
              Only {product.stock} left in stock
            </p>
          ) : null}
        </>
      )}

      {/* Size selector */}
      {product.sizes?.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-[#111827]">Size</span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-[#111827] bg-[#111827] text-white'
                    : 'border-[#e5e7eb] text-[#374151] hover:border-[#111827]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color selector */}
      {product.colors?.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-[#111827]">
            Color — {selectedColor}
          </span>
          <div className="flex items-center gap-2">
            {product.colors.map((color) => {
              const hex = getColorHex(color.name);
              const isWhite = hex.toLowerCase() === '#ffffff';
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  style={{ backgroundColor: hex }}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-[#2563eb] ring-2 ring-[#2563eb]/30 ring-offset-2'
                      : isWhite
                      ? 'border-[#d1d5db]'
                      : 'border-[#e5e7eb]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-[#111827]">Quantity</span>
        <div className="flex w-fit items-center gap-3 rounded-xl border border-[#e5e7eb] px-2 py-1.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] transition-colors hover:bg-[#f9fafb] disabled:opacity-30"
          >
            <Minus size={15} />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-[#111827]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.min(product.stock || 1, q + 1))
            }
            disabled={isOutOfStock || quantity >= product.stock}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] transition-colors hover:bg-[#f9fafb] disabled:opacity-30"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleBuyNow}
        >
          {isOutOfStock ? 'Sold Out' : 'Buy Now'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          Add to Cart
        </Button>

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-[#e5e7eb] text-[#111827] transition-colors hover:bg-[#f9fafb]"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-[#2563eb] text-[#2563eb]' : ''}
          />
        </button>
      </div>

      {/* Delivery info */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e5e7eb] p-4">
        <div className="flex items-start gap-3">
          <Truck size={18} className="mt-0.5 shrink-0 text-[#2563eb]" />
          <div>
            <p className="text-sm font-semibold text-[#111827]">
              Estimated Delivery
            </p>
            <p className="text-xs text-[#374151]">
              {product.delivery?.estimate}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw size={18} className="mt-0.5 shrink-0 text-[#2563eb]" />
          <div>
            <p className="text-sm font-semibold text-[#111827]">
              Return Policy
            </p>
            <p className="text-xs text-[#374151]">
              {product.delivery?.returnPolicy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;