import Link from 'next/link';
import { useRouter } from 'next/router';
import codexDetails from '../data/codexDetails';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function SideNav() {
  const router = useRouter();
  const currentSlug = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug ?? '';

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
 
  useEffect(() => {
    if (!isOpen || !navRef.current) return;

    const focusableEls = navRef.current.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-red-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Side Navigation */}
      <nav
        ref={navRef}
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-red-800 p-6 font-mono text-red-400 overflow-y-auto z-50 transition-transform duration-300 transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block`}
      >
        <h2 className="text-2xl font-bold mb-6 text-red-500">⚙️ Codex Menu</h2>
        <ul>
          {Object.entries(codexDetails).map(([slug, data]) => {
            const active = slug === currentSlug;
            return (
              <li key={slug} className="mb-3">
                <Link
                  href={`/codex/${slug}`}
                  prefetch
                  className={`block px-3 py-2 rounded-lg hover:bg-red-900 transition-colors ${
                    active ? 'bg-red-700 font-semibold text-red-100' : 'text-red-400'
                  }`}
                >
                  {data.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
