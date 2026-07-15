// src/pages/admin/AdminCustomers.jsx

import { useEffect, useMemo, useState } from 'react';
import { Info, AlertTriangle } from 'lucide-react';

import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Loading from '../../components/ui/Loading.jsx';

import { getOrders } from '../../services/ordersService.js';

function formatPrice(value) {
  return `${(value || 0).toLocaleString('en-US')} DZD`;
}

function AdminCustomers() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const [loadError, setLoadError] = useState('');

  const loadOrders = async () => {
    setStatus('loading');
    setLoadError('');
    try {
      const data = await getOrders();
      setOrders(data);
      setStatus('succeeded');
    } catch (error) {
      setStatus('failed');
      setLoadError(error?.message || 'Failed to load customer data.');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const customers = useMemo(() => {
    const grouped = new Map();

    orders.forEach((order) => {
      const key = order.phone || 'unknown';
      const existing = grouped.get(key);

      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += order.total || 0;
      } else {
        grouped.set(key, {
          phone: order.phone,
          name: order.customerName,
          wilaya: order.wilaya,
          orderCount: 1,
          totalSpent: order.total || 0,
        });
      }
    });

    return Array.from(grouped.values()).sort(
      (a, b) => b.totalSpent - a.totalSpent
    );
  }, [orders]);

  const isInitialLoading = status === 'loading' && orders.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Customers
        </h1>
        <p className="mt-1 text-sm text-[#374151]">
          {customers.length} customer{customers.length !== 1 ? 's' : ''}{' '}
          derived from order history
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-[#2563eb]" />
        <p className="text-sm text-[#374151]">
          This is a preliminary view built from order history, since the
          store currently checks out guests only. A full customer account
          and management system will be added once a backend is connected.
        </p>
      </div>

      {isInitialLoading ? (
        <Card padding="none" hoverEffect={false}>
          <Loading label="Loading customers..." />
        </Card>
      ) : status === 'failed' && orders.length === 0 ? (
        <Card
          padding="lg"
          hoverEffect={false}
          className="flex flex-col items-center gap-4 text-center"
        >
          <AlertTriangle size={32} className="text-red-500" />
          <div>
            <p className="text-base font-semibold text-[#111827]">
              Failed to load customer data
            </p>
            <p className="mt-1 text-sm text-[#374151]">
              {loadError || 'Something went wrong. Please try again.'}
            </p>
          </div>
          <Button variant="primary" onClick={loadOrders}>
            Retry
          </Button>
        </Card>
      ) : (
        <Card padding="none" hoverEffect={false} className="overflow-hidden">
          {customers.length === 0 ? (
            <p className="px-6 py-14 text-center text-sm text-[#374151]">
              No customer data yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e5e7eb] text-xs font-semibold uppercase tracking-wide text-[#374151]/70">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Wilaya</th>
                    <th className="px-6 py-3">Orders</th>
                    <th className="px-6 py-3">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.phone}
                      className="border-b border-[#e5e7eb] text-sm last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-[#111827]">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 text-[#374151]">
                        {customer.phone}
                      </td>
                      <td className="px-6 py-4 text-[#374151]">
                        {customer.wilaya}
                      </td>
                      <td className="px-6 py-4 text-[#374151]">
                        {customer.orderCount}
                      </td>
                      <td className="px-6 py-4 font-medium text-[#111827]">
                        {formatPrice(customer.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default AdminCustomers;