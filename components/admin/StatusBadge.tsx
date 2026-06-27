import { cn } from '@/lib/utils';

const styles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  shipped: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  inactive: 'bg-ink/10 text-ink/50 dark:bg-white/10 dark:text-white/50',
  'in stock': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'low stock': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  'out of stock': 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

export default function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize',
        styles[key] ?? 'bg-ink/10 text-ink/60 dark:bg-white/10 dark:text-white/60'
      )}
    >
      {status}
    </span>
  );
}
