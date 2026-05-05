import { motion } from 'framer-motion';
import LogoSVG from '../assets/logo-placeholder.svg';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
    </svg>
  );
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réserver', href: '#reservation' },
  { label: 'Avis', href: '#avis' },
  { label: 'Programme', href: '#programme' },
];

export default function Footer() {
  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-cream/5 pt-16 pb-10 px-5 overflow-hidden">
      {/* Separator accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-kaki" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* Logo + brand */}
        <div className="flex flex-col items-center gap-4">
          <motion.img
            src={LogoSVG}
            alt="Scarred Lifting"
            className="w-14 h-14"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          <div className="text-center">
            <p className="font-display text-cream text-sm tracking-[0.25em] uppercase">
              Scarred Lifting
            </p>
            <p className="font-body text-cream/35 text-xs tracking-[0.2em] uppercase mt-1">
              Evan
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-body text-xs tracking-[0.2em] uppercase text-cream/35 hover:text-kaki-light transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-5">
          <a
            href="https://www.instagram.com/guts_ed/"
            aria-label="Instagram Scarred Lifting"
            className="text-cream/35 hover:text-kaki-light transition-colors duration-200 p-2"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@guts_ed?_r=1&_t=ZN-966kbRXPtbS"
            aria-label="TikTok Scarred Lifting"
            className="text-cream/35 hover:text-kaki-light transition-colors duration-200 p-2"
          >
            <TikTokIcon />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-cream/5" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-body italic text-kaki-light text-sm tracking-[0.15em]">
            "Leave a scar."
          </p>
          <p className="font-body text-cream/20 text-xs tracking-[0.1em]">
            © 2025 Scarred Lifting. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
