'use client';

import { motion } from 'framer-motion';
import { Truck, BadgePercent, Gem, ShieldCheck, Headset } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Swift, reliable shipping straight to your door.',
  },
  {
    icon: BadgePercent,
    title: 'Affordable Prices',
    description: 'Premium decor without the premium markup.',
  },
  {
    icon: Gem,
    title: 'Premium Quality',
    description: 'Curated pieces built to last a lifetime.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Your transactions are always safe with us.',
  },
  {
    icon: Headset,
    title: 'Excellent Support',
    description: 'Friendly help whenever you need it most.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-beige py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-gold/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Our Promise
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink lg:text-4xl">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-heading text-base font-bold text-ink">{feature.title}</h3>
                <p className="mt-1.5 font-accent text-xs text-ink/55">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
