'use client';

import { useEffect, useState } from 'react';

/** Writes data-theme on <html> and remembers the choice. The initial value is
    set before paint by the inline script in app/layout.tsx, so this component
    only reads what is already there. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // A browser blocking site data is not a reason to fail the toggle.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="label border border-rule-strong px-2 py-1 hover:border-ink hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
