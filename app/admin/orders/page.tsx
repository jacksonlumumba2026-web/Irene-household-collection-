'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { orders } from '@/lib/admin-data';
import { OrderStatus } from '@/types/admin';
import { cn, formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const statusFilters: Array<OrderStatus | 'all'> = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export default function AdminOrdersPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery =
        !q ||
        order.customerName.toLowerCase().includes(q) ||
        order.id.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Orders
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Track and manage customer orders across all channels.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center gap-3"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer name or order ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-colors',
                statusFilter === status
                  ? 'bg-gold text-ink shadow-gold'
                  : 'bg-mist dark:bg-white/5 text-ink/60 dark:text-white/60 hover:bg-beige dark:hover:bg-white/10'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-ink/40 dark:text-white/40 text-xs uppercase tracking-wide border-b border-ink/10 dark:border-white/10">
                <th className="px-5 py-3.5 font-medium">Order ID</th>
                <th className="px-5 py-3.5 font-medium">Customer</th>
                <th className="px-5 py-3.5 font-medium">Items</th>
                <th className="px-5 py-3.5 font-medium">Total</th>
                <th className="px-5 py-3.5 font-medium">Payment</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                return (
                  <tr
                    key={order.id}
                    className="border-b border-ink/5 dark:border-white/5 last:border-b-0 hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-ink dark:text-white whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-ink dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-ink/40 dark:text-white/40">{order.customerEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-ink/60 dark:text-white/60 whitespace-nowrap">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-5 py-4 font-heading font-semibold text-ink dark:text-white whitespace-nowrap">
                      {formatKES(order.total)}
                    </td>
                    <td className="px-5 py-4 text-ink/60 dark:text-white/60 whitespace-nowrap">
                      {order.paymentMethod}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-ink/50 dark:text-white/50 whitespace-nowrap">
                      {order.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="px-5 py-16 text-center text-sm text-ink/40 dark:text-white/40">
            No orders match your search.
          </div>
        )}
      </motion.div>
    </div>
  );
}
