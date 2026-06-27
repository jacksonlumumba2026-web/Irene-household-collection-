'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { customers } from '@/lib/admin-data';
import { formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

export default function CustomersPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Customers
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          {customers.length} customers have shopped with Irene Household Collection.
        </p>
      </motion.div>

      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 pl-9 pr-4 py-2.5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fadeUp}
            className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 shadow-premium flex flex-col"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gold/30">
                <Image
                  src={customer.avatar}
                  alt={customer.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-semibold text-ink dark:text-white truncate">
                  {customer.name}
                </p>
                <p className="text-xs text-ink/40 dark:text-white/40">{customer.id}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-ink/60 dark:text-white/60">
              <p className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-gold-dark dark:text-gold shrink-0" />
                <span className="truncate">{customer.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-dark dark:text-gold shrink-0" />
                {customer.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-dark dark:text-gold shrink-0" />
                {customer.location}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-ink/10 dark:border-white/10 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="flex items-center gap-1.5 text-xs text-ink/40 dark:text-white/40">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Orders
                </p>
                <p className="font-heading font-semibold text-ink dark:text-white mt-0.5">
                  {customer.totalOrders}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink/40 dark:text-white/40">Total Spent</p>
                <p className="font-heading font-semibold text-gold-dark dark:text-gold mt-0.5">
                  {formatKES(customer.totalSpent)}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-ink/40 dark:text-white/40">
              Joined {customer.joinedDate}
            </p>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-10 text-center text-sm text-ink/50 dark:text-white/50">
          No customers match &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  );
}
