'use client';

import { useEffect, useState } from 'react';
import { Flame, Clock } from 'lucide-react';
import { flashSaleProducts, whatsappLink } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 1000 * 60 * 60 * 48;
    setTimeLeft(getTimeLeft(target));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <span className="inline-flex items-center gap-2 font-accent text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Flame className="h-4 w-4" />
              Flash Sale
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Limited-Time <span className="text-gradient-gold">Offers</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-sm text-white/60 sm:text-base">
              Premium pieces at irresistible prices. Once the clock runs out, they&apos;re gone for good.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Clock className="hidden h-6 w-6 text-gold sm:block" />
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex h-20 w-16 flex-col items-center justify-center rounded-xl bg-white/10 sm:h-24 sm:w-20"
              >
                <span className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-1 font-accent text-[10px] uppercase tracking-wide text-white/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={whatsappLink('Hi, I would like to shop the Flash Sale items')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-8 py-3.5 font-accent text-sm font-semibold uppercase tracking-wide text-ink shadow-gold transition-transform duration-300 hover:scale-105"
          >
            Shop Flash Sale
          </a>
        </div>
      </div>
    </section>
  );
}
