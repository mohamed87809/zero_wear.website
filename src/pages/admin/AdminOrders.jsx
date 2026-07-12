// src/pages/admin/AdminOrders.jsx

import { useEffect, useMemo, useState } from 'react';
import { Eye, Trash2, Check, X as XIcon } from 'lucide-react';

import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../../utils/localOrdersStorage.js';

const statusVariant = {
  Pending: 'default',
  Confirmed: 'accent',
  Shipping: 'accent',
  Delivered: 'success',
  Cancelled: 'danger',
};

const statusFlow = ['Pending', 'Confirmed', 'Shipping', 'Delivered'];

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

/**
 * Returns only the status actions that make sense given the order's
 * current status — prevents nonsensical backward jumps or actions
 * on already-finalized orders.
 */
function getAvailableActions(currentStatus) {
  if (currentStatus === 'Cancelled' || currentStatus === 'Delivered') {
    return [];
  }

  const currentIndex = statusFlow.indexOf(currentStatus);
  return statusFlow.slice(currentIndex + 1);
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingOrder, setViewingOrder] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadOrders = () => {
    setOrders(getAllOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (statusFilter !== 'All') {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.customerName?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [orders, statusFilter, searchTerm]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const handleCancel = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
    loadOrders();
  };

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
    setConfirmDeleteId(null);
    loadOrders();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-[#374151]">
          {orders.length} total order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by order ID or customer name..."
          className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#374151]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] sm:max-w-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipping">Shipping</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders table */}
      <Card padding="none" hoverEffect={false} className="overflow-hidden">
        {filteredOrders.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm text-[#374151]">
            No orders found.
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
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const availableActions = getAvailableActions(order.status);
                  const isConfirmingDelete = confirmDeleteId === order.id;

                  return (
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
                      <td className="px-6 py-4">
                        {isConfirmingDelete ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-[#374151]">
                              Delete this order?
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDelete(order.id)}
                              className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="rounded-lg border border-[#e5e7eb] px-2.5 py-1 text-xs font-semibold text-[#111827] hover:bg-[#f9fafb]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setViewingOrder(order)}
                              aria-label="View details"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#374151] hover:bg-[#f9fafb] hover:text-[#111827]"
                            >
                              <Eye size={16} />
                            </button>

                            {availableActions.map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(order.id, status)}
                                className="rounded-lg border border-[#e5e7eb] px-2.5 py-1.5 text-xs font-medium text-[#111827] transition-colors hover:bg-[#f9fafb]"
                              >
                                Mark {status}
                              </button>
                            ))}

                            {order.status !== 'Cancelled' &&
                              order.status !== 'Delivered' && (
                                <button
                                  type="button"
                                  onClick={() => handleCancel(order.id)}
                                  aria-label="Cancel order"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                                >
                                  <XIcon size={16} />
                                </button>
                              )}

                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(order.id)}
                              aria-label="Delete order"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#374151] hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* View details modal */}
      <Modal
        isOpen={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        title={viewingOrder ? `Order ${viewingOrder.id}` : ''}
        maxWidth="lg"
      >
        {viewingOrder && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Badge variant={statusVariant[viewingOrder.status] || 'default'}>
                {viewingOrder.status}
              </Badge>
              <span className="text-xs text-[#374151]/70">
                {formatDate(viewingOrder.createdAt)}
              </span>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#374151]/70">
                Customer
              </p>
              <p className="text-sm font-semibold text-[#111827]">
                {viewingOrder.customerName}
              </p>
              <p className="text-sm text-[#374151]">{viewingOrder.phone}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#374151]/70">
                Shipping Address
              </p>
              <p className="text-sm text-[#374151]">
                {viewingOrder.address}, {viewingOrder.commune},{' '}
                {viewingOrder.wilaya}
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#e5e7eb] pt-4">
              {viewingOrder.items?.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f9fafb]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-[#111827]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#374151]/70">
                      {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#111827]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
              <span className="text-base font-semibold text-[#111827]">
                Total
              </span>
              <span className="text-lg font-bold text-[#111827]">
                {formatPrice(viewingOrder.total)}
              </span>
            </div>

            <Button variant="outline" onClick={() => setViewingOrder(null)}>
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminOrders;