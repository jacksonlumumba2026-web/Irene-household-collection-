'use client';

import { bestSellers } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function BestSellers() {
  const loopProducts = [...bestSellers, ...bestSellers];

  return (
    <section className="overflow-hidden bg-beige py-20">
      <div className="mx-auto mb-12 max-w-2xl px-6 text-center">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Customer Favorites
        </span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">Best Sellers</h2>
        <p className="mt-3 font-body text-sm text-ink/60 sm:text-base">
          The pieces our customers can&apos;t stop talking about.
        </p>
      </div>

      <div className="group relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-beige to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-beige to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {loopProducts.map((product, i) => (
            <div key={`${product.id}-${i}`} className="min-w-[280px] max-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
