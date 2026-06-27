'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Reply } from 'lucide-react';
import { messages as initialMessages } from '@/lib/admin-data';
import { Message } from '@/types/admin';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string>(initialMessages[0]?.id ?? '');

  const unreadCount = useMemo(() => messages.filter((m) => !m.read).length, [messages]);
  const selected = useMemo(
    () => messages.find((m) => m.id === selectedId) ?? null,
    [messages, selectedId]
  );

  const selectMessage = (id: string) => {
    setSelectedId(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const toggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white">
          Messages
        </h1>
        <p className="mt-1 text-sm text-ink/50 dark:text-white/50">
          {messages.length} messages &middot;{' '}
          <span className="text-gold-dark dark:text-gold font-medium">
            {unreadCount} unread
          </span>
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
      >
        <div className="lg:col-span-1 rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium overflow-hidden">
          <ul className="divide-y divide-ink/10 dark:divide-white/10 max-h-[640px] overflow-y-auto">
            {messages.map((message) => {
              const isSelected = message.id === selectedId;
              return (
                <li key={message.id}>
                  <button
                    type="button"
                    onClick={() => selectMessage(message.id)}
                    className={cn(
                      'w-full text-left px-4 py-3.5 transition-colors',
                      isSelected
                        ? 'bg-gold/10'
                        : 'hover:bg-mist/60 dark:hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {!message.read && (
                          <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden />
                        )}
                        <p
                          className={cn(
                            'truncate text-sm',
                            !message.read
                              ? 'font-semibold text-ink dark:text-white'
                              : 'font-medium text-ink/70 dark:text-white/70'
                          )}
                        >
                          {message.name}
                        </p>
                      </div>
                      <span className="text-xs text-ink/40 dark:text-white/40 shrink-0 whitespace-nowrap">
                        {message.date}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'mt-1 text-sm truncate',
                        !message.read
                          ? 'font-semibold text-ink dark:text-white'
                          : 'text-ink/60 dark:text-white/60'
                      )}
                    >
                      {message.subject}
                    </p>
                    <p className="mt-0.5 text-xs text-ink/40 dark:text-white/40 truncate">
                      {message.message}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-ink/10 dark:border-white/10 bg-white dark:bg-ink/60 shadow-premium p-6 min-h-[300px]">
          {selected ? (
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-ink/10 dark:border-white/10">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-ink dark:text-white">
                    {selected.subject}
                  </h2>
                  <p className="mt-1 text-sm text-ink/60 dark:text-white/60">
                    From <span className="font-medium text-ink dark:text-white">{selected.name}</span>{' '}
                    &lt;{selected.email}&gt;
                  </p>
                  <p className="mt-0.5 text-xs text-ink/40 dark:text-white/40">{selected.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-3.5 py-2 text-xs font-semibold text-ink hover:bg-gold-light transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Reply via Email
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleRead(selected.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ink/10 dark:border-white/10 px-3.5 py-2 text-xs font-semibold text-ink dark:text-white hover:bg-mist/60 dark:hover:bg-white/5 transition-colors"
                  >
                    {selected.read ? (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        Mark as unread
                      </>
                    ) : (
                      <>
                        <MailOpen className="w-3.5 h-3.5" />
                        Mark as read
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70 dark:text-white/70 whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-ink/40 dark:text-white/40">
              Select a message to view its contents.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
