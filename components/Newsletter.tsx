'use client';

import { useState, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-ink to-gold-dark py-20 lg:py-28">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-10">
        <span className="rounded-full bg-white/10 px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Stay In Touch
        </span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-white lg:text-4xl">
          Join the Irene Family
        </h2>
        <p className="mt-4 font-body text-base text-white/60">
          Be the first to know about new arrivals, exclusive offers, and styling inspiration
          delivered straight to your inbox.
        </p>

        <div className="mt-8 flex justify-center">
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-4 text-white"
              >
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <span className="font-body text-sm">Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                className="glass-dark flex w-full max-w-md items-center gap-2 rounded-full p-1.5 sm:p-2"
              >
                <Mail className="ml-3 hidden h-4 w-4 text-white/40 sm:block" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-3 py-2.5 font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-full bg-gold px-5 py-2.5 font-accent text-xs font-semibold uppercase tracking-wide text-ink shadow-gold transition-transform duration-300 hover:scale-105 sm:px-6 sm:text-sm"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
