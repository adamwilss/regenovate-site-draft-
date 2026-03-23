"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Generate deterministic particles for the explosion
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.2;
    const distance = 80 + (i * 37) % 200;
    particles.push({
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 2 + (i % 4) * 2,
      delay: (i % 5) * 0.02,
    });
  }
  return particles;
}

const PARTICLES = generateParticles(40);

// Animation timeline (seconds)
const T = {
  wordsStart: 0.3,
  wordsDuration: 1.0,
  collide: 1.3,       // when words meet
  flash: 1.3,
  flashDuration: 0.4,
  particles: 1.3,
  merged: 1.8,        // regenovate appears
  mergedDuration: 0.6,
  shockwave: 1.8,
  contentStart: 3.0,   // hero content fades in
};

export default function Hero() {
  const [phase, setPhase] = useState<"intro" | "content">("intro");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("content"), T.contentStart * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="orb w-[600px] h-[600px] bg-emerald-600/30 -top-48 -left-48"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="orb w-[500px] h-[500px] bg-teal-500/20 top-1/3 right-[-10%]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-emerald-500/15 bottom-[-10%] left-1/3"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* === WORD COLLISION ANIMATION === */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {/* "REGENERATE" flies in from left */}
        <motion.span
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{
            x: phase === "intro" ? ["-100vw", "0vw", "0vw"] : "0vw",
            opacity: phase === "intro" ? [0, 1, 0] : 0,
          }}
          transition={{
            x: {
              times: [0, 0.5, 1],
              duration: T.collide + 0.8,
              delay: T.wordsStart,
              ease: ["easeOut", "easeIn"],
            },
            opacity: {
              times: [0, 0.3, 1],
              duration: T.collide + 0.8,
              delay: T.wordsStart,
            },
          }}
          className="absolute text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Regenerate
        </motion.span>

        {/* "INNOVATE" flies in from right */}
        <motion.span
          initial={{ x: "100vw", opacity: 0 }}
          animate={{
            x: phase === "intro" ? ["100vw", "0vw", "0vw"] : "0vw",
            opacity: phase === "intro" ? [0, 1, 0] : 0,
          }}
          transition={{
            x: {
              times: [0, 0.5, 1],
              duration: T.collide + 0.8,
              delay: T.wordsStart,
              ease: ["easeOut", "easeIn"],
            },
            opacity: {
              times: [0, 0.3, 1],
              duration: T.collide + 0.8,
              delay: T.wordsStart,
            },
          }}
          className="absolute text-3xl sm:text-5xl md:text-7xl font-bold text-emerald-400 tracking-tighter"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Innovate
        </motion.span>

        {/* Flash on collision */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 3] }}
          transition={{
            duration: T.flashDuration,
            delay: T.flash,
            ease: "easeOut",
          }}
          className="absolute w-40 h-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.8) 0%, rgba(16,185,129,0.4) 40%, transparent 70%)",
          }}
        />

        {/* Particle explosion */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
            animate={{
              x: [0, p.x * 0.5, p.x],
              y: [0, p.y * 0.5, p.y],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.0,
              delay: T.particles + p.delay,
              ease: "easeOut",
            }}
            className="absolute rounded-full bg-emerald-400"
            style={{ width: p.size, height: p.size }}
          />
        ))}

        {/* Shockwave ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 4, 8] }}
          transition={{
            duration: 1.2,
            delay: T.shockwave,
            ease: "easeOut",
          }}
          className="absolute w-32 h-32 rounded-full border-2 border-emerald-400/60"
        />

        {/* Second shockwave */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.3, 0], scale: [0, 3, 6] }}
          transition={{
            duration: 1.0,
            delay: T.shockwave + 0.15,
            ease: "easeOut",
          }}
          className="absolute w-32 h-32 rounded-full border border-teal-400/40"
        />

        {/* "REGENOVATE" emerges from the explosion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.3, 0.3, 1.1, 1, 1],
            filter: [
              "blur(20px)",
              "blur(20px)",
              "blur(0px)",
              "blur(0px)",
              "blur(0px)",
            ],
          }}
          transition={{
            times: [0, 0.1, 0.5, 0.7, 1],
            duration: T.contentStart - T.merged + 0.5,
            delay: T.merged,
            ease: "easeOut",
          }}
          className="absolute flex flex-col items-center"
        >
          <span
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gradient-text tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Regenovate
          </span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 0] }}
            transition={{
              times: [0, 0.3, 0.6, 0.8, 1],
              duration: T.contentStart - T.merged + 0.3,
              delay: T.merged + 0.2,
            }}
            className="text-sm sm:text-base text-emerald-400/80 tracking-[0.3em] uppercase mt-4 font-medium"
          >
            Regenerate + Innovate
          </motion.span>
        </motion.div>
      </div>

      {/* === MAIN HERO CONTENT (fades in after animation) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "content" ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          Regenerate + Innovate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={
            phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
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
          transition={{ duration: 0.6, delay: 0.4 }}
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
          transition={{ duration: 0.6, delay: 0.6 }}
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
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </header>
  );
}
