'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { newArrivals } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function NewArrivals() {
  const categoryList = useMemo(
    () => ['All', ...Array.from(new Set(newArrivals.map((p) => p.category)))],
    []
  );
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = useMemo(
    () => (activeFilter === 'All' ? newArrivals : newArrivals.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Just Landed
        </span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">New Arrivals</h2>
        <p className="mt-3 font-body text-sm text-ink/60 sm:text-base">
          The latest additions to our collection, fresh from our artisans and partners.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {categoryList.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              'relative rounded-full px-5 py-2 font-accent text-xs font-semibold uppercase tracking-wide transition-colors duration-300',
              activeFilter === category ? 'text-ink' : 'text-ink/50 hover:text-ink'
            )}
          >
            {activeFilter === category && (
              <motion.span
                layoutId="new-arrivals-pill"
                className="absolute inset-0 rounded-full bg-gold shadow-gold"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
