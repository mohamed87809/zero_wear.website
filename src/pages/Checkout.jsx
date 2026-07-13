// src/pages/Checkout.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutForm from '../components/checkout/CheckoutForm.jsx';
import OrderSummary from '../components/checkout/OrderSummary.jsx';

import { selectCartItems, selectCartTotal, clearCart } from '../redux/features/cartSlice.js';
import { placeOrder } from '../redux/features/ordersSlice.js';
import { createOrder } from '../services/ordersService.js';

const FREE_SHIPPING_THRESHOLD = 5000;
const FLAT_SHIPPING_FEE = 500;

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');

  const handleValidSubmit = async (customerInfo) => {
    if (cartItems.length === 0) return;

    setOrderError('');
    setIsPlacingOrder(true);

    const shippingFee =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
    const total = subtotal + shippingFee;

    try {
      // Persist to Firestore — this is what the Admin Dashboard's
      // Orders page reads from.
      await createOrder({
        items: cartItems,
        customerInfo,
        total,
      });

      // Persist to Redux — this is what OrderSuccess.jsx reads from
      // to render the confirmation screen. Left exactly as before.
      dispatch(
        placeOrder({
          items: cartItems,
          customerInfo,
          total,
        })
      );

      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      setIsPlacingOrder(false);
      setOrderError(
        error?.message || 'Failed to place your order. Please try again.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          Checkout
        </h1>
        <p className="text-sm text-[#374151]">
          Enter your details to complete your order.
        </p>
      </div>

      {orderError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {orderError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="order-last lg:order-first lg:col-span-2">
          {cartItems.length > 0 && (
            <CheckoutForm
              onValidSubmit={handleValidSubmit}
              isSubmittingOrder={isPlacingOrder}
            />
          )}
        </div>

        <div className="order-first lg:order-last">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default Checkout;