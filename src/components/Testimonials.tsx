"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

const testimonials = [
  {
    quote:
      "Selling Tech Innovations Ltd. was a significant decision for me. Regenovate not only facilitated a seamless transition but also ensured the welfare of my incredible team. Their dedication to preserving the legacy of the business while driving it to new heights is unparalleled.",
    name: "John Turner",
    role: "Former CEO",
    company: "Tech Innovations Ltd.",
    initial: "JT",
  },
  {
    quote:
      "Selling GreenScape Eco Solutions was a journey of mixed emotions, but Regenovate turned it into a success story. They understood the value we had built and worked tirelessly to highlight our strengths. The transition was not just a transaction — it was a collaborative effort.",
    name: "Eleanor Harper",
    role: "Founder",
    company: "GreenScape Eco Solutions",
    initial: "EH",
  },
  {
    quote:
      "Choosing Regenovate to guide us through the sale of Precision Manufacturing Solutions was the best decision we made. Their meticulous approach and Business Transformation Programme ensured a smooth and lucrative transition. They became more than advisors — they were partners.",
    name: "David Mitchell",
    role: "Managing Director",
    company: "Precision Manufacturing Solutions",
    initial: "DM",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full bg-blue-600/6 blur-3xl" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-5">
            Client stories
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
          >
            <TextReveal delay={0.1}>What people are saying</TextReveal>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden p-10 md:p-16">
            {/* Subtle gradient tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />

            {/* Big decorative quote mark */}
            <div
              className="absolute top-6 left-10 text-[10rem] leading-none text-blue-400/8 select-none pointer-events-none"
              style={{ fontFamily: '"DM Serif Display", serif' }}
              aria-hidden
            >
              &ldquo;
            </div>

            <div className="relative">
              {/* Quote text */}
              <div className="relative min-h-[180px] flex items-center justify-center mb-12">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                    transition={{ duration: 0.55 }}
                    className="text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed text-center font-light"
                    style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
                  >
                    {t.quote}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Author */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center gap-4"
                >
                  {/* Avatar initial */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {t.initial}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2.5 justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative h-2 rounded-full transition-all duration-300 overflow-hidden"
                style={{ width: active === i ? 36 : 10 }}
                aria-label={`Testimonial ${i + 1}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-colors ${
                    active === i ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-500"
                  }`}
                />
                {active === i && (
                  <motion.div
                    key={active}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-blue-400 origin-left"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
