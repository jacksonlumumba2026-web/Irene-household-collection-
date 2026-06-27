import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  changePct: number;
  icon: LucideIcon;
}

export default function StatCard({ label, value, changePct, icon: Icon }: StatCardProps) {
  const positive = changePct >= 0;

  return (
    <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 shadow-premium">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink/50 dark:text-white/50">{label}</p>
          <p className="mt-2 font-heading text-2xl font-bold text-ink dark:text-white">{value}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold-dark dark:text-gold flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div
        className={cn(
          'mt-3 inline-flex items-center gap-1 text-xs font-semibold',
          positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
        )}
      >
        {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {Math.abs(changePct)}%
        <span className="text-ink/40 dark:text-white/40 font-normal">vs last month</span>
      </div>
    </div>
  );
}
