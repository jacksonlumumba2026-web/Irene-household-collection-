'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import ImageDropzone from '@/components/admin/ImageDropzone';
import { categories as initialCategories } from '@/lib/data';
import { Category } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: name || 'Untitled Category',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
      productCount: 0,
    };
    setCategories((prev) => [newCategory, ...prev]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
            Categories
          </h1>
          <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
            Organize your catalog into curated collections.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-ink font-semibold text-sm shadow-gold hover:bg-gold-light transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="group rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-mist dark:bg-white/10">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => console.log('Edit category', category.id)}
                  aria-label="Edit category"
                  className="p-2 rounded-lg bg-white/90 dark:bg-ink/90 text-ink dark:text-white hover:bg-gold hover:text-ink transition-colors shadow"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  aria-label="Delete category"
                  className="p-2 rounded-lg bg-white/90 dark:bg-ink/90 text-ink dark:text-white hover:bg-red-500 hover:text-white transition-colors shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold text-ink dark:text-white truncate">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
                {category.productCount.toLocaleString('en-KE')} products
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-40 bg-ink/60"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 mx-auto w-[92%] max-w-md max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-ink p-6 shadow-premium"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-semibold text-ink dark:text-white">
                  Add Category
                </h2>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="p-2 rounded-lg text-ink/60 dark:text-white/60 hover:bg-mist dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Outdoor Living"
                    className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Category Image
                  </label>
                  <ImageDropzone label="Drag & drop a cover image, or click to browse" multiple={false} />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-ink/60 dark:text-white/60 hover:bg-mist dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gold text-ink font-semibold text-sm shadow-gold hover:bg-gold-light transition-colors"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
