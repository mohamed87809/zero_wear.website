// src/components/checkout/OrderSummary.jsx

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PackageX } from 'lucide-react';

import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import { selectCartItems, selectCartTotal } from '../../redux/features/cartSlice.js';

const FREE_SHIPPING_THRESHOLD = 5000;
const FLAT_SHIPPING_FEE = 500;

function formatPrice(value, currency = 'DZD') {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function OrderSummary() {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const shippingFee =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
      ? 0
      : FLAT_SHIPPING_FEE;

  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <Card padding="lg" hoverEffect={false} className="flex flex-col items-center gap-4 text-center">
        <PackageX size={36} className="text-[#374151]/40" />
        <div>
          <p className="text-base font-semibold text-[#111827]">
            Your cart is empty
          </p>
          <p className="mt-1 text-sm text-[#374151]">
            Add some products before proceeding to checkout.
          </p>
        </div>
        <Link to="/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="lg" hoverEffect={false} className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-[#111827]">Order Summary</h2>

      {/* Line items */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="flex items-center gap-4"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f9fafb]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-0.5">
              <p className="line-clamp-1 text-sm font-semibold text-[#111827]">
                {item.name}
              </p>
              <p className="text-xs text-[#374151]/70">
                {item.size} · {item.color} · Qty {item.quantity}
              </p>
            </div>

            <p className="shrink-0 text-sm font-semibold text-[#111827]">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-2 border-t border-[#e5e7eb] pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#374151]">Subtotal</span>
          <span className="font-medium text-[#111827]">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#374151]">Shipping</span>
          <span className="font-medium text-[#111827]">
            {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-[#e5e7eb] pt-3">
          <span className="text-base font-semibold text-[#111827]">
            Total
          </span>
          <span className="text-lg font-bold text-[#111827]">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default OrderSummary;