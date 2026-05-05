import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sentence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const word = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedLine({ text, className }) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={word} className="inline-block">
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const handleScroll = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center grain-overlay diagonal-deco bg-[#0A0A0A] overflow-hidden"
    >
      {/* Geometric background accent — Berserk-inspired brand mark */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Large diagonal kaki lines */}
        <svg
          className="absolute top-0 right-0 w-2/3 h-full opacity-[0.04]"
          viewBox="0 0 600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="600" y1="0" x2="0" y2="900" stroke="#8A9142" strokeWidth="80" />
          <line x1="700" y1="0" x2="100" y2="900" stroke="#8A9142" strokeWidth="30" />
        </svg>

        {/* Sacrifice mark geometry — subtle hexagon */}
        <svg
          className="absolute bottom-16 left-8 md:left-16 w-24 md:w-40 opacity-[0.06]"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="60,6 112,33 112,87 60,114 8,87 8,33"
            stroke="#5C6433"
            strokeWidth="1.5"
          />
          <polygon
            points="60,20 98,41 98,79 60,100 22,79 22,41"
            stroke="#5C6433"
            strokeWidth="0.8"
          />
          <line x1="60" y1="6" x2="60" y2="114" stroke="#5C6433" strokeWidth="0.5" />
          <line x1="8" y1="33" x2="112" y2="87" stroke="#5C6433" strokeWidth="0.5" />
          <line x1="8" y1="87" x2="112" y2="33" stroke="#5C6433" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        {/* Brand line */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-[#8A9142] tracking-[0.35em] uppercase text-xs md:text-sm mb-8 md:mb-10"
        >
          EVAN — SCARRED LIFTING
        </motion.p>

        {/* Main title */}
        <div className="font-display font-black leading-none tracking-tight mb-6">
          <AnimatedLine
            text="FORGE TON"
            className="text-[clamp(3.5rem,12vw,8rem)] text-cream"
          />
          <AnimatedLine
            text="HÉRITAGE"
            className="text-[clamp(3.5rem,12vw,8rem)] text-[#5C6433]"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-body text-cream/50 text-lg md:text-2xl tracking-[0.12em] uppercase mt-4"
        >
          Coaching street lifting &amp; force athlétique
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <button
            onClick={() => {
              const el = document.querySelector('#reservation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block font-body tracking-[0.2em] uppercase text-sm text-cream border border-kaki/60 px-8 py-3 hover:bg-kaki/10 hover:border-kaki transition-all duration-300"
          >
            Réserver un appel
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 hover:text-cream/70 transition-colors duration-200 group"
        aria-label="Défiler vers le bas"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
