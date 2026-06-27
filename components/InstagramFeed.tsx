'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { instagramPosts } from '@/lib/data';

export default function InstagramFeed() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-gold/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Follow Us
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink lg:text-4xl">
            Follow Us on Instagram
          </h2>
          <p className="mt-3 font-body text-sm text-ink/50">@ireneHouseholdCollection</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((src, index) => (
            <motion.a
              key={src}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="Irene Household Collection Instagram post"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
                <span className="font-accent text-xs font-semibold uppercase tracking-wide text-white">
                  View Post
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
