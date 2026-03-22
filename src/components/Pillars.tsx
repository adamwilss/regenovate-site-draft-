"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Climate Positive",
    desc: "Going beyond carbon neutral to actively restore atmospheric balance. We design systems that sequester more than they emit.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    number: "02",
    title: "Nature Positive",
    desc: "Enhancing biodiversity and ecosystem health through every business decision. Growth that gives back to the natural world.",
    color: "from-teal-500 to-teal-600",
  },
  {
    number: "03",
    title: "Social Positive",
    desc: "Creating equitable opportunities and strengthening communities. Business as a force for social regeneration and inclusion.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    number: "04",
    title: "Economic Positive",
    desc: "Building resilient, circular economic models that distribute prosperity and sustain themselves long into the future.",
    color: "from-teal-400 to-emerald-500",
  },
];

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Our Pillars
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Four dimensions of positive impact
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group relative"
            >
              <div className="p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 bg-slate-900/50 transition-all duration-300 h-full">
                <div
                  className={`text-5xl font-bold bg-gradient-to-br ${pillar.color} bg-clip-text text-transparent mb-6`}
                >
                  {pillar.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="mt-6 h-px bg-gradient-to-r from-emerald-500/50 to-transparent w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
