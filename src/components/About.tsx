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
              <TextReveal delay={0.2}>20+ years perfecting business transformation</TextReveal>
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
              For more than two decades, <strong className="text-white">Regenovate</strong> has
              been at the forefront of perfecting our Transformation Programme,
              revolutionising businesses through the adoption of Cloud Technology.
            </p>
            <p>
              Our journey began with a commitment to upgrading systems and
              empowering teams with innovative tools. One day, during a
              conversation with a new prospect, a unique idea took root — we
              proposed not just guiding them through the transformation but
              acquiring their business, completing the transformation, and
              offering it back to them.
            </p>
            <p>
              While the initial offer wasn&apos;t accepted, the concept of
              acquiring businesses before transforming them became a cornerstone
              of our methodology. Today, we proudly own and operate 10 diverse
              businesses across Manufacturing, Software, Display, and Engineering
              — thriving synergistically.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
