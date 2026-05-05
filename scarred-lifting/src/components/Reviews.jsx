import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '../data/reviews';

function StarRating({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#5C6433" className="text-kaki" />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-auto bg-dark-metal border border-cream/5 p-6 md:p-8 flex flex-col hover:border-kaki/20 transition-colors duration-300 snap-start">
      <StarRating count={review.rating} />
      <p className="font-body text-cream/70 text-base md:text-lg leading-relaxed tracking-wide flex-1 mb-6">
        "{review.text}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-kaki/20 border border-kaki/30 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-kaki-light text-xs font-semibold">
            {review.initials}
          </span>
        </div>
        <div>
          <p className="font-body text-cream text-base font-semibold tracking-wide">
            {review.name}
          </p>
          <p className="font-body text-kaki-light text-sm tracking-widest uppercase">
            {review.months}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 300;
    const next = activeIdx + dir;
    if (next < 0 || next >= reviews.length) return;
    setActiveIdx(next);
    el.scrollTo({ left: next * (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <section id="avis" className="relative bg-[#0A0A0A] py-24 md:py-32 px-5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-kaki/20" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-body text-[#8A9142] tracking-[0.3em] uppercase text-xs mb-4">
              03 — Témoignages
            </p>
            <h2 className="font-display text-cream text-3xl md:text-5xl leading-tight">
              ILS ONT TRANSFORMÉ
              <br />
              LEUR FORCE
            </h2>
            <div className="mt-4 w-12 h-px bg-kaki" />
          </div>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scrollTo(-1)}
              disabled={activeIdx === 0}
              className="p-3 border border-cream/10 hover:border-kaki/50 disabled:opacity-20 transition-all duration-200"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} className="text-cream" />
            </button>
            <button
              onClick={() => scrollTo(1)}
              disabled={activeIdx === reviews.length - 1}
              className="p-3 border border-cream/10 hover:border-kaki/50 disabled:opacity-20 transition-all duration-200"
              aria-label="Suivant"
            >
              <ChevronRight size={18} className="text-cream" />
            </button>
          </div>
        </motion.div>

        {/* Reviews — scrollable on mobile, 3-col grid on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Mobile: horizontal scroll */}
          <div
            ref={scrollRef}
            className="md:hidden flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory pb-4 -mx-5 px-5"
          >
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
          <div className="hidden md:grid grid-cols-2 gap-5 mt-5 max-w-2xl">
            {reviews.slice(3).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </motion.div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIdx(i);
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 300;
                el.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === activeIdx ? 'bg-kaki w-5' : 'bg-cream/20'
              }`}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
