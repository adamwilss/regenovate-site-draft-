"use client";

import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useMotionValueEvent, type MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { pillars } from "@/lib/pillar-data";

/* ─── helpers ──────────────────────────────────────────────────────── */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── Horizontal node connector ────────────────────────────────────── */
// ViewBox: 0 0 140 80  — path travels left-centre → elevated channel → right-centre
const CW = 140;
const CH = 80;
// Smooth S-curve: exits right from (0,40), arcs up to y=22 rail, runs across, curves back to (140,40)
const CONN_PATH = `M 0 40 C 22 40 22 22 38 22 L ${CW - 38} 22 C ${CW - 22} 22 ${CW - 22} 40 ${CW} 40`;
const ARROW_PATH = `M ${CW - 16} 31 L ${CW - 1} 40 L ${CW - 16} 49`;

function NodeConnector({
  progress,
  fromColor,
  toColor,
  id,
}: {
  progress: MotionValue<number>;
  fromColor: string;
  toColor: string;
  id: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(40);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const beamProgress = useTransform(progress, [0.05, 0.88], [0, 1]);
  const travelT      = useTransform(progress, [0.05, 0.88], [0, 1]);
  const arrowOp      = useTransform(progress, [0.76, 1.0], [0, 1]);
  const burstOp      = useTransform(progress, [0.78, 0.95], [0, 1]);
  const burstR       = useTransform(progress, [0.78, 0.95], [3, 16]);

  useMotionValueEvent(travelT, "change", t => {
    if (!pathRef.current || pathLen === 0) return;
    const pt = pathRef.current.getPointAtLength(t * pathLen);
    dotX.set(pt.x);
    dotY.set(pt.y);
  });

  return (
    <div
      className="flex-shrink-0 self-center flex items-center justify-center"
      style={{ width: 108 }}
    >
      <svg
        width="100%"
        height={CH}
        viewBox={`0 0 ${CW} ${CH}`}
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <linearGradient id={`cg-${id}`} x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
          <filter id={`cf-${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ghost track */}
        <path
          d={CONN_PATH}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 8"
          fill="none"
        />

        {/* Animated beam — draws left to right */}
        <motion.path
          ref={pathRef}
          d={CONN_PATH}
          stroke={`url(#cg-${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter={`url(#cf-${id})`}
          style={{ pathLength: beamProgress }}
        />

        {/* Traveling spark dot */}
        <motion.circle
          cx={dotX}
          cy={dotY}
          r={4.5}
          fill={toColor}
          style={{
            opacity: beamProgress,
            filter: `drop-shadow(0 0 5px ${toColor}) drop-shadow(0 0 12px ${toColor})`,
          }}
        />

        {/* Arrival burst ring */}
        <motion.circle
          cx={CW}
          cy={40}
          r={burstR}
          fill="none"
          stroke={toColor}
          strokeWidth="1"
          style={{
            opacity: burstOp,
            filter: `drop-shadow(0 0 8px ${toColor})`,
          }}
        />

        {/* Directional arrowhead */}
        <motion.path
          d={ARROW_PATH}
          stroke={toColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            opacity: arrowOp,
            filter: `drop-shadow(0 0 4px ${toColor})`,
          }}
        />
      </svg>
    </div>
  );
}

/* ─── Node card ─────────────────────────────────────────────────────── */
function NodeCard({
  pillar,
  progress,
  step,
}: {
  pillar: typeof pillars[0];
  progress: MotionValue<number>;
  step: string;
}) {
  const rgb = hexToRgb(pillar.letterColor);

  // Activation-driven transforms — all defined at top level (no hook calls in JSX)
  const filterVal = useTransform(
    progress,
    p => `grayscale(${(1 - p) * 72}%) brightness(${0.32 + p * 0.68})`
  );
  const boxShadow = useTransform(progress, p => {
    const bHex = Math.round(p * 44).toString(16).padStart(2, "0");
    return `0 0 0 1px ${pillar.letterColor}${bHex}, 0 0 80px rgba(${rgb}, ${(p * 0.36).toFixed(2)}), inset 0 1px 0 rgba(${rgb}, ${(p * 0.07).toFixed(2)})`;
  });
  const cardScale = useTransform(progress, [0, 1], [0.963, 1]);
  const glowOp    = useTransform(progress, [0, 0.7], [0, 1]);
  const numOp     = useTransform(progress, [0, 1], [0.04, 0.13]);
  const headerOp  = useTransform(progress, [0.0, 0.28], [0, 1]);
  const headerY   = useTransform(progress, [0.0, 0.28], [18, 0]);
  const titleSc   = useTransform(progress, [0.05, 0.38], [0.88, 1]);
  const sepOp     = useTransform(progress, [0.24, 0.48], [0, 1]);
  const descOp    = useTransform(progress, [0.32, 0.60], [0, 1]);
  const ctaOp     = useTransform(progress, [0.52, 0.80], [0, 1]);
  const ctaY      = useTransform(progress, [0.52, 0.80], [14, 0]);

  return (
    <motion.div
      className="relative flex-1 rounded-3xl overflow-hidden flex flex-col"
      style={{
        filter: filterVal,
        boxShadow,
        scale: cardScale,
        background: `linear-gradient(160deg, ${pillar.cardGradient})`,
        minHeight: "520px",
      }}
    >
      {/* Colour wash */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
        style={{ opacity: glowOp }}
      />
      {/* Inner ring */}
      <div
        className="absolute inset-[1px] rounded-3xl pointer-events-none"
        style={{ border: `1px solid ${pillar.letterColor}15` }}
      />
      {/* Watermark step number */}
      <motion.div
        className="absolute top-5 right-7 leading-none select-none pointer-events-none"
        style={{
          fontFamily: '"Bebas Neue", serif',
          fontSize: "clamp(3.5rem, 5vw, 6rem)",
          color: pillar.letterColor,
          opacity: numOp,
          letterSpacing: "0.05em",
        }}
      >
        {step}
      </motion.div>

      <div className="relative p-10 xl:p-12 flex flex-col h-full">

        {/* Icon + step badge */}
        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="flex items-start justify-between mb-8"
        >
          <div
            className="w-11 h-11 p-2 rounded-xl flex items-center justify-center"
            style={{
              color: pillar.letterColor,
              background: `${pillar.letterColor}10`,
              border: `1px solid ${pillar.letterColor}22`,
            }}
          >
            {pillar.icon}
          </div>
          <span
            className="text-[8px] tracking-[0.55em] uppercase font-medium px-3 py-1 rounded-full"
            style={{
              color: pillar.letterColor,
              background: `${pillar.letterColor}10`,
              border: `1px solid ${pillar.letterColor}22`,
            }}
          >
            {step}
          </span>
        </motion.div>

        {/* Category label + hero title */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-5">
          <p
            className="text-[9px] tracking-[0.65em] uppercase font-semibold mb-2"
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
                fontSize: "clamp(3.5rem, 5.5vw, 7rem)",
                color: "var(--text-primary)",
                display: "block",
                letterSpacing: "0.02em",
              }}
            >
              {pillar.title}
            </span>
          </motion.h3>
        </motion.div>

        {/* Separator */}
        <motion.div
          style={{
            opacity: sepOp,
            background: `linear-gradient(to right, ${pillar.letterColor}55, transparent)`,
          }}
          className="h-px mb-6"
        />

        {/* Description */}
        <motion.p
          style={{ opacity: descOp, color: "var(--text-muted)" }}
          className="text-sm leading-relaxed flex-1"
        >
          {pillar.desc}
        </motion.p>

        {/* CTA */}
        <motion.div style={{ opacity: ctaOp, y: ctaY }} className="mt-8">
          <Link
            href={`/${pillar.slug}`}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-sm tracking-wide"
            style={{
              background: `${pillar.letterColor}12`,
              border: `1px solid ${pillar.letterColor}35`,
              color: pillar.letterColor,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = pillar.letterColor;
              el.style.color = "#0d1b3e";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = `${pillar.letterColor}12`;
              el.style.color = pillar.letterColor;
            }}
          >
            <span>Explore {pillar.title}</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Stage indicator header ───────────────────────────────────────── */
const STAGE_COLORS = pillars.map(p => p.letterColor);

function SectionHeader({
  visible,
  activeStage,
}: {
  visible: boolean;
  activeStage: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-8"
    >
      <p className="text-blue-400 text-[9px] font-medium tracking-[0.5em] uppercase mb-4">
        The Business Transformation Programme
      </p>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
      >
        Stabilise. Systemise. Scale.
      </h2>
      <p
        className="max-w-xl mx-auto text-sm leading-relaxed mb-8"
        style={{ color: "var(--text-muted)" }}
      >
        You cannot scale broken systems or an unstable team. The sequence is
        non-negotiable — people first, process second, performance follows.
      </p>

      {/* Stage progress indicator */}
      <div className="flex items-center justify-center">
        {pillars.map((p, i) => (
          <div key={p.slug} className="flex items-center">
            <motion.div
              animate={{
                color: activeStage >= i ? STAGE_COLORS[i] : "var(--text-faint)",
                scale: activeStage === i ? 1.07 : 1,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full cursor-default select-none"
              style={{
                border: `1px solid ${activeStage >= i ? STAGE_COLORS[i] + "35" : "var(--border-subtle)"}`,
                background: activeStage === i ? `${STAGE_COLORS[i]}0d` : "transparent",
                boxShadow: activeStage === i ? `0 0 18px ${STAGE_COLORS[i]}25` : "none",
                transition: "border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: activeStage >= i ? STAGE_COLORS[i] : "var(--text-faint)",
                  boxShadow: activeStage >= i ? `0 0 5px ${STAGE_COLORS[i]}` : "none",
                  transition: "background 0.4s ease, box-shadow 0.4s ease",
                }}
              />
              <span className="text-[8px] tracking-[0.45em] uppercase font-semibold">
                {p.subtitle}
              </span>
            </motion.div>

            {i < 2 && (
              <motion.div
                animate={{ opacity: activeStage > i ? 0.65 : 0.15 }}
                transition={{ duration: 0.4 }}
                className="px-2.5 text-sm"
                style={{ color: STAGE_COLORS[i] }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Desktop pinned scroll ─────────────────────────────────────────── */
function PillarsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-8%" });
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage thresholds: 0 → 1 at ~20%, 1 → 2 at ~52%
  useMotionValueEvent(scrollYProgress, "change", v => {
    if (v >= 0.64) setActiveStage(2);
    else if (v >= 0.34) setActiveStage(1);
    else setActiveStage(0);
  });

  // Node activation windows (staggered, overlapping with connectors)
  const box1  = useTransform(scrollYProgress, [0.00, 0.22], [0, 1]);
  const conn1 = useTransform(scrollYProgress, [0.18, 0.46], [0, 1]);
  const box2  = useTransform(scrollYProgress, [0.36, 0.58], [0, 1]);
  const conn2 = useTransform(scrollYProgress, [0.54, 0.76], [0, 1]);
  const box3  = useTransform(scrollYProgress, [0.68, 0.94], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="pillars"
      className="relative hidden lg:block"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "var(--border-subtle)", opacity: 0.3 }}
        />

        <div className="w-full px-8 xl:px-16 max-w-[1680px] mx-auto">
          <SectionHeader visible={isInView} activeStage={activeStage} />

          {/* Three nodes connected by animated beams */}
          <div className="flex items-center mt-6">
            <NodeCard pillar={pillars[0]} progress={box1} step="01" />
            <NodeConnector
              progress={conn1}
              fromColor={pillars[0].letterColor}
              toColor={pillars[1].letterColor}
              id="c1"
            />
            <NodeCard pillar={pillars[1]} progress={box2} step="02" />
            <NodeConnector
              progress={conn2}
              fromColor={pillars[1].letterColor}
              toColor={pillars[2].letterColor}
              id="c2"
            />
            <NodeCard pillar={pillars[2]} progress={box3} step="03" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center text-[8px] tracking-[0.45em] uppercase mt-5"
            style={{ color: "var(--text-faint)" }}
          >
            Scroll to reveal each phase
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile stacked ────────────────────────────────────────────────── */
function PillarsMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:hidden" ref={ref}>
      <div className="max-w-2xl mx-auto px-5">
        <SectionHeader visible={isInView} activeStage={2} />

        <div className="flex flex-col gap-4 mt-8">
          {pillars.map((pillar, pi) => (
            <motion.div key={pillar.slug}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.12 * pi, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${pillar.cardGradient})`,
                  boxShadow: `0 0 0 1px ${pillar.letterColor}25`,
                  minHeight: "360px",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
                  style={{ opacity: 0.75 }}
                />
                <div
                  className="absolute inset-[1px] rounded-3xl pointer-events-none"
                  style={{ border: `1px solid ${pillar.letterColor}12` }}
                />

                <div className="relative p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 p-1.5 rounded-xl flex items-center justify-center"
                      style={{
                        color: pillar.letterColor,
                        background: `${pillar.letterColor}10`,
                        border: `1px solid ${pillar.letterColor}20`,
                      }}
                    >
                      {pillar.icon}
                    </div>
                    <span
                      className="text-[8px] tracking-[0.55em] uppercase font-medium px-3 py-1 rounded-full"
                      style={{
                        color: pillar.letterColor,
                        background: `${pillar.letterColor}10`,
                        border: `1px solid ${pillar.letterColor}20`,
                      }}
                    >
                      {`0${pi + 1}`}
                    </span>
                  </div>

                  <p
                    className="text-[9px] tracking-[0.6em] uppercase font-semibold mb-1.5"
                    style={{ color: pillar.letterColor }}
                  >
                    {pillar.subtitle}
                  </p>
                  <h3
                    className="leading-none mb-4"
                    style={{
                      fontFamily: '"Bebas Neue", serif',
                      fontSize: "clamp(3rem, 14vw, 4.5rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <div
                    className="h-px mb-4"
                    style={{ background: `linear-gradient(to right, ${pillar.letterColor}45, transparent)` }}
                  />
                  <p
                    className="text-sm leading-relaxed flex-1 mb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {pillar.desc}
                  </p>

                  <Link
                    href={`/${pillar.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm tracking-wide"
                    style={{
                      background: `${pillar.letterColor}12`,
                      border: `1px solid ${pillar.letterColor}30`,
                      color: pillar.letterColor,
                    }}
                  >
                    Explore {pillar.title}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </motion.div>

              {/* Vertical connector between cards */}
              {pi < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.12 * pi + 0.45, duration: 0.5 }}
                  className="flex flex-col items-center py-3 gap-1.5"
                >
                  <div
                    className="w-px h-8"
                    style={{
                      background: `linear-gradient(to bottom, ${pillar.letterColor}60, ${pillars[pi + 1].letterColor}60)`,
                    }}
                  />
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M7 0v8M3 4l4 4 4-4"
                      stroke={pillars[pi + 1].letterColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: `drop-shadow(0 0 3px ${pillars[pi + 1].letterColor})` }}
                    />
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

/* ─── Export ─────────────────────────────────────────────────────────── */
export default function Pillars() {
  return (
    <>
      <PillarsDesktop />
      <PillarsMobile />
    </>
  );
}
