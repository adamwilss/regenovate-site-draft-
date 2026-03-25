"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

export default function Hero() {
  const [showContent,  setShowContent]  = useState(false);
  const [showEquation, setShowEquation] = useState(false);

  const skipIntro = () => {
    setShowEquation(true);
    setShowContent(true);
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background particle field — visible after intro fades */}
      <ParticleField
        particleCount={90}
        connectionDistance={130}
        mouseRadius={160}
        baseHue={225}
        className="z-0"
      />

      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="orb w-[600px] h-[600px] bg-blue-600/20 -top-48 -left-48"  style={{ animationDelay: "0s" }}  />
        <div className="orb w-[500px] h-[500px] bg-blue-500/15 top-1/3 right-[-10%]"  style={{ animationDelay: "-7s" }} />
        <div className="orb w-[400px] h-[400px] bg-blue-400/10 bottom-[-10%] left-1/3" style={{ animationDelay: "-14s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══ PARTICLE INTRO ════════════════════════════════════════ */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-[10]"
          >
            {/* Canvas fills the entire intro layer */}
            <HeroParticleIntro
              onWordFormed={() => setShowEquation(true)}
              onComplete={() => setShowContent(true)}
            />

            {/* Overlays */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none select-none">
              {/* Equation — appears when Regenovate is formed */}
              <AnimatePresence>
                {showEquation && (
                  <motion.p
                    key="eq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-slate-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6"
                  >
                    Regenerate + Innovate = Regenovate
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={skipIntro}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wider uppercase pointer-events-auto cursor-pointer"
              >
                Skip intro
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN HERO CONTENT ════════════════════════════════════ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow — clips up */}
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ y: "110%" }}
            animate={showContent ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-blue-400 text-xs tracking-[0.4em] uppercase font-medium"
          >
            Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
          </motion.p>
        </div>

        {/* H1 — each line clips up independently */}
        <h1
          className="font-bold leading-[1.0] mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
              initial={{ y: "110%" }}
              animate={showContent ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              We invest in
            </motion.span>
          </div>
          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
              initial={{ y: "110%" }}
              animate={showContent ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              businesses{" "}
              <em className="gradient-text not-italic">like yours.</em>
            </motion.span>
          </div>
        </h1>

        {/* Thin rule sweeps in */}
        <div className="overflow-hidden my-8 flex justify-center">
          <motion.div
            className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={showContent ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          />
        </div>

        {/* Body copy — clips up */}
        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ y: "110%" }}
            animate={showContent ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Exit your business and secure your legacy. We invest, partner, or
            acquire — then transform and scale — while protecting your most
            valuable asset: your team.
          </motion.p>
        </div>

        {/* CTAs — fade + slight rise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.72 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="/solutions"
            strength={0.25}
            className="px-9 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide rounded-full transition-all hover:shadow-xl hover:shadow-blue-500/25 inline-block"
          >
            Discover Our Approach
          </MagneticButton>
          <MagneticButton
            href="/contact"
            strength={0.25}
            className="px-9 py-4 border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white font-semibold tracking-wide rounded-full transition-all inline-block"
          >
            Get Started
          </MagneticButton>
        </motion.div>
      </div>

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
