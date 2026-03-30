"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroParticleIntro } from "@/components/ui/hero-particle-intro";

/* ─── Character scramble hook ───────────────────────────────────── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%$!";

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

      const charStart = startDelay + i * 50;
      const steps = 10;

      for (let s = 0; s < steps; s++) {
        timers.push(
          setTimeout(() => {
            if (settled.current[i]) return;
            setOutput(p => {
              const n = [...p];
              n[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              return n;
            });
          }, charStart + s * 45)
        );
      }

      // Settle on real character
      timers.push(
        setTimeout(() => {
          settled.current[i] = true;
          setOutput(p => { const n = [...p]; n[i] = target; return n; });
        }, charStart + steps * 45)
      );
    });

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return output.join("");
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [showContent, setShowContent] = useState(false);

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

      {/* Orbs — slightly more vibrant */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="orb w-[700px] h-[700px] bg-blue-600/25 -top-64 -left-48" style={{ animationDelay: "0s" }} />
        <div className="orb w-[500px] h-[500px] bg-blue-500/15 top-1/3 right-[-10%]"  style={{ animationDelay: "-7s" }} />
        <div className="orb w-[400px] h-[400px] bg-emerald-500/10 bottom-[-10%] left-1/3" style={{ animationDelay: "-14s" }} />
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
        {!showContent && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-[10]"
          >
            <HeroParticleIntro
              onWordFormed={() => {}}
              onComplete={() => setShowContent(true)}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none select-none">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setShowContent(true)}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wider uppercase pointer-events-auto cursor-pointer"
              >
                Skip intro
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN HERO CONTENT ════════════════════════════════════ */}
      <HeroContent show={showContent} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] text-slate-600 tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent"
        />
      </motion.div>
    </header>
  );
}

/* ─── Content component — isolated so scramble hook fires cleanly ─ */
function HeroContent({ show }: { show: boolean }) {
  const scrambled = useScramble("BUSINESSES", show, 180);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pb-24">

      {/* ── Eyebrow pill ── */}
      <div className="overflow-hidden mb-8">
        <motion.div
          initial={{ y: "130%" }}
          animate={show ? { y: 0 } : { y: "130%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-500/25 bg-blue-500/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium">
            Invest &nbsp;·&nbsp; Partner &nbsp;·&nbsp; Acquire
          </span>
        </motion.div>
      </div>

      {/* ── LINE 1: "We invest in" — per-word 3D flip reveal ── */}
      <div className="mb-0" style={{ perspective: "1200px" }}>
        <div
          className="flex flex-nowrap justify-center"
          style={{
            fontFamily: '"DM Serif Display", "Playfair Display", serif',
            fontSize: "clamp(2.6rem, 6.8vw, 7.5rem)",
            lineHeight: 1.02,
            color: "white",
            fontWeight: 400,
          }}
        >
          {["We", "invest", "in"].map((word, i) => (
            <span key={word} className="overflow-hidden pb-[0.15em] mr-[0.22em] last:mr-0">
              <motion.span
                className="inline-block"
                initial={{ y: "120%", rotateX: 18, opacity: 0 }}
                animate={
                  show
                    ? { y: 0, rotateX: 0, opacity: 1 }
                    : { y: "120%", rotateX: 18, opacity: 0 }
                }
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.04 + i * 0.11,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </div>
      </div>

      {/* ── LINE 2: "BUSINESSES" — Bebas Neue, character scramble + shimmer ── */}
      <div className="overflow-hidden pb-[0.1em]">
        <motion.div
          initial={{ y: "105%", opacity: 0 }}
          animate={show ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="leading-none"
          style={{
            fontFamily: '"Bebas Neue", "DM Serif Display", serif',
            fontSize: "clamp(5rem, 17vw, 19rem)",
            lineHeight: 0.88,
            letterSpacing: "0.06em",
          }}
        >
          <span className="businesses-text">{scrambled || "\u00A0"}</span>
        </motion.div>
      </div>

      {/* ── LINE 3: "like yours." — italic DM Serif, flowing gradient ── */}
      <div className="overflow-hidden pb-[0.3em] mb-10">
        <motion.span
          className="block italic"
          initial={{ y: "120%" }}
          animate={show ? { y: 0 } : { y: "120%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
          style={{
            fontFamily: '"DM Serif Display", "Playfair Display", serif',
            fontSize: "clamp(2.6rem, 6.8vw, 7.5rem)",
            lineHeight: 1.05,
          }}
        >
          <span className="gradient-text-flow">like yours.</span>
        </motion.span>
      </div>

      {/* ── Body copy ── */}
      <div className="overflow-hidden mb-11">
        <motion.p
          initial={{ y: "110%" }}
          animate={show ? { y: 0 } : { y: "110%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
          className="text-sm md:text-base text-slate-400 max-w-lg mx-auto leading-relaxed tracking-wide"
        >
          Exit your business and secure your legacy. We invest, partner, or
          acquire — then transform and scale — protecting your team throughout.
        </motion.p>
      </div>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.72 }}
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
          className="px-9 py-4 border border-slate-700 hover:border-blue-400/50 text-slate-400 hover:text-white font-semibold tracking-wide rounded-xl transition-all inline-block text-sm"
        >
          Get Started
        </MagneticButton>
      </motion.div>
    </div>
  );
}
