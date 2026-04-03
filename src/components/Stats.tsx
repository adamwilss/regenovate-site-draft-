"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 200, suffix: "+",  label: "Clients Transformed",    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { value: 20,  suffix: "+",  label: "Years' Experience",       icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: 300, prefix: "£", suffix: "M+", label: "Revenue Generated", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { value: 98,  suffix: "%",  label: "Annual Client Retention", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

function AnimatedNumber({
  value, suffix, prefix,
}: {
  value: number; suffix: string; prefix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-blue-400/80 text-[10px] tracking-[0.5em] uppercase font-medium mb-5"
          >
            Proven Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white/95"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Numbers that speak for themselves
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'var(--divider-color)', border: '1px solid var(--divider-color)' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative px-6 py-14 md:px-10 md:py-16 text-center group"
              style={{ background: 'var(--surface-card)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mx-auto mb-6 w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/[0.06] group-hover:bg-blue-500/[0.1] transition-colors duration-500" />
                <svg className="w-4.5 h-4.5 text-blue-400/60 group-hover:text-blue-400/80 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>

              {/* Number */}
              <div
                className="relative text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-none mb-4"
                style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif', color: 'var(--text-primary)' }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>

              {/* Label */}
              <p className="relative text-[11px] tracking-[0.2em] uppercase leading-relaxed transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-[10px] text-slate-600 tracking-[0.35em] uppercase mt-12"
        >
          Across all managed clients and portfolios
        </motion.p>
      </div>
    </section>
  );
}
