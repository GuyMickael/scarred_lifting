import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download } from 'lucide-react';

const COACH_EMAIL = 'evan@scarredlifting.com';

function buildMailto({ firstName, email }) {
  const subject = encodeURIComponent('Programme 8 semaines — Scarred Lifting');
  const body = encodeURIComponent(
    `Bonjour Evan,\n\nJe souhaite recevoir le programme gratuit 8 semaines.\n\nPrénom : ${firstName}\nEmail : ${email}\n\n---\nEnvoyé depuis scarredlifting.com`
  );
  return `mailto:${COACH_EMAIL}?subject=${subject}&body=${body}`;
}

export default function FreeProgram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ firstName: '', email: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email) {
      setError('Merci de renseigner ton prénom et ton email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Adresse email invalide.');
      return;
    }
    window.location.href = buildMailto(form);
    setSent(true);
  };

  return (
    <section
      id="programme"
      className="relative bg-[#1C1C1E] py-24 md:py-32 px-5 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <polygon
            points="100,10 190,55 190,145 100,190 10,145 10,55"
            stroke="#5C6433"
            strokeWidth="2"
          />
          <polygon
            points="100,30 170,67.5 170,132.5 100,170 30,132.5 30,67.5"
            stroke="#5C6433"
            strokeWidth="1"
          />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#5C6433" strokeWidth="0.5" />
          <line x1="10" y1="55" x2="190" y2="145" stroke="#5C6433" strokeWidth="0.5" />
          <line x1="10" y1="145" x2="190" y2="55" stroke="#5C6433" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-[#8A9142] tracking-[0.3em] uppercase text-xs mb-4">
            04 — Ressource gratuite
          </p>
          <h2 className="font-display text-cream text-3xl md:text-5xl leading-tight mb-4">
            PROGRAMME OFFERT
          </h2>
          <div className="w-12 h-px bg-kaki mb-6" />
          <p className="font-body text-cream/50 text-lg md:text-xl tracking-wide leading-relaxed">
            8 semaines de force — le point de départ de tous mes athlètes.
          </p>
        </motion.div>

        {/* Key features */}
        <motion.ul
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-3 mb-10"
        >
          {['Périodisation linéaire 3 jours/semaine', 'Muscle Up, Pull-ups, Dips, Squats + accessoires', 'Tableaux RPE & gestion de la fatigue', 'Notes de coaching incluses'].map((item) => (
            <li key={item} className="flex items-center gap-3 font-body text-cream/60 text-base tracking-wide">
              <span className="w-1 h-1 bg-kaki-light rounded-full flex-shrink-0" />
              {item}
            </li>
          ))}
        </motion.ul>

        {/* Form / Confirmation */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-kaki/30 bg-kaki/5 p-8 text-center"
            >
              <CheckCircle size={40} className="text-kaki-light mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-cream text-xl mb-2">Demande reçue</h3>
              <p className="font-body text-cream/50 text-lg tracking-wide">
                Le programme vous sera envoyé par email sous 24h.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-8"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="font-body text-[10px] tracking-[0.25em] text-cream/40 uppercase block mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Thomas"
                    className="input-underline"
                    required
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.25em] text-cream/40 uppercase block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="thomas@email.com"
                    className="input-underline"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="font-body text-red-400/80 text-sm tracking-wide">{error}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="group flex items-center gap-3 font-body tracking-[0.2em] uppercase text-sm text-[#0A0A0A] bg-cream hover:bg-cream/80 transition-colors duration-300 px-8 py-4"
                >
                  <Download size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                  <span>Recevoir le programme</span>
                </button>
              </div>

              <p className="font-body text-cream/30 text-sm tracking-wide pt-2">
                Le programme vous sera envoyé par email sous 24h. Aucun spam.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
