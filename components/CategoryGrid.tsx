'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Explore
        </span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">Shop by Category</h2>
        <p className="mt-3 font-body text-sm text-ink/60 sm:text-base">
          Curated collections spanning every corner of the home, crafted for those who appreciate quiet luxury.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-glass transition-shadow duration-500 hover:shadow-premium sm:rounded-3xl"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent transition-colors duration-500 group-hover:from-ink/85" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">{category.name}</h3>
              <p className="font-accent text-xs text-white/75">{category.productCount} Products</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
