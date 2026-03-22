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
          <div className="text-emerald-500 text-6xl mb-4 leading-none">&ldquo;</div>
          <p
            className="text-2xl md:text-3xl text-white leading-relaxed font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            To regenovate is to innovate with a regenerative purpose — creating
            solutions that are sustainable, resilient, and beneficial for both
            people and the planet.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
