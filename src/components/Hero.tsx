"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";

const CONTENT_DELAY = 12;

export default function Hero() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), CONTENT_DELAY * 1000);
    return () => clearTimeout(timer);
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

      {/* === GOOEY TEXT MORPHING ANIMATION === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none"
      >
        <GooeyText
          texts={["Regenerate", "Innovate", "Regenovate"]}
          morphTime={1.5}
          cooldownTime={3}
          className="h-[120px] md:h-[160px] w-full"
          textClassName="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-slate-400 text-sm sm:text-base tracking-[0.25em] uppercase mt-4"
        >
          Regenerate + Innovate = Regenovate
        </motion.p>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={() => setShowContent(true)}
          className="mt-12 text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wider uppercase pointer-events-auto"
        >
          Skip intro
        </motion.button>
      </motion.div>

      {/* === MAIN HERO CONTENT === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          We Invest, Partner &amp; Acquire
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Imagine if you could exit your business AND secure your legacy.
          We invest, partner or acquire businesses to transform and scale them —
          protecting your most valuable asset, your dedicated team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="/solutions"
            strength={0.25}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-blue-500/25 inline-block"
          >
            Discover Our Approach
          </MagneticButton>
          <MagneticButton
            href="/contact"
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
        animate={{ opacity: showContent ? 1 : 0 }}
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
