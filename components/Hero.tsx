'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown, Check } from 'lucide-react';
import { whatsappLink } from '@/lib/data';

const HEADLINE_LINES = ['Transform Your House', 'Into Your Dream Home'];

const TRUST_BADGES = [
  { id: 'delivery', text: 'Nationwide Delivery', position: 'left-6 bottom-40 lg:left-10 lg:bottom-44', float: 'animate-float-slow' },
  { id: 'payments', text: 'Secure Payments', position: 'right-6 bottom-56 lg:right-12 lg:bottom-60', float: 'animate-float-slower' },
  { id: 'reviews', text: '5-Star Customer Reviews', position: 'left-10 bottom-14 lg:left-24 lg:bottom-16', float: 'animate-float-slower' },
  { id: 'quality', text: 'Quality Guaranteed', position: 'right-10 bottom-16 lg:right-28 lg:bottom-20', float: 'animate-float-slow' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

interface Particle {
  id: number;
  size: number;
  top: string;
  left: string;
  delay: number;
  gold: boolean;
  float: string;
}

function useParticles(): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: 4 + ((i * 7) % 14),
        top: `${(i * 13.7) % 100}%`,
        left: `${(i * 23.3) % 100}%`,
        delay: (i % 6) * 0.7,
        gold: i % 3 === 0,
        float: i % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower',
      })),
    []
  );
}

export default function Hero() {
  const particles = useParticles();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
        alt="Elegant modern living room interior"
        fill
        priority
        className="object-cover animate-zoom-slow"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />

      {/* Ambient floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full blur-sm ${p.float} ${p.gold ? 'bg-gold/40' : 'bg-white/30'}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="mb-6 rounded-full border border-white/30 bg-white/10 px-5 py-2 font-accent text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm"
        >
          Premium Home D&eacute;cor &middot; Kenya
        </motion.span>

        <h1 className="mb-6 max-w-5xl font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {HEADLINE_LINES.map((line, i) => (
            <motion.span key={line} variants={itemVariants} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-balance font-body text-base font-light text-white/80 sm:text-lg"
        >
          Premium furniture, home d&eacute;cor, kitchen essentials, curtains, mirrors, lighting and accessories
          delivered across Kenya.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#shop"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gold px-8 py-4 font-accent text-sm font-semibold text-ink shadow-gold transition-shadow duration-300 hover:shadow-xl"
          >
            Shop Collection
          </motion.a>

          <motion.a
            href={whatsappLink("Hi! I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glass flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-accent text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Order
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating trust badges */}
      {TRUST_BADGES.map((badge, i) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
          className={`absolute z-10 hidden sm:block ${badge.position}`}
        >
          <div className={`glass flex items-center gap-2 rounded-full px-4 py-2.5 shadow-glass ${badge.float}`}>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="whitespace-nowrap font-accent text-xs font-medium text-ink">{badge.text}</span>
          </div>
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-accent text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
