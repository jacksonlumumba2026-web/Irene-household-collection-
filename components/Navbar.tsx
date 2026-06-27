'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/data';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories', megaMenu: true },
  { label: 'Collections', href: '#collections' },
  { label: 'Offers', href: '#offers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const textColor = scrolled ? 'text-ink' : 'text-white';
  const subTextColor = scrolled ? 'text-ink/60' : 'text-white/70';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass shadow-glass py-3' : 'bg-transparent py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link href="#home" className="flex flex-col leading-none">
            <span className={cn('font-heading text-2xl font-bold tracking-tight transition-colors duration-500', textColor)}>
              Iren<span className="text-gold">e</span>
            </span>
            <span
              className={cn(
                'mt-0.5 font-accent text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-500',
                subTextColor
              )}
            >
              Household Collection
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) =>
              link.megaMenu ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 font-accent text-sm font-medium transition-colors duration-300 hover:text-gold',
                      textColor
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform duration-300', megaOpen && 'rotate-180')}
                    />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4"
                      >
                        <div className="glass shadow-premium rounded-2xl border border-white/40 p-6">
                          <div className="grid grid-cols-4 gap-4">
                            {categories.map((category) => (
                              <Link
                                key={category.id}
                                href={`#category-${category.id}`}
                                onClick={() => setMegaOpen(false)}
                                className="group flex flex-col overflow-hidden rounded-xl bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                              >
                                <div className="relative h-20 w-full overflow-hidden">
                                  <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="160px"
                                  />
                                </div>
                                <div className="p-2.5">
                                  <p className="font-heading text-xs font-semibold text-ink">{category.name}</p>
                                  <p className="font-accent text-[10px] text-ink/50">{category.productCount} items</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'font-accent text-sm font-medium transition-colors duration-300 hover:text-gold',
                      textColor
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right icons */}
          <div className="hidden items-center gap-5 lg:flex">
            <button aria-label="Search" className={cn('transition-colors duration-300 hover:text-gold', textColor)}>
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Wishlist" className={cn('transition-colors duration-300 hover:text-gold', textColor)}>
              <Heart className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className={cn('relative transition-colors duration-300 hover:text-gold', textColor)}>
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink shadow-gold">
                2
              </span>
            </button>
            <button aria-label="Account" className={cn('transition-colors duration-300 hover:text-gold', textColor)}>
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn('lg:hidden transition-colors duration-300', textColor)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/98 px-8 pt-28 lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-2xl font-semibold text-white transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-8 border-t border-white/10 py-8">
              <button aria-label="Search" className="text-white transition-colors hover:text-gold">
                <Search className="h-5 w-5" />
              </button>
              <button aria-label="Wishlist" className="text-white transition-colors hover:text-gold">
                <Heart className="h-5 w-5" />
              </button>
              <button aria-label="Cart" className="relative text-white transition-colors hover:text-gold">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                  2
                </span>
              </button>
              <button aria-label="Account" className="text-white transition-colors hover:text-gold">
                <User className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
