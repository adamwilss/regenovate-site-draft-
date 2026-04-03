"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";

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
            <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Story
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <TextReveal delay={0.2}>Built in real businesses. Not boardrooms.</TextReveal>
            </h2>
            <div className="flex gap-4 mt-8 flex-wrap">
              {[
                { value: "10", label: "Businesses Owned\n& Operated", accent: "from-blue-400 to-blue-600" },
                { value: "4", label: "Core Sectors", accent: "from-blue-400 to-blue-600" },
                { value: "20+", label: "Years'\nExperience", accent: "from-emerald-400 to-teal-500" },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/50 flex-1 min-w-[90px] text-center transition-colors">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-br ${stat.accent} bg-clip-text text-transparent mb-1`}
                    style={{ fontFamily: '"DM Serif Display", serif' }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-slate-500 text-[11px] leading-tight whitespace-pre-line">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start the Conversation
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-slate-400 leading-relaxed"
          >
            <p className="text-lg text-slate-300">
              Twenty years ago, we didn&apos;t set out to build a methodology.
              We were just trying to fix broken businesses. Not the obvious kind —
              the ones that looked fine on the surface but were full of friction underneath.
              Disconnected systems. Conflicting reports. Good people working hard,
              but pulling in different directions.
            </p>
            <p>
              We came from a background of building and running businesses ourselves,
              not advising from the sidelines. Through trial, error, and a fair bit
              of getting it wrong, we learned what actually moves the needle.
              Not theory. Not trends. What works. That became the foundation of{" "}
              <strong className="text-white">Regenovate</strong>.
            </p>
            <p>
              One conversation changed everything. Instead of guiding a client through
              transformation, we proposed something different: acquire the business,
              fix it properly, and hand it back better. They didn&apos;t take the offer.
              But the idea stuck — because it solved a problem most consultants never face.
              We would live with the consequences.
            </p>
            <p>
              Today, we own and operate multiple businesses across manufacturing,
              software, display and engineering. We don&apos;t just recommend change —
              we implement it, test it, and prove it in our own companies.
              That&apos;s the difference.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
