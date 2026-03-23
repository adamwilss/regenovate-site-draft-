"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Stabilise",
    subtitle: "PEOPLE",
    desc: "We understand that the most important resource in your business is your Human Resource, your PEOPLE. When people feel safe, valued and rewarded fairly, the culture is strong, resilient and can cope with the challenges of growth. Get it right and the business becomes a \"Talent Magnet\".",
    color: "from-blue-400 to-blue-500",
  },
  {
    number: "02",
    title: "Systemise",
    subtitle: "PROCESS",
    desc: "By using the power of the Cloud, combined with the wisdom of traditional business practice, we have created a 'secret sauce' that puts growth on autopilot. Efficient businesses are more fun to work in and as a result generate more profit.",
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "PERFORMANCE",
    desc: "We know how to generate perfect customers who want your products and services, from you, now, and can afford them. By constantly monitoring what works using the latest technology, we secure Market Share and create Scale.",
    color: "from-blue-600 to-blue-700",
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
          <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Our Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Stabilise. Systemise. Scale.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            In business you are always trying to do &ldquo;more of what works&rdquo; and
            &ldquo;less of what doesn&apos;t&rdquo;. Sounds simple — and it is, if you have access
            to the right tools, wisdom and experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group relative"
            >
              <div className="p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 bg-slate-900/50 transition-all duration-300 h-full">
                <div
                  className={`text-5xl font-bold bg-gradient-to-br ${pillar.color} bg-clip-text text-transparent mb-2`}
                >
                  {pillar.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {pillar.title}
                </h3>
                <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
                  {pillar.subtitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="mt-6 h-px bg-gradient-to-r from-blue-500/50 to-transparent w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
