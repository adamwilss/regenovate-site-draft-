"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-emerald-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Who We Are
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Innovation with
              <br />
              regenerative purpose
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-slate-400 leading-relaxed"
          >
            <p className="text-lg text-slate-300">
              <strong className="text-white">Regenovate</strong> is the fusion
              of <em className="text-emerald-400">regenerate</em> and{" "}
              <em className="text-emerald-400">innovate</em>. We believe that
              true progress doesn&apos;t just move forward — it restores, renews,
              and creates positive impact at every level.
            </p>
            <p>
              We work with businesses, organisations, and communities to
              transform outdated systems into regenerative ones. Our approach
              aligns economic growth with natural systems, promoting circular
              economy thinking and reducing waste while enhancing resilience and
              long-term sustainability.
            </p>
            <p>
              Regenovation isn&apos;t just about quantitative growth — it&apos;s about
              qualitative, diversified growth that supports the system it
              operates within. We help you decouple from degenerative practices
              and adopt strategies that regenerate resources, ecosystems, and
              social structures.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
