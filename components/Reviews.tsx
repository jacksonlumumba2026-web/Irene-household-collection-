'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { reviews } from '@/lib/data';

const AUTO_ADVANCE_MS = 5000;

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isHovering = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering.current) return;
      setDirection(1);
      setActiveIndex((i) => (i + 1) % reviews.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % reviews.length);
  };

  const active = reviews[activeIndex];

  return (
    <section className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-gold/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Customer Reviews
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink lg:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
        >
          <button
            aria-label="Previous review"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 text-ink shadow-glass transition-all duration-300 hover:bg-gold hover:text-ink md:flex lg:-translate-x-14"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Next review"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 text-ink shadow-glass transition-all duration-300 hover:bg-gold hover:text-ink md:flex lg:translate-x-14"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-premium lg:p-14">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-gold/10 lg:h-20 lg:w-20" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-full ring-4 ring-gold/20">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < active.rating ? 'fill-gold text-gold' : 'fill-mist text-mist'
                      )}
                    />
                  ))}
                </div>

                <p className="max-w-2xl font-heading text-lg leading-relaxed text-ink/80 lg:text-xl">
                  &ldquo;{active.text}&rdquo;
                </p>

                <div className="mt-6">
                  <p className="font-heading text-base font-semibold text-ink">{active.name}</p>
                  <p className="font-accent text-sm text-ink/50">{active.location}</p>
                </div>

                {active.product && (
                  <span className="mt-4 rounded-full bg-beige px-4 py-1.5 font-accent text-xs font-medium uppercase tracking-wide text-ink/60">
                    {active.product}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                aria-label={`Go to review ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-8 bg-gold' : 'w-2.5 bg-ink/15 hover:bg-ink/30'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
