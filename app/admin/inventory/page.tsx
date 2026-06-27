'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { inventory } from '@/lib/admin-data';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

function inventoryStatus(stockCount: number, lowStockThreshold: number) {
  if (stockCount === 0) return 'out of stock';
  if (stockCount <= lowStockThreshold) return 'low stock';
  return 'in stock';
}

export default function AdminInventoryPage() {
  const [query, setQuery] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const filteredInventory = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventory.filter((item) => {
      const matchesQuery =
        !q ||
        item.productName.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);
      const matchesLowStock = !lowStockOnly || item.stockCount <= item.lowStockThreshold;
      return matchesQuery && matchesLowStock;
    });
  }, [query, lowStockOnly]);

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Inventory
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Monitor stock levels and stay ahead of restocks.
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
            placeholder="Search by product name or SKU..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <button
          onClick={() => setLowStockOnly((v) => !v)}
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors shrink-0',
            lowStockOnly
              ? 'bg-gold text-ink shadow-gold'
              : 'bg-mist dark:bg-white/5 text-ink/60 dark:text-white/60 hover:bg-beige dark:hover:bg-white/10'
          )}
        >
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              lowStockOnly ? 'bg-ink' : 'bg-ink/30 dark:bg-white/30'
            )}
          />
          Low stock only
        </button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="text-left text-ink/40 dark:text-white/40 text-xs uppercase tracking-wide border-b border-ink/10 dark:border-white/10">
                <th className="px-5 py-3.5 font-medium">Product</th>
                <th className="px-5 py-3.5 font-medium">SKU</th>
                <th className="px-5 py-3.5 font-medium">Category</th>
                <th className="px-5 py-3.5 font-medium">Stock</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const status = inventoryStatus(item.stockCount, item.lowStockThreshold);
                return (
                  <tr
                    key={item.productId}
                    className="border-b border-ink/5 dark:border-white/5 last:border-b-0 hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-mist dark:bg-white/10">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <p className="font-medium text-ink dark:text-white">{item.productName}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink/60 dark:text-white/60 whitespace-nowrap">
                      {item.sku}
                    </td>
                    <td className="px-5 py-3.5 text-ink/60 dark:text-white/60 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-5 py-3.5 font-heading font-semibold text-ink dark:text-white">
                      {item.stockCount}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="px-5 py-16 text-center text-sm text-ink/40 dark:text-white/40">
            No inventory items match your search.
          </div>
        )}
      </motion.div>
    </div>
  );
}
