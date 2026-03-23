"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";

const PARTICLE_COLORS = [
  { r: 52, g: 211, b: 153 },   // emerald — "Regenerate"
  { r: 45, g: 212, b: 191 },   // teal — "Innovate"
  { r: 65, g: 105, b: 225 },   // royal blue — "Regenovate"
];

const WORDS = ["Regenerate", "Innovate", "Regenovate"];
const SUBTITLES = [
  "To restore. To renew. To protect.",
  "To transform. To scale. To grow.",
  "We invest in businesses like yours.",
];

const CONTENT_DELAY = 16;

export default function Hero() {
  const [phase, setPhase] = useState<"particles" | "shockwave" | "content">("particles");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [subtitle, setSubtitle] = useState(SUBTITLES[0]);

  const onWordChange = useCallback((index: number) => {
    setCurrentWordIndex(index);
    setSubtitle(SUBTITLES[index]);
  }, []);

  useEffect(() => {
    const shockwaveTimer = setTimeout(() => setPhase("shockwave"), (CONTENT_DELAY - 2) * 1000);
    const contentTimer = setTimeout(() => setPhase("content"), CONTENT_DELAY * 1000);
    return () => {
      clearTimeout(shockwaveTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive particle field */}
      <ParticleField
        particleCount={90}
        connectionDistance={130}
        mouseRadius={160}
        baseHue={225}
        className="z-0"
      />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="orb w-[600px] h-[600px] bg-blue-600/20 -top-48 -left-48" style={{ animationDelay: "0s" }} />
        <div className="orb w-[500px] h-[500px] bg-blue-500/15 top-1/3 right-[-10%]" style={{ animationDelay: "-7s" }} />
        <div className="orb w-[400px] h-[400px] bg-blue-400/10 bottom-[-10%] left-1/3" style={{ animationDelay: "-14s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[2]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Shockwave */}
      <AnimatePresence>
        {phase === "shockwave" && (
          <>
            <motion.div initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 8, opacity: 0 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute z-[5] w-48 h-48 rounded-full border-2 border-blue-400/60" />
            <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 6, opacity: 0 }} transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }} className="absolute z-[5] w-48 h-48 rounded-full border border-blue-300/40" />
            <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute z-[5] w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(65,105,225,0.5) 0%, rgba(65,105,225,0.2) 50%, transparent 70%)" }} />
          </>
        )}
      </AnimatePresence>

      {/* Particle text animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "content" ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none"
      >
        <ParticleTextEffect
          words={WORDS}
          colors={PARTICLE_COLORS}
          transitionInterval={360}
          width={1000}
          height={400}
          fontSize={90}
          fontFamily="'Playfair Display', Georgia, serif"
          particleSpacing={4}
          mouseRadius={100}
          connectionDistance={30}
          onWordChange={onWordChange}
          className="w-full max-w-5xl pointer-events-auto cursor-crosshair"
        />

        <AnimatePresence mode="wait">
          <motion.p
            key={subtitle}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.8 }}
            className="text-slate-400 text-sm sm:text-base tracking-[0.2em] uppercase mt-2"
          >
            {subtitle}
          </motion.p>
        </AnimatePresence>

        <div className="flex gap-2 mt-8">
          {WORDS.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              animate={{
                width: currentWordIndex === i ? 32 : 8,
                backgroundColor: currentWordIndex === i
                  ? `rgb(${PARTICLE_COLORS[i].r}, ${PARTICLE_COLORS[i].g}, ${PARTICLE_COLORS[i].b})`
                  : "rgb(71, 85, 105)",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          We Invest, Partner &amp; Acquire
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We invest in businesses
          <br />
          <span className="gradient-text">like yours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Imagine if you could exit your business AND secure your legacy.
          We invest, partner or acquire businesses to transform and scale them —
          protecting your most valuable asset, your dedicated team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#approach"
            strength={0.25}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-blue-500/25 inline-block"
          >
            Discover Our Approach
          </MagneticButton>
          <MagneticButton
            href="#contact"
            strength={0.25}
            className="px-8 py-4 border border-slate-600 hover:border-blue-500 text-white font-semibold rounded-full transition-all inline-block"
          >
            Get Started
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "content" ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"
        />
      </motion.div>
    </header>
  );
}
