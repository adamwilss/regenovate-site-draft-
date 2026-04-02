"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

/* ─── Character scramble hook ───────────────────────────────────── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function useScramble(text: string, active: boolean, startDelay = 0) {
  const [output, setOutput] = useState<string[]>(() => Array(text.length).fill(""));
  const settled = useRef(Array(text.length).fill(false));

  useEffect(() => {
    if (!active) return;
    settled.current = Array(text.length).fill(false);
    setOutput(Array(text.length).fill(""));

    const timers: ReturnType<typeof setTimeout>[] = [];

    text.split("").forEach((target, i) => {
      if (target === " ") {
        settled.current[i] = true;
        setOutput(p => { const n = [...p]; n[i] = " "; return n; });
        return;
      }
      const charStart = startDelay + i * 55;
      const steps = 10;
      for (let s = 0; s < steps; s++) {
        timers.push(setTimeout(() => {
          if (settled.current[i]) return;
          setOutput(p => {
            const n = [...p];
            n[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            return n;
          });
        }, charStart + s * 45));
      }
      timers.push(setTimeout(() => {
        settled.current[i] = true;
        setOutput(p => { const n = [...p]; n[i] = target; return n; });
      }, charStart + steps * 45));
    });

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return output.join("");
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [introPhase, setIntroPhase] = useState<'intro' | 'settling' | 'done'>('intro');

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background particle field */}
      <ParticleField
        particleCount={90}
        connectionDistance={130}
        mouseRadius={160}
        baseHue={225}
        className="z-0"
      />

      {/* Ambient orbs — colours driven by CSS vars via inline style */}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introPhase === 'done' ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
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
  const scrambled = useScramble("INVEST", show, 180);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
  });

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pb-20">

      {/* ── Eyebrow pill ── */}
      <div className="mb-10">
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-sm"
          style={{ border: "1px solid var(--border-subtle)", background: "rgba(65,105,225,0.06)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium">
            Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
          </span>
        </motion.div>
      </div>

      {/* ── "We" — small label above ── */}
      <motion.p
        {...fadeUp(0.05)}
        className="mb-1 text-sm md:text-base font-light tracking-[0.55em] uppercase"
        style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif' }}
      >
        We
      </motion.p>

      {/* ── "INVEST" — the hero word ── */}
      <motion.div {...fadeUp(0.14)} className="leading-none mb-2">
        <span
          className="invest-text"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: "clamp(6.5rem, 23vw, 24rem)",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            display: "block",
          }}
        >
          {scrambled || "\u00A0"}
        </span>
      </motion.div>

      {/* ── "in businesses like yours." — italic serif, one flowing line ── */}
      <motion.div {...fadeUp(0.28)} className="mb-12">
        <span
          className="italic block"
          style={{
            fontFamily: '"DM Serif Display", "Playfair Display", serif',
            fontSize: "clamp(1.6rem, 4.2vw, 5rem)",
            lineHeight: 1.2,
            color: "var(--hero-sub)",
          }}
        >
          in businesses{" "}
          <span className="gradient-text-flow not-italic" style={{ fontStyle: "normal" }}>
            like yours.
          </span>
        </span>
      </motion.div>

      {/* ── Body copy ── */}
      <motion.p
        {...fadeUp(0.42)}
        className="text-sm md:text-base max-w-lg mx-auto leading-relaxed tracking-wide mb-10"
        style={{ color: "var(--text-muted)" }}
      >
        Ready to step back and protect what you have built? We invest, partner
        or acquire, then transform and scale. Your team stays safe throughout.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.56 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
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
  );
}
