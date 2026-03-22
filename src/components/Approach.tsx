"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Assess",
    desc: "Map your current systems, impacts, and opportunities for regenerative transformation.",
  },
  {
    title: "Design",
    desc: "Co-create strategies that align business growth with ecological and social renewal.",
  },
  {
    title: "Implement",
    desc: "Deploy modern technologies and regenerative practices across your operations.",
  },
  {
    title: "Evolve",
    desc: "Continuously measure, learn, and adapt — growing stronger with the systems you support.",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-emerald-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Approach
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              From degenerative
              <br />
              to regenerative
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Traditional business models extract value from the systems they
              operate in. Regenovation flips this paradigm — creating businesses
              that strengthen the ecosystems, communities, and economies
              they&apos;re part of.
            </p>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-emerald-500 mt-2 shadow-lg shadow-emerald-500/30" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Rings */}
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-emerald-500/20"
                  style={{
                    margin: `${ring * 30}px`,
                    animation: `spin ${15 + ring * 5}s linear infinite${
                      ring % 2 === 0 ? " reverse" : ""
                    }`,
                  }}
                >
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                    style={{ top: "-5px", left: "50%", marginLeft: "-5px" }}
                  />
                </div>
              ))}
              {/* Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center glow">
                  <span className="text-white font-bold text-sm tracking-wider">
                    Regenovate
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
