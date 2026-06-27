'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, ShoppingCart, MessageCircle, Star } from 'lucide-react';
import { cn, formatKES } from '@/lib/utils';
import { whatsappLink } from '@/lib/data';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const isDiscount = product.badge?.startsWith('-');
  const lowStock = product.inStock && typeof product.stockCount === 'number' && product.stockCount <= 8;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-glass transition-all duration-500 hover:-translate-y-1 hover:shadow-premium">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-mist">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            'object-cover transition-opacity duration-700',
            product.hoverImage && 'group-hover:opacity-0'
          )}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {product.badge && (
          <span
            className={cn(
              'absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-accent text-[10px] font-semibold uppercase tracking-wide shadow-sm',
              isDiscount ? 'bg-red-600 text-white' : 'bg-gold text-ink'
            )}
          >
            {product.badge}
          </span>
        )}

        <button
          aria-label="Toggle wishlist"
          onClick={() => setWishlisted((v) => !v)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 translate-y-[-8px] items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-glass transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold hover:text-ink"
        >
          <Heart className={cn('h-4 w-4', wishlisted && 'fill-current text-red-500')} />
        </button>

        <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/10 group-hover:opacity-100">
          <button className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 font-accent text-xs font-semibold uppercase tracking-wide text-ink shadow-glass transition-transform duration-300 hover:scale-105">
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink/60">
            <span className="rounded-full bg-white px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-wide text-ink">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2 font-accent text-xs font-semibold uppercase tracking-wide text-white shadow-glass transition-colors duration-300 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <a
            href={whatsappLink(`Hi, I'm interested in ${product.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy via WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-glass transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="font-accent text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
          {product.category}
        </span>
        <h3 className="font-heading text-base font-semibold text-ink">{product.name}</h3>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3.5 w-3.5 rounded-sm',
                  i < Math.round(product.rating) ? 'fill-gold text-gold' : 'fill-mist text-mist'
                )}
              />
            ))}
          </div>
          <span className="font-accent text-xs text-ink/50">({product.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="font-heading text-lg font-bold text-ink">{formatKES(product.price)}</span>
          {product.oldPrice && (
            <span className="font-accent text-sm text-ink/40 line-through">{formatKES(product.oldPrice)}</span>
          )}
        </div>

        {lowStock && (
          <span className="font-accent text-xs font-semibold text-red-600">
            Only {product.stockCount} left!
          </span>
        )}
      </div>
    </div>
  );
}
