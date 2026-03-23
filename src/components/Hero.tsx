"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { ParticleField } from "@/components/ui/particle-field";

const PARTICLE_COLORS = [
  { r: 52, g: 211, b: 153 },   // emerald-400 — "Regenerate"
  { r: 45, g: 212, b: 191 },   // teal-400 — "Innovate"
  { r: 65, g: 105, b: 225 },   // royal blue — "Regenovate"
];

const WORDS = ["Regenerate", "Innovate", "Regenovate"];
const SUBTITLES = [
  "To restore. To renew. To give back.",
  "To reimagine. To transform. To create.",
  "Regenerate + Innovate",
];

// 6 seconds per word, content appears after Regenovate settles
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
    // Trigger shockwave just before content appears
    const shockwaveTimer = setTimeout(() => setPhase("shockwave"), (CONTENT_DELAY - 2) * 1000);
    const contentTimer = setTimeout(() => setPhase("content"), CONTENT_DELAY * 1000);
    return () => {
      clearTimeout(shockwaveTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* === LAYER 0: Interactive particle field (always visible) === */}
      <ParticleField
        particleCount={90}
        connectionDistance={130}
        mouseRadius={160}
        baseHue={160}
        className="z-0"
      />

      {/* === LAYER 1: Background orbs === */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div
          className="orb w-[600px] h-[600px] bg-emerald-600/20 -top-48 -left-48"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="orb w-[500px] h-[500px] bg-teal-500/15 top-1/3 right-[-10%]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-emerald-500/10 bottom-[-10%] left-1/3"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      {/* === LAYER 2: Grid overlay === */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* === LAYER 3: Shockwave effect === */}
      <AnimatePresence>
        {phase === "shockwave" && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute z-[5] w-48 h-48 rounded-full border-2 border-blue-400/60"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
              className="absolute z-[5] w-48 h-48 rounded-full border border-emerald-400/40"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute z-[5] w-32 h-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(65,105,225,0.5) 0%, rgba(52,211,153,0.2) 50%, transparent 70%)",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* === LAYER 4: Particle text animation === */}
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
          fontSize={85}
          fontFamily="'Playfair Display', Georgia, serif"
          bgColor="rgba(2, 6, 23, 0.08)"
          pixelSteps={7}
          mouseRadius={90}
          glow={true}
          onWordChange={onWordChange}
          className="w-full max-w-5xl pointer-events-auto cursor-crosshair"
        />

        {/* Animated subtitle under the particle text */}
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

        {/* Word progress indicator */}
        <div className="flex gap-2 mt-8">
          {WORDS.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              animate={{
                width: currentWordIndex === i ? 32 : 8,
                backgroundColor:
                  currentWordIndex === i
                    ? `rgb(${PARTICLE_COLORS[i].r}, ${PARTICLE_COLORS[i].g}, ${PARTICLE_COLORS[i].b})`
                    : "rgb(71, 85, 105)",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>

      {/* === LAYER 5: Main hero content (fades in after intro) === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          phase === "content"
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          Regenerate + Innovate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Transforming systems
          <br />
          for a <span className="gradient-text">regenerative</span> future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We help businesses and communities innovate with purpose — creating
          solutions that are sustainable, resilient, and beneficial for both
          people and the planet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-slate-600 hover:border-emerald-500 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5"
          >
            Start a Conversation
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "content" ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"
        />
      </motion.div>
    </header>
  );
}
