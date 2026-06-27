'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { revenueData, categoryBreakdown } from '@/lib/admin-data';
import { formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const PIE_COLORS = ['#D4AF37', '#111111', '#E5D6BC', '#A8842A', '#8C8C88', '#E8CA6B'];

const totalRevenue = revenueData.reduce((sum, r) => sum + r.revenue, 0);
const totalOrders = revenueData.reduce((sum, r) => sum + r.orders, 0);
const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
const bestMonth = revenueData.reduce(
  (best, point) => (point.revenue > best.revenue ? point : best),
  revenueData[0]
);

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Reports
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          A closer look at sales performance and category mix.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="lg:col-span-2 rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
        >
          <h2 className="font-heading text-lg font-semibold text-ink dark:text-white mb-1">
            Sales Over Time
          </h2>
          <p className="text-sm text-ink/50 dark:text-white/50 mb-4">
            Revenue and order volume, Jan &ndash; Jun
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-ink/10 dark:text-white/10"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-ink/50 dark:text-white/50"
                />
                <YAxis
                  yAxisId="revenue"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-ink/50 dark:text-white/50"
                  tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
                  width={48}
                />
                <YAxis
                  yAxisId="orders"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-ink/50 dark:text-white/50"
                  width={40}
                />
                <Tooltip
                  formatter={(value: number, name: string) =>
                    name === 'revenue' ? [formatKES(value), 'Revenue'] : [value, 'Orders']
                  }
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid rgba(17,17,17,0.1)',
                    background: '#fff',
                    fontSize: 13,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="revenue"
                  dataKey="revenue"
                  name="Revenue"
                  fill="#D4AF37"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
                <Line
                  yAxisId="orders"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#111111"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
        >
          <h2 className="font-heading text-lg font-semibold text-ink dark:text-white mb-1">
            Category Breakdown
          </h2>
          <p className="text-sm text-ink/50 dark:text-white/50 mb-4">Products by category</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid rgba(17,17,17,0.1)',
                    background: '#fff',
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-2">
            {categoryBreakdown.map((entry, index) => (
              <li key={entry.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/70 dark:text-white/70">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  {entry.name}
                </span>
                <span className="font-medium text-ink dark:text-white">{entry.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 shadow-premium">
          <p className="text-sm text-ink/50 dark:text-white/50">Total Revenue (Jan &ndash; Jun)</p>
          <p className="mt-2 font-heading text-2xl font-bold text-ink dark:text-white">
            {formatKES(totalRevenue)}
          </p>
        </div>
        <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 shadow-premium">
          <p className="text-sm text-ink/50 dark:text-white/50">Average Order Value</p>
          <p className="mt-2 font-heading text-2xl font-bold text-gold-dark dark:text-gold">
            {formatKES(Math.round(averageOrderValue))}
          </p>
        </div>
        <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 shadow-premium">
          <p className="text-sm text-ink/50 dark:text-white/50">Best Month</p>
          <p className="mt-2 font-heading text-2xl font-bold text-ink dark:text-white">
            {bestMonth.label} <span className="text-base font-normal text-ink/40 dark:text-white/40">&middot; {formatKES(bestMonth.revenue)}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
