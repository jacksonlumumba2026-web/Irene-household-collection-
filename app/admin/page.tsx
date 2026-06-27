'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wallet, ShoppingCart, Users, Package } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { orders, revenueData, topProducts, dashboardStats } from '@/lib/admin-data';
import { formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const recentOrders = [...orders].slice(-5).reverse();

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Welcome back, here&rsquo;s what&rsquo;s happening today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: formatKES(dashboardStats.totalRevenue),
            changePct: dashboardStats.revenueChangePct,
            icon: Wallet,
          },
          {
            label: 'Total Orders',
            value: dashboardStats.totalOrders.toLocaleString('en-KE'),
            changePct: dashboardStats.ordersChangePct,
            icon: ShoppingCart,
          },
          {
            label: 'Total Customers',
            value: dashboardStats.totalCustomers.toLocaleString('en-KE'),
            changePct: dashboardStats.customersChangePct,
            icon: Users,
          },
          {
            label: 'Total Products',
            value: dashboardStats.totalProducts.toLocaleString('en-KE'),
            changePct: dashboardStats.productsChangePct,
            icon: Package,
          },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
              Revenue Trend
            </h2>
            <p className="text-sm text-ink/50 dark:text-white/50">Monthly revenue, Jan &ndash; Jun</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink/10 dark:text-white/10" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-ink/50 dark:text-white/50"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                className="text-ink/50 dark:text-white/50"
                tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
                width={48}
              />
              <Tooltip
                formatter={(value: number) => [formatKES(value), 'Revenue']}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgba(17,17,17,0.1)',
                  background: '#fff',
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#A8842A"
                strokeWidth={2.5}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeUp}
          className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
        >
          <h2 className="font-heading text-lg font-semibold text-ink dark:text-white mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="text-left text-ink/40 dark:text-white/40 text-xs uppercase tracking-wide">
                  <th className="px-2 py-2 font-medium">Customer</th>
                  <th className="px-2 py-2 font-medium">Total</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                  <th className="px-2 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-ink/5 dark:border-white/5 hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-2 py-3">
                      <p className="font-medium text-ink dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-ink/40 dark:text-white/40">{order.id}</p>
                    </td>
                    <td className="px-2 py-3 font-heading font-semibold text-ink dark:text-white whitespace-nowrap">
                      {formatKES(order.total)}
                    </td>
                    <td className="px-2 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-2 py-3 text-ink/50 dark:text-white/50 whitespace-nowrap">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={7}
          variants={fadeUp}
          className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
        >
          <h2 className="font-heading text-lg font-semibold text-ink dark:text-white mb-4">
            Top Products
          </h2>
          <ul className="space-y-3">
            {topProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-mist dark:bg-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-ink/40 dark:text-white/40">
                    {product.category} &middot; {product.unitsSold} sold
                  </p>
                </div>
                <p className="font-heading font-semibold text-gold-dark dark:text-gold whitespace-nowrap">
                  {formatKES(product.revenue)}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
