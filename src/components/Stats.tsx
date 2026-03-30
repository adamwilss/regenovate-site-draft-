"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 200,  suffix: "+",  label: "Clients\nTransformed",    accent: "from-blue-300 to-blue-500" },
  { value: 20,   suffix: "+",  label: "Years'\nExperience",       accent: "from-blue-400 to-blue-600" },
  { value: 300,  prefix: "£", suffix: "M+", label: "Revenue\nGenerated",   accent: "from-emerald-400 to-teal-500" },
  { value: 98,   suffix: "%",  label: "Annual Client\nRetention", accent: "from-teal-400 to-blue-500" },
];

function AnimatedNumber({
  value, suffix, prefix, accent,
}: {
  value: number; suffix: string; prefix?: string; accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`tabular-nums bg-gradient-to-br ${accent} bg-clip-text text-transparent`}
    >
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Faint radial glow behind numbers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium mb-16"
        >
          Proven results
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-800/70">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="px-8 py-8 text-center group"
            >
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-none"
                style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  accent={stat.accent}
                />
              </div>
              <p className="text-slate-500 text-xs tracking-widest uppercase whitespace-pre-line leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
