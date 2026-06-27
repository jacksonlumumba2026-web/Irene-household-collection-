'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gem } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminNavLinks as links } from './nav-links';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-ink/10 dark:border-white/10 bg-white dark:bg-ink/80 min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 h-20 border-b border-ink/10 dark:border-white/10">
        <Gem className="w-6 h-6 text-gold" />
        <div className="leading-tight">
          <p className="font-heading font-bold text-ink dark:text-white">
            Irene<span className="text-gold">.</span>
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-ink/50 dark:text-white/50">Admin</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-gold/10 text-gold-dark dark:text-gold'
                  : 'text-ink/60 dark:text-white/60 hover:bg-mist dark:hover:bg-white/5 hover:text-ink dark:hover:text-white'
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-ink to-gold-dark text-white">
        <p className="text-sm font-semibold">Irene Household</p>
        <p className="text-xs text-white/70 mt-1">Admin Panel v1.0 &middot; Storefront UI</p>
      </div>
    </aside>
  );
}
