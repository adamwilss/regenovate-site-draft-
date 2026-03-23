"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

const testimonials = [
  {
    quote:
      "Selling Tech Innovations Ltd. was a significant decision for me. Regenovate not only facilitated a seamless transition but also ensured the welfare of my incredible team. Their dedication to preserving the legacy of the business while driving it to new heights is unparalleled.",
    name: "John Turner",
    role: "Former CEO, Tech Innovations Ltd.",
  },
  {
    quote:
      "Selling GreenScape Eco Solutions was a journey of mixed emotions, but Regenovate turned it into a success story. They understood the value we had built and worked tirelessly to highlight our strengths. The transition was not just a transaction; it was a collaborative effort.",
    name: "Eleanor Harper",
    role: "Founder, GreenScape Eco Solutions",
  },
  {
    quote:
      "Choosing Regenovate to guide us through the sale of Precision Manufacturing Solutions was the best decision we made. Their meticulous approach and Business Transformation Programme ensured a smooth and lucrative transition. They became more than advisors — they were partners.",
    name: "David Mitchell",
    role: "MD, Precision Manufacturing Solutions",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Testimonials
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <TextReveal delay={0.1}>What people are saying about Regenovate</TextReveal>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="p-8 md:p-12 rounded-2xl border border-slate-800 bg-slate-900/50 text-center overflow-hidden">
            <div className="text-blue-500/30 text-7xl leading-none mb-6">&ldquo;</div>

            <div className="relative min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                >
                  <p
                    className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {testimonials[active].quote}
                  </p>
                  <div>
                    <p className="text-white font-semibold">{testimonials[active].name}</p>
                    <p className="text-slate-500 text-sm">{testimonials[active].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 justify-center mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="relative h-2.5 rounded-full transition-all overflow-hidden"
                  style={{ width: active === i ? 32 : 10 }}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <div className={`absolute inset-0 rounded-full ${active === i ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"}`} />
                  {active === i && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute inset-0 rounded-full bg-blue-400 origin-left"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
