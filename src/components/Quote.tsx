"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Quote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-blue-500/40 text-8xl mb-6 leading-none">&ldquo;</div>
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A clever person learns from their mistakes.
            <br />
            A wise person learns from the mistakes of others.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-blue-500/50" />
            <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              The Regenovate Philosophy
            </p>
            <div className="w-12 h-px bg-blue-500/50" />
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
