"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [introPhase, setIntroPhase] = useState<'intro' | 'settling' | 'done'>('intro');

  return (
    <header className="relative h-screen flex items-center overflow-hidden">

      {/* Background particle field */}
      <ParticleField
        particleCount={90}
        connectionDistance={130}
        mouseRadius={160}
        baseHue={225}
        className="z-0"
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="orb w-[700px] h-[700px] -top-64 -left-48"
          style={{ backgroundColor: "var(--orb-primary)", animationDelay: "0s" }} />
        <div className="orb w-[500px] h-[500px] top-1/3 right-[-10%]"
          style={{ backgroundColor: "var(--orb-secondary)", animationDelay: "-7s" }} />
        <div className="orb w-[400px] h-[400px] bottom-[-10%] left-1/3"
          style={{ backgroundColor: "var(--orb-tertiary)", animationDelay: "-14s" }} />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══ PARTICLE INTRO ════════════════════════════════════════ */}
      <AnimatePresence>
        {introPhase !== 'done' && (
          <motion.div
            key="intro"
            animate={{ opacity: introPhase === 'intro' ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 z-[10]"
          >
            <HeroParticleIntro
              onWordFormed={() => {}}
              onSettleBegin={() => setIntroPhase('settling')}
              onComplete={() => setIntroPhase('done')}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none select-none">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIntroPhase('done')}
                className="text-xs transition-colors tracking-wider uppercase pointer-events-auto cursor-pointer"
                style={{ color: "var(--text-faint)" }}
              >
                Skip intro
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN HERO CONTENT ════════════════════════════════════ */}
      <HeroContent show={introPhase === 'done'} />

      {/* Scroll indicator — left-aligned to match layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introPhase === 'done' ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-8 md:left-16 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--text-faint)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-blue-400/50 to-transparent"
        />
      </motion.div>
    </header>
  );
}

/* ─── Content ────────────────────────────────────────────────────── */
function HeroContent({ show }: { show: boolean }) {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
  });

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20">

      {/* ── R. design element — large right-anchored graphic ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: "clamp(22rem, 38vw, 52rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: "rgba(31,94,220,0.07)",
            display: "block",
            userSelect: "none",
          }}
        >
          R.
        </span>
      </motion.div>

      {/* ── Left content column ── */}
      <div className="relative max-w-2xl">

        {/* Eyebrow label */}
        <motion.p
          {...fadeUp(0)}
          className="text-[10px] tracking-[0.6em] uppercase mb-10 font-medium"
          style={{ color: "var(--text-faint)" }}
        >
          Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
        </motion.p>

        {/* ── Headline grid: verb + descriptor ── */}
        <div className="mb-10 flex flex-col gap-1">
          {([
            { verb: "STABILISE", noun: "your people"      },
            { verb: "SYSTEMISE", noun: "your process"     },
            { verb: "SCALE",     noun: "your performance" },
          ] as const).map(({ verb, noun }, i) => (
            <motion.div
              key={verb}
              {...fadeUp(0.08 + i * 0.1)}
              className="flex items-baseline gap-3 md:gap-5 leading-none"
            >
              <span
                className="gradient-text-flow shrink-0"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "clamp(3.8rem, 10vw, 10rem)",
                  letterSpacing: "0.03em",
                  lineHeight: 0.93,
                }}
              >
                {verb}
              </span>
              <span
                style={{
                  fontFamily: '"DM Serif Display", "Playfair Display", serif',
                  fontSize: "clamp(1.1rem, 2.8vw, 2.8rem)",
                  fontStyle: "italic",
                  lineHeight: 1,
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {noun}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Body copy — short and hard ── */}
        <motion.p
          {...fadeUp(0.46)}
          className="text-sm md:text-base max-w-md leading-relaxed tracking-wide mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          We fix, stabilise, and scale real businesses.
          Ownership thinking applied to transformation. No theory.
        </motion.p>

        {/* ── CTAs — come in after copy lands ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton
            href="/solutions"
            strength={0.25}
            className="px-9 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/30 inline-block text-sm"
          >
            Discover Our Approach
          </MagneticButton>
          <MagneticButton
            href="/contact"
            strength={0.25}
            className="px-9 py-4 font-semibold tracking-wide rounded-xl transition-all inline-block text-sm [border:1px_solid_var(--border-subtle)] [color:var(--text-muted)] hover:[color:var(--text-primary)]"
          >
            Get Started
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
