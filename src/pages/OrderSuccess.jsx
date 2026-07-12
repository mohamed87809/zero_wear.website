// src/pages/OrderSuccess.jsx

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle2, PackageSearch } from 'lucide-react';

import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import { selectCurrentOrder } from '../redux/features/ordersSlice.js';

function formatPrice(value, currency = 'DZD') {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function OrderSuccess() {
  const order = useSelector(selectCurrentOrder);

  if (!order) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <PackageSearch size={40} className="text-[#374151]/40" />
        <h1 className="text-2xl font-bold text-[#111827]">
          No Recent Order Found
        </h1>
        <p className="max-w-sm text-sm text-[#374151]">
          We couldn't find a recent order to display. Start shopping to place
          a new one.
        </p>
        <Link to="/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      {/* Success header */}
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16a34a]/10">
          <CheckCircle2 size={32} className="text-[#16a34a]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          Order Confirmed
        </h1>
        <p className="text-sm text-[#374151] sm:text-base">
          Thank you! Your order has been placed successfully.
        </p>
      </div>

      {/* Order details */}
      <Card padding="lg" hoverEffect={false} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-[#e5e7eb] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#374151]/70">
              Order ID
            </p>
            <p className="text-sm font-semibold text-[#111827]">{order.id}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-[#374151]/70">
              Date
            </p>
            <p className="text-sm font-semibold text-[#111827]">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Shipping to */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#374151]/70">
            Shipping To
          </p>
          <p className="text-sm font-semibold text-[#111827]">
            {order.customerInfo?.fullName}
          </p>
          <p className="text-sm text-[#374151]">
            {order.customerInfo?.address}, {order.customerInfo?.commune},{' '}
            {order.customerInfo?.wilaya}
          </p>
          <p className="text-sm text-[#374151]">{order.customerInfo?.phone}</p>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4 border-t border-[#e5e7eb] pt-4">
          {order.items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center gap-4"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f9fafb]">
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

        {/* Total */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
          <span className="text-base font-semibold text-[#111827]">
            Total Paid
          </span>
          <span className="text-lg font-bold text-[#111827]">
            {formatPrice(order.total)}
          </span>
        </div>
      </Card>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link to="/products" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" fullWidth>
            Continue Shopping
          </Button>
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-[#374151] transition-colors hover:text-[#111827]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;