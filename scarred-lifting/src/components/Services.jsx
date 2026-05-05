import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Video, BarChart2, TrendingUp, Users } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Retours vidéos techniques',
    desc: "Analyse biomécanique détaillée de vos mouvements via Loom. Nous décortiquons chaque répétition pour optimiser votre niveau, corriger les déséquilibres et prévenir les blessures.",
  },
  {
    icon: BarChart2,
    title: 'Programmation',
    desc: "Planification périodisée et sur mesure de vos blocs de force. Que vous soyez en préparation pour une compétition ou en hors saison, le programme évolue avec la période.",
  },
  {
    icon: TrendingUp,
    title: 'Suivi de progression',
    desc: "Bilans réguliers sur vos données clés. Gestion de la fatigue, ajustement des charges (RPE/RIR) et adaptations de la programmation au jour le jour si nécessaire.",
  },
  {
    icon: Users,
    title: 'Coaching 1-on-1',
    desc: "Mentorat direct et préparation mentale. Un accès privilégié à votre coach pour aborder la stratégie de match, la nutrition et l'état d'esprit compétitif.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-dark-metal kaki-border-left p-6 md:p-8 transition-all duration-300 card-glow cursor-default"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 p-2 bg-kaki/10 rounded-sm border border-kaki/20 group-hover:bg-kaki/20 transition-colors duration-300">
          <Icon size={20} className="text-kaki-light" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-display text-cream text-base md:text-lg mb-3 leading-snug">
            {service.title}
          </h3>
          <p className="font-body text-cream/55 text-base md:text-lg leading-relaxed tracking-wide">
            {service.desc}
          </p>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-kaki/20 group-hover:border-kaki/50 transition-colors duration-300" />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative bg-[#0A0A0A] py-24 md:py-32 px-5 overflow-hidden">
      {/* Subtle separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-kaki/30" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <p className="font-body text-[#8A9142] tracking-[0.3em] uppercase text-xs mb-4">
            01 — Offre
          </p>
          <h2 className="font-display text-cream text-3xl md:text-5xl leading-tight">
            CE QUE JE PROPOSE
          </h2>
          <div className="mt-4 w-12 h-px bg-kaki" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
