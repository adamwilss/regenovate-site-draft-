"use client";

import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useMotionValueEvent, MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { pillars } from "@/lib/pillar-data";

// ─── Fuse wire paths (kinked, organic) ──────────────────────────────
const MEANDER_A = "M 40 0 L 45 70 L 32 150 L 50 230 L 36 320 L 44 400 L 40 500";
const MEANDER_B = "M 40 0 L 34 65 L 50 145 L 30 235 L 48 315 L 35 410 L 40 500";

/* ─── Fuse Wire Connector ────────────────────────────────────────── */
function FuseConnector({
  progress,
  fromColor,
  toColor,
  pathD,
  id,
}: {
  progress: MotionValue<number>;
  fromColor: string;
  toColor: string;
  pathD: string;
  id: string;
}) {
  const pathRef   = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const dotX = useMotionValue(40);
  const dotY = useMotionValue(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const beamProgress = useTransform(progress, [0.08, 0.88], [0, 1]);
  const travelT      = useTransform(progress, [0.08, 0.88], [0, 1]);

  useMotionValueEvent(travelT, "change", t => {
    if (!pathRef.current || pathLen === 0) return;
    const pt = pathRef.current.getPointAtLength(t * pathLen);
    dotX.set(pt.x);
    dotY.set(pt.y);
  });

  const arrowOp  = useTransform(progress, [0.80, 1.0], [0, 1]);

  return (
    <div className="flex flex-col items-center justify-center w-20 flex-shrink-0 self-stretch">
      <svg
        width="80"
        height="100%"
        viewBox="0 0 80 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-20 flex-1"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={`fuse-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={toColor} stopOpacity="0.9"/>
          </linearGradient>
          <filter id={`spark-glow-${id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Static dashed track */}
        <path
          d={pathD}
          stroke="var(--border-subtle)"
          strokeWidth="1"
          strokeDasharray="2 6"
          fill="none"
        />

        {/* Animated beam */}
        <motion.path
          ref={pathRef}
          d={pathD}
          stroke={`url(#fuse-grad-${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: beamProgress }}
        />

        {/* Spark dot travelling along path */}
        <motion.circle
          cx={dotX}
          cy={dotY}
          r={4}
          fill={toColor}
          style={{
            opacity: beamProgress,
            filter: `url(#spark-glow-${id}) drop-shadow(0 0 8px ${toColor}) drop-shadow(0 0 3px white)`,
          }}
        />

        {/* Burst circle at path end */}
        <motion.circle
          cx={40}
          cy={500}
          r={6}
          fill="none"
          stroke={toColor}
          strokeWidth="1.5"
          style={{
            opacity: arrowOp,
            filter: `drop-shadow(0 0 6px ${toColor})`,
          }}
        />

        {/* Diamond tip at bottom */}
        <motion.path
          d="M 40 488 L 46 500 L 40 512 L 34 500 Z"
          fill={toColor}
          style={{
            opacity: arrowOp,
            filter: `drop-shadow(0 0 6px ${toColor})`,
          }}
        />
      </svg>
    </div>
  );
}

/* ─── Pillar card — bold statement ───────────────────────────────── */
function PillarCard({
  pillar,
  progress,
}: {
  pillar: typeof pillars[0];
  progress: MotionValue<number>;
}) {
  const filterVal = useTransform(
    progress,
    p => `grayscale(${(1 - p) * 80}%) brightness(${0.3 + p * 0.7})`
  );
  const borderGlow = useTransform(progress, p => {
    const hex = Math.round(p * 40).toString(16).padStart(2, "0");
    const gHex = Math.round(p * 55).toString(16).padStart(2, "0");
    return `0 0 0 1px ${pillar.letterColor}${hex}, 0 0 60px ${pillar.glowColor.replace("0.35", String((p * 0.35).toFixed(2)))}${gHex}`;
  });
  const glowOp    = useTransform(progress, [0.0, 0.4], [0, 1]);
  const headerOp  = useTransform(progress, [0.0, 0.22], [0, 1]);
  const headerY   = useTransform(progress, [0.0, 0.22], [24, 0]);
  const titleSc   = useTransform(progress, [0.05, 0.35], [0.92, 1]);
  const descOp    = useTransform(progress, [0.2, 0.5], [0, 1]);
  const ctaOp     = useTransform(progress, [0.45, 0.75], [0, 1]);
  const ctaY      = useTransform(progress, [0.45, 0.75], [16, 0]);

  return (
    <motion.div
      className="relative flex-1 rounded-3xl overflow-hidden flex flex-col"
      style={{
        filter: filterVal,
        boxShadow: borderGlow,
        background: `linear-gradient(160deg, ${pillar.cardGradient})`,
        minHeight: "540px",
      }}
    >
      {/* Colour wash */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
        style={{ opacity: glowOp }}
      />
      {/* Inner border */}
      <div
        className="absolute inset-[1px] rounded-3xl pointer-events-none"
        style={{ border: `1px solid ${pillar.letterColor}18` }}
      />

      <div className="relative p-12 flex flex-col h-full">

        {/* Icon row */}
        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="flex items-start justify-between mb-8"
        >
          <div className="w-12 h-12" style={{ color: pillar.letterColor }}>
            {pillar.icon}
          </div>
          <span
            className="text-[9px] tracking-[0.5em] uppercase font-medium"
            style={{ color: pillar.letterColor, opacity: 0.45 }}
          >
            {pillar.subtitle}
          </span>
        </motion.div>

        {/* PEOPLE / STABILISE block */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-6">
          <p
            className="text-[10px] tracking-[0.6em] uppercase font-semibold mb-2"
            style={{ color: pillar.letterColor }}
          >
            {pillar.subtitle}
          </p>
          <motion.h3
            style={{ scale: titleSc, transformOrigin: "left center" }}
            className="leading-none"
            aria-label={pillar.title}
          >
            <span
              style={{
                fontFamily: '"Bebas Neue", serif',
                fontSize: "clamp(4rem, 7.5vw, 8.5rem)",
                color: "var(--text-primary)",
                display: "block",
                letterSpacing: "0.02em",
              }}
            >
              {pillar.title}
            </span>
          </motion.h3>
        </motion.div>

        {/* Thin separator */}
        <motion.div
          style={{ opacity: descOp, background: `linear-gradient(to right, ${pillar.letterColor}40, transparent)` }}
          className="h-px mb-6"
        />

        {/* Description */}
        <motion.p
          style={{ opacity: descOp, color: "var(--text-muted)" }}
          className="text-sm leading-relaxed flex-1"
        >
          {pillar.desc}
        </motion.p>

        {/* Explore CTA */}
        <motion.div style={{ opacity: ctaOp, y: ctaY }} className="mt-8">
          <Link
            href={`/${pillar.slug}`}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-base tracking-wide transition-all group"
            style={{
              background: `${pillar.letterColor}14`,
              border: `1px solid ${pillar.letterColor}35`,
              color: pillar.letterColor,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = pillar.letterColor;
              (e.currentTarget as HTMLAnchorElement).style.color = "#0d1b3e";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${pillar.letterColor}14`;
              (e.currentTarget as HTMLAnchorElement).style.color = pillar.letterColor;
            }}
          >
            <span>Explore {pillar.title}</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Section header with scroll-reactive flow bar ───────────────── */
const PILL_COLORS = [pillars[0].letterColor, pillars[1].letterColor, pillars[2].letterColor];
const PILL_LABELS = ["PEOPLE", "PROCESS", "PERFORMANCE"];

function SectionHeader({
  visible,
  activePillar,
}: {
  visible: boolean;
  activePillar: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-6"
    >
      <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-4">
        The Business Transformation Programme
      </p>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
      >
        Stabilise. Systemise. Scale.
      </h2>
      <p className="max-w-xl mx-auto text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
        You cannot scale broken systems or an unstable team. The sequence is non-negotiable.
        People first. Process second. Performance follows.
      </p>

      {/* Scroll-reactive flow bar */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {PILL_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <motion.span
              animate={{
                color: activePillar >= i ? PILL_COLORS[i] : "var(--text-muted)",
                scale: activePillar === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[9px] tracking-[0.4em] uppercase font-semibold px-4 py-1.5 rounded-full cursor-default select-none"
              style={{
                border: `1px solid ${activePillar >= i ? PILL_COLORS[i] + "40" : "var(--border-subtle)"}`,
                background: activePillar === i ? `${PILL_COLORS[i]}10` : "rgba(255,255,255,0.02)",
                boxShadow: activePillar === i ? `0 0 14px ${PILL_COLORS[i]}30` : "none",
                transition: "border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              {label}
            </motion.span>
            {i < 2 && (
              <motion.span
                animate={{ opacity: activePillar > i ? 0.7 : 0.2 }}
                transition={{ duration: 0.4 }}
                className="text-base"
                style={{ color: PILL_COLORS[i] }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Desktop: scroll-jacked ─────────────────────────────────────── */
function PillarsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });
  const [activePillar, setActivePillar] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", v => {
    if (v >= 0.68) setActivePillar(2);
    else if (v >= 0.38) setActivePillar(1);
    else setActivePillar(0);
  });

  const box1  = useTransform(scrollYProgress, [0.02, 0.26], [0, 1]);
  const conn1 = useTransform(scrollYProgress, [0.18, 0.50], [0, 1]);
  const box2  = useTransform(scrollYProgress, [0.38, 0.62], [0, 1]);
  const conn2 = useTransform(scrollYProgress, [0.54, 0.76], [0, 1]);
  const box3  = useTransform(scrollYProgress, [0.68, 0.95], [0, 1]);

  return (
    <div ref={containerRef} id="pillars" className="relative hidden lg:block" style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-subtle)", opacity: 0.4 }} />

        <div className="w-full px-8 xl:px-16 max-w-[1600px] mx-auto pt-4">
          <SectionHeader visible={isInView} activePillar={activePillar} />

          {/* Cards + connectors */}
          <div className="flex items-stretch gap-0 mt-10" style={{ minHeight: "540px" }}>
            <PillarCard pillar={pillars[0]} progress={box1} />
            <FuseConnector
              progress={conn1}
              fromColor={pillars[0].letterColor}
              toColor={pillars[1].letterColor}
              pathD={MEANDER_A}
              id="a"
            />
            <PillarCard pillar={pillars[1]} progress={box2} />
            <FuseConnector
              progress={conn2}
              fromColor={pillars[1].letterColor}
              toColor={pillars[2].letterColor}
              pathD={MEANDER_B}
              id="b"
            />
            <PillarCard pillar={pillars[2]} progress={box3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center text-[9px] tracking-[0.4em] uppercase mt-6"
            style={{ color: "var(--text-faint)" }}
          >
            Scroll to reveal each phase
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: card stack ─────────────────────────────────────────── */
function PillarsMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:hidden" ref={ref}>
      <div className="max-w-2xl mx-auto px-5">
        <SectionHeader visible={isInView} activePillar={2} />

        <div className="flex flex-col gap-6 mt-8">
          {pillars.map((pillar, pi) => (
            <motion.div key={pillar.slug}>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.14 * pi, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${pillar.cardGradient})`,
                  boxShadow: `0 0 0 1px ${pillar.letterColor}20`,
                  minHeight: "380px",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`} />
                <div
                  className="absolute inset-[1px] rounded-3xl pointer-events-none"
                  style={{ border: `1px solid ${pillar.letterColor}15` }}
                />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon + subtitle */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10" style={{ color: pillar.letterColor }}>
                      {pillar.icon}
                    </div>
                    <span className="text-[9px] tracking-[0.5em] uppercase font-medium"
                      style={{ color: pillar.letterColor, opacity: 0.45 }}>{pillar.subtitle}</span>
                  </div>

                  {/* PEOPLE / STABILISE */}
                  <p className="text-[10px] tracking-[0.6em] uppercase font-semibold mb-1"
                    style={{ color: pillar.letterColor }}>{pillar.subtitle}</p>
                  <h3
                    className="leading-none mb-4"
                    style={{
                      fontFamily: '"Bebas Neue", serif',
                      fontSize: "clamp(3rem, 15vw, 5rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <div className="h-px mb-4" style={{ background: `linear-gradient(to right, ${pillar.letterColor}40, transparent)` }} />

                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-muted)" }}>
                    {pillar.desc}
                  </p>

                  <Link
                    href={`/${pillar.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide"
                    style={{
                      background: `${pillar.letterColor}14`,
                      border: `1px solid ${pillar.letterColor}35`,
                      color: pillar.letterColor,
                    }}
                  >
                    Explore {pillar.title}
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>

              {/* Mobile connector */}
              {pi < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.14 * pi + 0.5, duration: 0.5 }}
                  className="flex flex-col items-center py-4 gap-1"
                >
                  <div className="w-px h-8" style={{
                    background: `linear-gradient(to bottom, ${pillar.letterColor}50, ${pillars[pi + 1].letterColor}50)`,
                  }} />
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke={pillars[pi + 1].letterColor} strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ filter: `drop-shadow(0 0 4px ${pillars[pi + 1].letterColor})` }} />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Export ─────────────────────────────────────────────────────── */
export default function Pillars() {
  return (
    <>
      <PillarsDesktop />
      <PillarsMobile />
    </>
  );
}
