import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [iframeHeight, setIframeHeight] = useState(900);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.event === 'calendly.page_height') {
        const h = parseInt(e.data.payload?.height, 10);
        if (!isNaN(h) && h > 0) setIframeHeight(h);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section
      id="reservation"
      className="relative bg-[#1C1C1E] py-24 md:py-32 px-5 overflow-hidden"
    >
      {/* Decorative corner lines */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-kaki/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-kaki/15 pointer-events-none" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-[#8A9142] tracking-[0.3em] uppercase text-xs mb-4">
            02 — Contact
          </p>
          <h2 className="font-display text-cream text-3xl md:text-5xl leading-tight mb-4">
            RÉSERVE TON APPEL
          </h2>
          <div className="w-12 h-px bg-kaki mb-6" />
          <p className="font-body text-cream/50 text-lg md:text-xl tracking-wide leading-relaxed">
            Un échange de 30 minutes pour définir tes objectifs et voir comment on peut travailler ensemble.
          </p>
        </motion.div>

        {/* Calendly iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-kaki/20 rounded-xl overflow-hidden"
        >
          <iframe
            src="https://calendly.com/devecchievan21/30min"
            width="100%"
            height={iframeHeight}
            frameBorder="0"
            title="Réserver un appel avec Evan — Scarred Lifting"
            style={{ filter: 'brightness(0.75) saturate(0.8)', display: 'block' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
