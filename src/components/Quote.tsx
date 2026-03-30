"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const lines = [
  "A clever person learns",
  "from their mistakes.",
  "A wise person learns from",
  "the mistakes of others.",
];

export default function Quote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[400px] rounded-full bg-blue-600/8 blur-3xl" />
      </div>

      {/* Top rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-blue-500/30" />

      <div className="max-w-5xl mx-auto px-6 text-center relative">

        {/* Large decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 select-none"
          aria-hidden
        >
          <span
            className="text-[7rem] leading-none gradient-text-flow opacity-30"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Quote lines — each clips up individually */}
        <blockquote className="mb-12">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden pb-[0.12em]">
              <motion.span
                className="block font-light text-white"
                initial={{ y: "115%" }}
                animate={isInView ? { y: 0 } : { y: "115%" }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + i * 0.12,
                }}
                style={{
                  fontFamily: '"DM Serif Display", "Playfair Display", serif',
                  fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                  lineHeight: 1.18,
                  fontStyle: i % 2 === 1 ? "italic" : "normal",
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center justify-center gap-5"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
          <p className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium">
            The Regenovate Philosophy
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-blue-500/50" />
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-blue-500/30" />
    </section>
  );
}
