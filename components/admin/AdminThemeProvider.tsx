'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AdminThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error('useAdminTheme must be used within AdminThemeProvider');
  return ctx;
}

export default function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('admin-theme');
    setIsDark(stored === 'dark');
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      window.localStorage.setItem('admin-theme', !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  return (
    <AdminThemeContext.Provider value={{ isDark, toggle }}>
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-mist dark:bg-ink transition-colors">{children}</div>
      </div>
    </AdminThemeContext.Provider>
  );
}
