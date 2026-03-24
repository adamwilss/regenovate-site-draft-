"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { MagneticButton } from "@/components/ui/magnetic-button";

// ─── Letter mapping ────────────────────────────────────────────────
// "Regenovate" = "Regen" (from Regenerate[0-4]) + "ovate" (from Innovate[3-7])
//
// Regenerate: R e g e n | e r a t e  ← last 5 scatter
// Innovate:   I n n | o v a t e      ← first 3 scatter
// ──────────────────────────────────────────────────────────────────

const REGEN = "Regenerate".split("");
const INNO  = "Innovate".split("");
const FINAL = "Regenovate".split("");

type Src = "regen" | "inno";
const LETTER_MAP: { src: Src; idx: number }[] = [
  { src: "regen", idx: 0 }, // R
  { src: "regen", idx: 1 }, // e
  { src: "regen", idx: 2 }, // g
  { src: "regen", idx: 3 }, // e
  { src: "regen", idx: 4 }, // n
  { src: "inno",  idx: 3 }, // o
  { src: "inno",  idx: 4 }, // v
  { src: "inno",  idx: 5 }, // a
  { src: "inno",  idx: 6 }, // t
  { src: "inno",  idx: 7 }, // e
];
const REGEN_DISCARD = [5, 6, 7, 8, 9]; // e r a t e
const INNO_DISCARD  = [0, 1, 2];        // I n n

// ─── Types ────────────────────────────────────────────────────────
interface FlyLetter {
  letter: string;
  tgtTop: number; tgtLeft: number;   // fixed-position target
  ox: number; oy: number;            // initial offset from target
  delay: number;
  isInno: boolean;
}
interface ScatLetter {
  letter: string;
  top: number; left: number;
  dx: number; dy: number;
  delay: number;
  isInno: boolean;
}

// ─── Shared text class ────────────────────────────────────────────
const TEXT_CLS =
  "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap leading-none";

export default function Hero() {
  const [srcVisible,  setSrcVisible]  = useState(true);
  const [flying,      setFlying]      = useState(false);
  const [tgtVisible,  setTgtVisible]  = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [flyLetters,  setFlyLetters]  = useState<FlyLetter[]>([]);
  const [scatLetters, setScatLetters] = useState<ScatLetter[]>([]);

  const regenRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const innoRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const tgtRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // t=3 s: words have settled — compute positions & start fly
    const tFly = setTimeout(() => {
      const rR = regenRefs.current.map(r => r?.getBoundingClientRect());
      const iR = innoRefs.current.map(r => r?.getBoundingClientRect());
      const tR = tgtRefs.current.map(r => r?.getBoundingClientRect());

      const fly: FlyLetter[] = LETTER_MAP.map((m, i) => {
        const src = m.src === "regen" ? rR[m.idx] : iR[m.idx];
        const tgt = tR[i];
        if (!src || !tgt) return null;
        return {
          letter: FINAL[i],
          tgtTop:  tgt.top,
          tgtLeft: tgt.left,
          ox: src.left - tgt.left,
          oy: src.top  - tgt.top,
          delay: i * 0.05,
          isInno: m.src === "inno",
        };
      }).filter(Boolean) as FlyLetter[];

      const scat: ScatLetter[] = [
        ...REGEN_DISCARD.map((idx, i) => {
          const r = rR[idx]; if (!r) return null;
          return {
            letter: REGEN[idx], top: r.top, left: r.left,
            dx: (Math.random() - 0.5) * 500,
            dy: 80 + Math.random() * 250,
            delay: i * 0.06, isInno: false,
          };
        }),
        ...INNO_DISCARD.map((idx, i) => {
          const r = iR[idx]; if (!r) return null;
          return {
            letter: INNO[idx], top: r.top, left: r.left,
            dx: (Math.random() - 0.5) * 500,
            dy: 80 + Math.random() * 250,
            delay: i * 0.06, isInno: true,
          };
        }),
      ].filter(Boolean) as ScatLetter[];

      setFlyLetters(fly);
      setScatLetters(scat);
      setSrcVisible(false);
      setFlying(true);
    }, 3000);

    // t=4.2 s: flying letters arrive — show assembled word
    const tAssemble = setTimeout(() => {
      setTgtVisible(true);
      setFlying(false);
    }, 4200);

    // t=8 s: show main content
    const tContent = setTimeout(() => setShowContent(true), 8000);

    return () => [tFly, tAssemble, tContent].forEach(clearTimeout);
  }, []);

  const skipIntro = () => {
    setSrcVisible(false);
    setFlying(false);
    setTgtVisible(true);
    setShowContent(true);
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* ═══ INTRO LAYER ══════════════════════════════════════════ */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none select-none"
          >
            {/* Word stage — grid stacks all layers in one cell */}
            <div className="grid place-items-center w-full h-32 md:h-44">

              {/* ── Source words ── */}
              {srcVisible && (
                <div
                  className="flex items-center justify-center gap-6 md:gap-14"
                  style={{ gridArea: "1/1" }}
                >
                  {/* Regenerate */}
                  <motion.div
                    className="flex"
                    initial={{ x: "-70vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {REGEN.map((l, i) => (
                      <span
                        key={i}
                        ref={el => { regenRefs.current[i] = el; }}
                        className={`${TEXT_CLS} text-white`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {l}
                      </span>
                    ))}
                  </motion.div>

                  {/* Innovate */}
                  <motion.div
                    className="flex"
                    initial={{ x: "70vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {INNO.map((l, i) => (
                      <span
                        key={i}
                        ref={el => { innoRefs.current[i] = el; }}
                        className={`${TEXT_CLS} text-blue-400`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {l}
                      </span>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── Invisible target for measuring final letter positions ── */}
              <div
                className="flex opacity-0 pointer-events-none"
                style={{ gridArea: "1/1" }}
                aria-hidden
              >
                {FINAL.map((l, i) => (
                  <span
                    key={i}
                    ref={el => { tgtRefs.current[i] = el; }}
                    className={`${TEXT_CLS} text-white`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* ── Assembled "Regenovate" ── */}
              <AnimatePresence>
                {tgtVisible && (
                  <motion.div
                    key="assembled"
                    className="flex"
                    style={{ gridArea: "1/1" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {FINAL.map((l, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className={`${TEXT_CLS} text-white`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {l}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Equation subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: tgtVisible ? 1 : 0, y: tgtVisible ? 0 : 8 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-5 text-slate-400 text-xs sm:text-sm tracking-[0.3em] uppercase"
            >
              Regenerate + Innovate = Regenovate
            </motion.p>

            {/* Skip */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={skipIntro}
              className="mt-12 text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wider uppercase pointer-events-auto cursor-pointer"
            >
              Skip intro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FLYING LETTERS (fixed-positioned, travel to target) ══ */}
      {flying &&
        flyLetters.map((fl, i) => (
          <motion.span
            key={`fly-${i}`}
            className={`${TEXT_CLS} fixed pointer-events-none`}
            style={{
              top: fl.tgtTop,
              left: fl.tgtLeft,
              fontFamily: "var(--font-serif)",
              color: fl.isInno ? "#93c5fd" : "#ffffff",
              zIndex: 30,
              userSelect: "none",
            }}
            initial={{ x: fl.ox, y: fl.oy, opacity: 1 }}
            animate={{ x: 0, y: 0, opacity: 0 }}
            transition={{ duration: 0.72, delay: fl.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            {fl.letter}
          </motion.span>
        ))}

      {/* ═══ SCATTER LETTERS (discard — fall and fade) ════════════ */}
      {flying &&
        scatLetters.map((sl, i) => (
          <motion.span
            key={`scat-${i}`}
            className={`${TEXT_CLS} fixed pointer-events-none`}
            style={{
              top: sl.top,
              left: sl.left,
              fontFamily: "var(--font-serif)",
              color: sl.isInno ? "#60a5fa" : "#94a3b8",
              zIndex: 30,
              userSelect: "none",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: sl.dx,
              y: sl.dy,
              opacity: 0,
              scale: 0.15,
              rotate: (Math.random() - 0.5) * 180,
            }}
            transition={{ duration: 0.85, delay: sl.delay, ease: "easeIn" }}
          >
            {sl.letter}
          </motion.span>
        ))}

      {/* ═══ MAIN HERO CONTENT ════════════════════════════════════ */}
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
