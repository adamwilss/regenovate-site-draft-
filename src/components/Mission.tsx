"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "@/components/ui/typewriter";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const WORDS = ["Regenovate", "Innovate", "Regenerate"];
const COLORS = [
  { r: 65, g: 105, b: 225 },   // royal blue
  { r: 45, g: 212, b: 191 },   // teal
  { r: 52, g: 211, b: 153 },   // emerald
];

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Typewriter text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Mission
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
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
            <p className="text-slate-400 leading-relaxed mb-6">
              We take traditional businesses with fragmented systems and
              infrastructure and equip them to prosper using the power of Cloud
              technology. Our Transformation Programme teaches businesses to do
              &lsquo;more of what works&rsquo; and less of what doesn&apos;t — leading
              to predictable, measurable, and repeatable growth.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Efficiencies gained through Cloud technology mean our partner
              businesses can double their volume with the same effort, resulting
              in significantly improved profits. We reinvest these into proven
              marketing campaigns, putting the business on autopilot.
            </p>
          </motion.div>

          {/* Right: Particle text animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full aspect-[2/1] max-w-lg">
              <ParticleTextEffect
                words={WORDS}
                colors={COLORS}
                transitionInterval={300}
                width={600}
                height={300}
                fontSize={60}
                fontFamily="'Playfair Display', Georgia, serif"
                particleSpacing={4}
                mouseRadius={80}
                connectionDistance={25}
                className="w-full h-full cursor-crosshair rounded-2xl"
              />
              {/* Subtle border frame */}
              <div className="absolute inset-0 rounded-2xl border border-slate-800/50 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
