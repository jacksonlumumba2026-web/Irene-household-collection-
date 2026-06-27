'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Copy, Check, X } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { coupons as initialCoupons } from '@/lib/admin-data';
import { Coupon, DiscountType } from '@/types/admin';
import { cn, formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

function discountLabel(coupon: Coupon) {
  return coupon.discountType === 'percentage'
    ? `${coupon.discountValue}% off`
    : `${formatKES(coupon.discountValue)} off`;
}

interface CouponFormState {
  code: string;
  discountType: DiscountType;
  discountValue: string;
  minSpend: string;
  expiryDate: string;
  usageLimit: string;
}

const emptyForm: CouponFormState = {
  code: '',
  discountType: 'percentage',
  discountValue: '',
  minSpend: '',
  expiryDate: '',
  usageLimit: '',
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<CouponFormState>(emptyForm);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return;

    const newCoupon: Coupon = {
      id: `CPN-${(coupons.length + 1).toString().padStart(2, '0')}`,
      code: form.code.trim().toUpperCase(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue) || 0,
      minSpend: Number(form.minSpend) || 0,
      expiryDate: form.expiryDate || new Date().toISOString().slice(0, 10),
      usageLimit: Number(form.usageLimit) || 0,
      usedCount: 0,
      active: true,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    closeModal();
  };

  const copyCode = (coupon: Coupon) => {
    navigator.clipboard?.writeText(coupon.code).catch(() => {});
    setCopiedId(coupon.id);
    setTimeout(() => setCopiedId((id) => (id === coupon.id ? null : id)), 1500);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
            Coupons
          </h1>
          <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
            Manage discount codes and promotional offers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-colors shadow-gold"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-ink/40 dark:text-white/40 text-xs uppercase tracking-wide border-b border-ink/10 dark:border-white/10">
                <th className="px-5 py-3 font-medium">Code</th>
                <th className="px-5 py-3 font-medium">Discount</th>
                <th className="px-5 py-3 font-medium">Min. Spend</th>
                <th className="px-5 py-3 font-medium">Expiry</th>
                <th className="px-5 py-3 font-medium">Usage</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => {
                const usagePct = coupon.usageLimit
                  ? Math.min(100, Math.round((coupon.usedCount / coupon.usageLimit) * 100))
                  : 0;
                return (
                  <tr
                    key={coupon.id}
                    className="border-t border-ink/5 dark:border-white/5 hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-ink dark:text-white tracking-wide">
                          {coupon.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyCode(coupon)}
                          className="p-1 rounded-lg text-ink/40 dark:text-white/40 hover:text-gold-dark dark:hover:text-gold hover:bg-gold/10 transition-colors"
                          aria-label={`Copy code ${coupon.code}`}
                        >
                          {copiedId === coupon.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink/70 dark:text-white/70 whitespace-nowrap">
                      {discountLabel(coupon)}
                    </td>
                    <td className="px-5 py-3.5 text-ink/70 dark:text-white/70 whitespace-nowrap">
                      {formatKES(coupon.minSpend)}
                    </td>
                    <td className="px-5 py-3.5 text-ink/50 dark:text-white/50 whitespace-nowrap">
                      {coupon.expiryDate}
                    </td>
                    <td className="px-5 py-3.5 min-w-[140px]">
                      <div className="flex items-center justify-between text-xs text-ink/50 dark:text-white/50 mb-1">
                        <span>
                          {coupon.usedCount} / {coupon.usageLimit}
                        </span>
                        <span>{usagePct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gold"
                          style={{ width: `${usagePct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={coupon.active ? 'active' : 'inactive'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink p-6 shadow-premium"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
                  Create Coupon
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1.5 rounded-lg text-ink/40 dark:text-white/40 hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    required
                    value={form.code}
                    onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                    placeholder="e.g. SAVE15"
                    className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 font-mono uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                      Discount Type
                    </label>
                    <select
                      value={form.discountType}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, discountType: e.target.value as DiscountType }))
                      }
                      className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={form.discountValue}
                      onChange={(e) => setForm((f) => ({ ...f, discountValue: e.target.value }))}
                      placeholder={form.discountType === 'percentage' ? '10' : '500'}
                      className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                      Min. Spend (KSh)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.minSpend}
                      onChange={(e) => setForm((f) => ({ ...f, minSpend: e.target.value }))}
                      placeholder="3000"
                      className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.usageLimit}
                      onChange={(e) => setForm((f) => ({ ...f, usageLimit: e.target.value }))}
                      placeholder="500"
                      className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.expiryDate}
                    onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                    className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-ink/10 dark:border-white/10 px-4 py-2.5 text-sm font-semibold text-ink dark:text-white hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-colors shadow-gold"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
