import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réserver', href: '#reservation' },
  { label: 'Avis', href: '#avis' },
  { label: 'Programme', href: '#programme' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A] border-b border-[#1C1C1E]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
            aria-label="Retour en haut"
          >
            <img src="/logo.png" alt="Scarred Lifting logo" className="w-12 h-12 object-contain" />
            <span className="font-display text-cream text-sm tracking-[0.2em] hidden sm:block">
              SCARRED LIFTING
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="font-body text-sm tracking-[0.15em] uppercase text-cream/60 hover:text-kaki-light transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-cream p-2"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-display text-3xl tracking-[0.15em] uppercase text-cream hover:text-kaki-light transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="font-body text-cream/30 text-xs tracking-widest uppercase mt-16">
              Scarred Lifting — Evan
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
