'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';

export default function Story() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&q=80"
                alt="Beautifully styled Kenyan home interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="rounded-full bg-gold/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Our Story
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-ink lg:text-4xl">
              Crafting Beautiful Homes Across Kenya
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ink/60">
              Irene Household Collection was founded on a simple belief: every Kenyan home deserves
              access to premium décor without compromise. For over a decade, we have travelled,
              sourced, and curated pieces that bring warmth, character, and quiet luxury into
              living spaces across the country &mdash; from Nairobi apartments to Coastal villas.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/60">
              Our vision is to become East Africa&apos;s most trusted name in home décor, blending
              timeless craftsmanship with accessible pricing. Every piece in our collection is
              chosen with the same question in mind: will this make a house feel like home?
            </p>
            <div className="mt-10">
              <StatsCounter />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
