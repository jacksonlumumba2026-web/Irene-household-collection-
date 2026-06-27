'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { galleryImages } from '@/lib/data';
import type { GalleryImage } from '@/types';

const HEIGHT_CLASSES: Record<GalleryImage['height'], string> = {
  short: 'aspect-[4/3]',
  medium: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
};

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-gold/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Lifestyle Gallery
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink lg:text-4xl">
            Get Inspired
          </h2>
        </div>

        <div className="columns-2 gap-4 md:columns-3">
          {galleryImages.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setSelected(item)}
                className={cn(
                  'group relative w-full overflow-hidden rounded-2xl bg-mist shadow-glass',
                  HEIGHT_CLASSES[item.height]
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-heading text-sm font-semibold text-white">{item.title}</p>
                  <span className="mt-1.5 flex items-center gap-1.5 font-accent text-xs font-medium uppercase tracking-wide text-gold-light">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6"
          >
            <button
              aria-label="Close gallery image"
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] max-w-4xl flex-col items-center gap-4"
            >
              <div className="relative max-h-[85vh] w-full">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  width={1200}
                  height={1200}
                  sizes="100vw"
                  className="max-h-[85vh] w-auto rounded-2xl object-contain"
                />
              </div>
              <p className="font-heading text-lg font-medium text-white">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
