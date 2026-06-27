'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Bell, Sun, Moon, Menu, X, Gem } from 'lucide-react';
import { useAdminTheme } from './AdminThemeProvider';
import { adminNavLinks } from './nav-links';
import { messages } from '@/lib/admin-data';
import { cn } from '@/lib/utils';

export default function Topbar() {
  const { isDark, toggle } = useAdminTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-4 h-20 px-4 sm:px-6 border-b border-ink/10 dark:border-white/10 bg-white/90 dark:bg-ink/90 backdrop-blur">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-ink dark:text-white hover:bg-mist dark:hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-white/40" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <div className="flex-1 sm:hidden" />

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2.5 rounded-xl text-ink dark:text-white hover:bg-mist dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <button
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-ink dark:text-white hover:bg-mist dark:hover:bg-white/10 transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-[10px] font-bold text-ink flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-ink/10 dark:border-white/10">
            <div className="w-9 h-9 rounded-full bg-gold/20 text-gold-dark dark:text-gold flex items-center justify-center font-heading font-bold text-sm">
              IK
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-ink dark:text-white">Irene K.</p>
              <p className="text-xs text-ink/50 dark:text-white/50">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-ink p-4 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-2">
                  <Gem className="w-6 h-6 text-gold" />
                  <span className="font-heading font-bold text-ink dark:text-white">
                    Irene<span className="text-gold">.</span> Admin
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-ink dark:text-white hover:bg-mist dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {adminNavLinks.map(({ href, label, icon: Icon }) => {
                  const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        active
                          ? 'bg-gold/10 text-gold-dark dark:text-gold'
                          : 'text-ink/60 dark:text-white/60 hover:bg-mist dark:hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
