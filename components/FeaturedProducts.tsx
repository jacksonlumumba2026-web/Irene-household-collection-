'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Editor&apos;s Pick
        </span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">Featured Products</h2>
        <p className="mt-3 font-body text-sm text-ink/60 sm:text-base">
          A handpicked selection of our most coveted pieces, chosen for their craftsmanship and timeless design.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
