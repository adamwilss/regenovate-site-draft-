"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

export default function Hero() {
  const [showContent, setShowContent] = useState(false);

  const skipIntro = () => setShowContent(true);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
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
              onWordFormed={() => {}}
              onComplete={() => setShowContent(true)}
            />

            {/* Skip button */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none select-none">
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
      {/*
        pb-28 clears the absolute scroll indicator (bottom-8 = 32px + its height).
        h-screen on the header means this div is always centred within the viewport
        with no risk of overflowing into the next section.
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pb-28">

        {/* Eyebrow */}
        <div className="overflow-hidden mb-7">
          <motion.p
            initial={{ y: "110%" }}
            animate={showContent ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium"
          >
            Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
          </motion.p>
        </div>

        {/* H1 — three lines, each clips up from overflow-hidden wrapper */}
        <h1
          className="font-bold mb-8"
          style={{
            fontFamily: '"DM Serif Display", "Playfair Display", serif',
            lineHeight: 1.05,
          }}
        >
          {/* pb-[0.2em] on each wrapper gives descenders room so nothing is clipped */}
          <div className="overflow-hidden pb-[0.2em]">
            <motion.span
              className="block text-[clamp(3rem,9vw,8.5rem)] text-white"
              initial={{ y: "115%" }}
              animate={showContent ? { y: 0 } : { y: "115%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              We invest in
            </motion.span>
          </div>
          <div className="overflow-hidden pb-[0.2em]">
            <motion.span
              className="block text-[clamp(3rem,9vw,8.5rem)] text-white"
              initial={{ y: "115%" }}
              animate={showContent ? { y: 0 } : { y: "115%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              businesses
            </motion.span>
          </div>
          <div className="overflow-hidden pb-[0.3em]">
            <motion.span
              className="block text-[clamp(3rem,9vw,8.5rem)] italic gradient-text"
              initial={{ y: "115%" }}
              animate={showContent ? { y: 0 } : { y: "115%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
            >
              like yours.
            </motion.span>
          </div>
        </h1>

        {/* Body — clips up */}
        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ y: "110%" }}
            animate={showContent ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
            className="text-sm md:text-base text-slate-400 max-w-lg mx-auto leading-relaxed tracking-wide"
          >
            Exit your business and secure your legacy. We invest, partner, or
            acquire — then transform and scale — protecting your team throughout.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.64 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="/solutions"
            strength={0.25}
            className="px-9 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide rounded-full transition-all hover:shadow-xl hover:shadow-blue-500/25 inline-block text-sm"
          >
            Discover Our Approach
          </MagneticButton>
          <MagneticButton
            href="/contact"
            strength={0.25}
            className="px-9 py-4 border border-slate-700 hover:border-blue-400 text-slate-400 hover:text-white font-semibold tracking-wide rounded-full transition-all inline-block text-sm"
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
