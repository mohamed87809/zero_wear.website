// src/pages/admin/AdminDashboard.jsx

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Clock,
  DollarSign,
  Package,
  AlertTriangle,
} from 'lucide-react';

import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { Spinner } from '../../components/ui/Loading.jsx';

import { getOrders } from '../../services/ordersService.js';
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
} from '../../redux/features/productsSlice.js';

const statusVariant = {
  Pending: 'default',
  Confirmed: 'accent',
  Shipping: 'accent',
  Delivered: 'success',
  Cancelled: 'danger',
};

function formatPrice(value) {
  return `${(value || 0).toLocaleString('en-US')} DZD`;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function AdminDashboard() {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [ordersStatus, setOrdersStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'

  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);

  useEffect(() => {
    const loadOrders = async () => {
      setOrdersStatus('loading');
      try {
        const data = await getOrders();
        setOrders(data);
        setOrdersStatus('succeeded');
      } catch {
        setOrdersStatus('failed');
      }
    };

    loadOrders();

    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.stock <= 10).length;

    return {
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalProducts,
      lowStockProducts,
    };
  }, [orders, products]);

  const recentOrders = orders.slice(0, 5);
  const isLoadingOrders = ordersStatus === 'loading' && orders.length === 0;

  const statCards = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      label: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
    },
    {
      label: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
    },
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#374151]">
          Overview of your store's performance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="md" hoverEffect={false}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#374151]">
                    {stat.label}
                  </p>
                  {isLoadingOrders && stat.label !== 'Total Products' ? (
                    <div className="mt-2">
                      <Spinner size="sm" />
                    </div>
                  ) : (
                    <p className="mt-1 text-2xl font-bold text-[#111827]">
                      {stat.value}
                    </p>
                  )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                  <Icon size={18} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Low stock warning */}
      {stats.lowStockProducts > 0 && (
        <Card
          padding="md"
          hoverEffect={false}
          className="flex items-center gap-3 border-yellow-200 bg-yellow-50"
        >
          <AlertTriangle size={18} className="shrink-0 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            {stats.lowStockProducts} product
            {stats.lowStockProducts !== 1 ? 's' : ''} running low on stock.{' '}
            <Link to="/admin/products" className="font-semibold underline">
              Review products
            </Link>
          </p>
        </Card>
      )}

      {/* Recent orders */}
      <Card padding="none" hoverEffect={false} className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
          <h2 className="text-base font-semibold text-[#111827]">
            Recent Orders
          </h2>
          <Link
            to="/admin/orders"
            className="text-sm font-medium text-[#2563eb] hover:underline"
          >
            View All
          </Link>
        </div>

        {isLoadingOrders ? (
          <div className="flex items-center justify-center px-6 py-10">
            <Spinner size="md" />
          </div>
        ) : recentOrders.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[#374151]">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-xs font-semibold uppercase tracking-wide text-[#374151]/70">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#e5e7eb] text-sm last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-[#111827]">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-[#374151]">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-[#374151]">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#111827]">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant[order.status] || 'default'}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default AdminDashboard;