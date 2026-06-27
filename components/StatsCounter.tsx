'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/lib/data';

const COUNT_DURATION_MS = 1800;

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-gradient-gold font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
        {count.toLocaleString('en-KE')}
        {suffix}
      </span>
      <span className="mt-2 font-accent text-xs uppercase tracking-[0.2em] text-ink/50 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatItem key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </motion.div>
    </section>
  );
}
