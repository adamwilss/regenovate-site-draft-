"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [introPhase, setIntroPhase] = useState<'intro' | 'settling' | 'done'>('intro');
  const [resizeKey, setResizeKey] = useState(0);
  const skipRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    let lastWidth = window.innerWidth
    const onResize = () => {
      const newWidth = window.innerWidth
      if (newWidth === lastWidth) return  // ignore height-only changes (mobile browser chrome)
      lastWidth = newWidth
      clearTimeout(t)
      t = setTimeout(() => {
        setResizeKey(k => k + 1)
        setIntroPhase('intro')
      }, 300)
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t) }
  }, [])

  return (
    <header
      className="relative h-screen flex items-center overflow-hidden"
      data-theme="dark"
      style={{ backgroundColor: '#06070d' }}
    >

      {/* Background particle field — deferred until after intro to save GPU */}
      {introPhase !== 'intro' && (
        <ParticleField
          particleCount={window.innerWidth < 700 ? 40 : 90}
          connectionDistance={130}
          mouseRadius={160}
          baseHue={225}
          className="z-0"
        />
      )}

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

      {/* ═══ PARTICLE CANVAS — persistent throughout ═══════════════
          Runs the full intro animation, then fades its own dark
          background to transparent so the settled dots remain visible.
          Mouse repulsion active after settle phase.               */}
      <HeroParticleIntro
        key={resizeKey}
        onWordFormed={() => {}}
        onSettleBegin={() => setIntroPhase('settling')}
        onComplete={() => setIntroPhase('done')}
        skipRef={skipRef}
      />

      {/* ── Skip button — only visible during intro ────────────── */}
      <AnimatePresence>
        {introPhase === 'intro' && (
          <motion.div
            key="skip"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[10] pointer-events-none flex flex-col items-center justify-end pb-10 select-none"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => skipRef.current?.()}
              className="text-xs tracking-wider uppercase pointer-events-auto cursor-pointer transition-colors"
              style={{ color: "var(--text-faint)" }}
            >
              Skip intro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN HERO CONTENT ════════════════════════════════════ */}
      {/* show on 'settling' so it crossfades with the canvas bg fade */}
      <HeroContent show={introPhase !== 'intro'} />

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
      <div className="relative max-w-2xl">

        {/* Eyebrow label */}
        <motion.p
          {...fadeUp(0)}
          className="text-[10px] tracking-[0.6em] uppercase mb-10 font-medium"
          style={{ color: "var(--text-faint)" }}
        >
          Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
        </motion.p>

        {/* ── Headline: verb + descriptor pairs ── */}
        <div className="mb-10 flex flex-col gap-4 md:gap-5">
          {([
            { verb: "STABILISE", noun: "your people"      },
            { verb: "SYSTEMISE", noun: "your process"     },
            { verb: "SCALE",     noun: "your performance" },
          ] as const).map(({ verb, noun }, i) => (
            <motion.div
              key={verb}
              {...fadeUp(0.08 + i * 0.1)}
              className="flex flex-wrap items-baseline gap-3 md:gap-5 leading-none"
            >
              <span
                className="gradient-text-flow shrink-0"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: "clamp(2.4rem, 9vw, 10rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.95,
                }}
              >
                {verb}
              </span>
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 400,
                  fontSize: "clamp(1.1rem, 2.8vw, 2.8rem)",
                  fontStyle: "italic",
                  lineHeight: 1,
                  color: "var(--text-faint)",
                  whiteSpace: "normal",
                }}
              >
                {noun}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Body copy ── */}
        <motion.p
          {...fadeUp(0.46)}
          className="text-sm md:text-base max-w-md leading-relaxed tracking-wide mb-12"
          style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
        >
          We fix, stabilise, and scale real businesses.
          Ownership thinking applied to transformation. No theory.
        </motion.p>

        {/* ── CTAs ── */}
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
