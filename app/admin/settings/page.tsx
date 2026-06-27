'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check, Moon } from 'lucide-react';
import ImageDropzone from '@/components/admin/ImageDropzone';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

interface GeneralSettingsForm {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  businessAddress: string;
}

const initialGeneralSettings: GeneralSettingsForm = {
  siteName: 'Irene Household Collection',
  contactEmail: 'hello@irenehouseholdcollection.co.ke',
  contactPhone: '+254 700 000 000',
  whatsappNumber: '+254 700 000 000',
  businessAddress: 'Kimathi Street, Nairobi, Kenya',
};

export default function SettingsPage() {
  const [general, setGeneral] = useState<GeneralSettingsForm>(initialGeneralSettings);
  const [showSaved, setShowSaved] = useState(false);

  const updateField = (field: keyof GeneralSettingsForm, value: string) => {
    setGeneral((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Manage your store&rsquo;s general information, banners, and appearance.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
      >
        <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
          General Settings
        </h2>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Core details shown across the storefront and used for customer enquiries.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
              Site Name
            </label>
            <input
              type="text"
              value={general.siteName}
              onChange={(e) => updateField('siteName', e.target.value)}
              className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={general.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
              Contact Phone
            </label>
            <input
              type="text"
              value={general.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
              className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={general.whatsappNumber}
              onChange={(e) => updateField('whatsappNumber', e.target.value)}
              className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ink/60 dark:text-white/60 mb-1.5">
              Business Address
            </label>
            <input
              type="text"
              value={general.businessAddress}
              onChange={(e) => updateField('businessAddress', e.target.value)}
              className="w-full rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
      >
        <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
          Banner Manager
        </h2>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          Upload and manage the promotional banners shown on the homepage hero section.
        </p>
        <div className="mt-5">
          <ImageDropzone label="Drag & drop banner images, or click to browse" multiple />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 p-5 sm:p-6 shadow-premium"
      >
        <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
          Appearance
        </h2>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-gold/10 px-4 py-3 text-sm text-ink/70 dark:text-white/70">
          <Moon className="w-4 h-4 text-gold-dark dark:text-gold shrink-0" />
          Dark mode can be toggled anytime from the top navigation bar.
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeUp}
        className="flex items-center justify-end gap-3"
      >
        <AnimatePresence>
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <Check className="w-4 h-4" />
              Changes saved
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-colors shadow-gold"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}
