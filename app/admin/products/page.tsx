'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import ImageDropzone from '@/components/admin/ImageDropzone';
import { products as initialProducts, categories } from '@/lib/data';
import { Product } from '@/types';
import { cn, formatKES } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

function stockStatus(stockCount?: number) {
  if (stockCount === undefined) return { label: 'In Stock', tone: 'in stock' };
  if (stockCount === 0) return { label: 'Out of Stock', tone: 'out of stock' };
  if (stockCount <= 10) return { label: 'Low Stock', tone: 'low stock' };
  return { label: 'In Stock', tone: 'in stock' };
}

const stockBadgeStyles: Record<string, string> = {
  'in stock': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'low stock': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  'out of stock': 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: categories[0]?.name ?? '',
    price: '',
    description: '',
    stockCount: '',
  });

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const resetForm = () => {
    setForm({
      name: '',
      category: categories[0]?.name ?? '',
      price: '',
      description: '',
      stockCount: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price) || 0;
    const stockCount = Number(form.stockCount) || 0;
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: form.name || 'Untitled Product',
      category: form.category,
      price,
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
      rating: 0,
      reviewCount: 0,
      inStock: stockCount > 0,
      stockCount,
    };
    setProducts((prev) => [newProduct, ...prev]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
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
            Products
          </h1>
          <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
            Manage your product catalog, pricing, and stock.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-ink font-semibold text-sm shadow-gold hover:bg-gold-light transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </motion.div>

      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products by name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filteredProducts.map((product) => {
          const status = stockStatus(product.stockCount);
          return (
            <div
              key={product.id}
              className="group rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-mist dark:bg-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => console.log('Edit product', product.id)}
                    aria-label="Edit product"
                    className="p-2 rounded-lg bg-white/90 dark:bg-ink/90 text-ink dark:text-white hover:bg-gold hover:text-ink transition-colors shadow"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    aria-label="Delete product"
                    className="p-2 rounded-lg bg-white/90 dark:bg-ink/90 text-ink dark:text-white hover:bg-red-500 hover:text-white transition-colors shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span
                  className={cn(
                    'absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize',
                    stockBadgeStyles[status.tone]
                  )}
                >
                  {status.label}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gold-dark dark:text-gold font-medium uppercase tracking-wide">
                  {product.category}
                </p>
                <h3 className="mt-1 font-heading font-semibold text-ink dark:text-white truncate">
                  {product.name}
                </h3>
                <p className="mt-1.5 font-heading font-bold text-ink dark:text-white">
                  {formatKES(product.price)}
                </p>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-ink/40 dark:text-white/40">
            No products match your search.
          </div>
        )}
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
              className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 mx-auto w-[92%] max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-ink p-6 shadow-premium"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-semibold text-ink dark:text-white">
                  Add Product
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
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Velvet Lounge Armchair"
                    className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                      Price (KSh)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="24500"
                      className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Short product description..."
                    className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.stockCount}
                    onChange={(e) => setForm((f) => ({ ...f, stockCount: e.target.value }))}
                    placeholder="42"
                    className="w-full px-4 py-2.5 rounded-xl bg-mist dark:bg-white/5 text-sm text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                    Product Images
                  </label>
                  <ImageDropzone label="Drag & drop product images, or click to browse" multiple />
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
                    Save Product
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
