"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "@/components/ui/typewriter";

const values = [
  { label: "People First",   icon: "01", desc: "If your team doesn't feel safe, aligned and clear, nothing else sticks. Every decision starts there." },
  { label: "Process Always", icon: "02", desc: "Repeatable, well-designed processes are what turn effort into results. Consistency before scale." },
  { label: "Performance",    icon: "03", desc: "Growth should be predictable, not accidental. We build systems that make that possible." },
];

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Mission statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Mission
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
            >
              Empowering businesses to{" "}
              <Typewriter
                text={[
                  "thrive in the modern economy",
                  "scale with confidence",
                  "protect their legacy",
                  "transform their future",
                ]}
                speed={60}
                className="text-blue-400"
                waitTime={2000}
                deleteSpeed={35}
                cursorChar="_"
                cursorClassName="ml-0.5 text-blue-400"
              />
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              We take traditional businesses with fragmented systems and turn them
              into structured, scalable operations. One version of the truth across
              the business. Clear, repeatable processes. Data that actually drives
              decisions. Teams that know where they&apos;re going and why.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Most of the businesses we work with can double output without doubling
              effort. Not through magic — just through clarity and systemisation.
              Stop wasting effort. Start compounding it.
            </p>
          </motion.div>

          {/* Right: Core values */}
          <div className="space-y-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-6 p-6 rounded-2xl"
                style={{
                  border: "1px solid var(--border-subtle)",
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                <span
                  className="text-4xl font-bold leading-none flex-shrink-0 bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent"
                  style={{ fontFamily: '"Bebas Neue", serif' }}
                >
                  {v.icon}
                </span>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{v.label}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
