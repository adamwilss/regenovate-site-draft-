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

/* ═══════════════════════════════════════════════════════════════════════
   HORIZONTAL NODE CONNECTOR — straight line
   ═══════════════════════════════════════════════════════════════════════ */
const CW = 220;
const CH = 100;
const CONN_PATH = "M 0 50 L 220 50";
// Particle burst — 8 directions at 45° intervals, alternating sizes
const RAD   = [0, 45, 90, 135, 180, 225, 270, 315].map(d => d * Math.PI / 180);
const SIZES = [7, 4.5, 8, 4.5, 7, 4.5, 8, 4.5];

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
  const dotY = useMotionValue(50);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // ── Core motion values ────────────────────────────────────────────
  const beamProgress  = useTransform(progress, [0.05, 0.88], [0, 1]);
  const travelT       = useTransform(progress, [0.05, 0.88], [0, 1]);
  // Orb fades OUT just as burst fires — disappears on impact
  const orbOp         = useTransform(progress, [0.05, 0.74, 0.84], [0, 1, 0]);

  // ── Burst on arrival — starts earlier, wider range = slower & bigger ────
  const burstProgress = useTransform(progress, [0.80, 1.0], [0, 1]);
  const flashOp       = useTransform(burstProgress, [0, 0.10, 0.30], [0, 1, 0]);
  const flashR        = useTransform(burstProgress, [0, 0.35], [0, 60]);
  const burstR        = useTransform(burstProgress, p => p * 140);
  const burstOp       = useTransform(burstProgress, p =>
    p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75
  );

  // ── 8 particle positions — explicit hooks (fixed count, never conditional) ──
  const bp0x = useTransform(burstR, r => CW + Math.cos(RAD[0]) * r);
  const bp0y = useTransform(burstR, r => 50 + Math.sin(RAD[0]) * r);
  const bp1x = useTransform(burstR, r => CW + Math.cos(RAD[1]) * r);
  const bp1y = useTransform(burstR, r => 50 + Math.sin(RAD[1]) * r);
  const bp2x = useTransform(burstR, r => CW + Math.cos(RAD[2]) * r);
  const bp2y = useTransform(burstR, r => 50 + Math.sin(RAD[2]) * r);
  const bp3x = useTransform(burstR, r => CW + Math.cos(RAD[3]) * r);
  const bp3y = useTransform(burstR, r => 50 + Math.sin(RAD[3]) * r);
  const bp4x = useTransform(burstR, r => CW + Math.cos(RAD[4]) * r);
  const bp4y = useTransform(burstR, r => 50 + Math.sin(RAD[4]) * r);
  const bp5x = useTransform(burstR, r => CW + Math.cos(RAD[5]) * r);
  const bp5y = useTransform(burstR, r => 50 + Math.sin(RAD[5]) * r);
  const bp6x = useTransform(burstR, r => CW + Math.cos(RAD[6]) * r);
  const bp6y = useTransform(burstR, r => 50 + Math.sin(RAD[6]) * r);
  const bp7x = useTransform(burstR, r => CW + Math.cos(RAD[7]) * r);
  const bp7y = useTransform(burstR, r => 50 + Math.sin(RAD[7]) * r);

  useMotionValueEvent(travelT, "change", t => {
    if (!pathRef.current || pathLen === 0) return;
    const pt = pathRef.current.getPointAtLength(t * pathLen);
    dotX.set(pt.x);
    dotY.set(pt.y);
  });

  const particles: [typeof bp0x, typeof bp0y][] = [
    [bp0x, bp0y], [bp1x, bp1y], [bp2x, bp2y], [bp3x, bp3y],
    [bp4x, bp4y], [bp5x, bp5y], [bp6x, bp6y], [bp7x, bp7y],
  ];

  return (
    <div
      className="flex-shrink-0 self-center flex items-center justify-center"
      style={{ width: 116 }}
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
          {/* Beam bloom */}
          <filter id={`cf-${id}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="inner" />
            <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="outer" />
            <feMerge>
              <feMergeNode in="outer" />
              <feMergeNode in="inner" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Resting thread — always visible, glows faintly */}
        <path
          d={CONN_PATH}
          stroke={fromColor}
          strokeWidth="1"
          fill="none"
          style={{ opacity: 0.12, filter: `drop-shadow(0 0 3px ${fromColor})` }}
        />

        {/* Beam — draws behind the orb as it travels */}
        <motion.path
          ref={pathRef}
          d={CONN_PATH}
          stroke={`url(#cg-${id})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter={`url(#cf-${id})`}
          style={{ pathLength: beamProgress }}
        />

        {/* Orb — outer glow ring — fades to zero on impact */}
        <motion.circle
          cx={dotX} cy={dotY} r={13}
          fill="none" stroke={toColor} strokeWidth="2.5"
          style={{
            opacity: orbOp,
            filter: `drop-shadow(0 0 10px ${toColor}) drop-shadow(0 0 24px ${toColor})`,
          }}
        />
        {/* Orb — white-hot core — fades to zero on impact */}
        <motion.circle
          cx={dotX} cy={dotY} r={6}
          fill="#ffffff"
          style={{
            opacity: orbOp,
            filter: `drop-shadow(0 0 8px ${toColor}) drop-shadow(0 0 18px ${toColor})`,
          }}
        />

        {/* Impact flash */}
        <motion.circle
          cx={CW} cy={50} r={flashR}
          fill={toColor}
          style={{ opacity: flashOp, filter: `drop-shadow(0 0 20px ${toColor}) drop-shadow(0 0 40px ${toColor})` }}
        />

        {/* 8 scatter particles */}
        {particles.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy}
            r={SIZES[i]}
            fill={i % 2 === 0 ? toColor : "#ffffff"}
            style={{
              opacity: burstOp,
              filter: `drop-shadow(0 0 ${i % 2 === 0 ? 12 : 6}px ${toColor})`,
            }}
          />
        ))}

      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PILL CONNECTOR — mini orb+beam+burst for the stage indicator pills
   ═══════════════════════════════════════════════════════════════════════ */
const PCW = 40;
const PCH = 16;
const PCONN_PATH = "M 0 8 L 40 8";
const PRAD   = [0, 45, 90, 135, 180, 225, 270, 315].map(d => d * Math.PI / 180);
const PSIZES = [3, 2, 3.5, 2, 3, 2, 3.5, 2];

function PillConnector({
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
  const dotY = useMotionValue(8);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const beamProgress  = useTransform(progress, [0.05, 0.88], [0, 1]);
  const travelT       = useTransform(progress, [0.05, 0.88], [0, 1]);
  const orbOp         = useTransform(progress, [0.05, 0.74, 0.84], [0, 1, 0]);
  const burstProgress = useTransform(progress, [0.80, 1.0], [0, 1]);
  const flashOp       = useTransform(burstProgress, [0, 0.10, 0.30], [0, 1, 0]);
  const flashR        = useTransform(burstProgress, [0, 0.35], [0, 14]);
  const burstR        = useTransform(burstProgress, p => p * 28);
  const burstOp       = useTransform(burstProgress, p =>
    p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75
  );

  const bp0x = useTransform(burstR, r => PCW + Math.cos(PRAD[0]) * r);
  const bp0y = useTransform(burstR, r => 8 + Math.sin(PRAD[0]) * r);
  const bp1x = useTransform(burstR, r => PCW + Math.cos(PRAD[1]) * r);
  const bp1y = useTransform(burstR, r => 8 + Math.sin(PRAD[1]) * r);
  const bp2x = useTransform(burstR, r => PCW + Math.cos(PRAD[2]) * r);
  const bp2y = useTransform(burstR, r => 8 + Math.sin(PRAD[2]) * r);
  const bp3x = useTransform(burstR, r => PCW + Math.cos(PRAD[3]) * r);
  const bp3y = useTransform(burstR, r => 8 + Math.sin(PRAD[3]) * r);
  const bp4x = useTransform(burstR, r => PCW + Math.cos(PRAD[4]) * r);
  const bp4y = useTransform(burstR, r => 8 + Math.sin(PRAD[4]) * r);
  const bp5x = useTransform(burstR, r => PCW + Math.cos(PRAD[5]) * r);
  const bp5y = useTransform(burstR, r => 8 + Math.sin(PRAD[5]) * r);
  const bp6x = useTransform(burstR, r => PCW + Math.cos(PRAD[6]) * r);
  const bp6y = useTransform(burstR, r => 8 + Math.sin(PRAD[6]) * r);
  const bp7x = useTransform(burstR, r => PCW + Math.cos(PRAD[7]) * r);
  const bp7y = useTransform(burstR, r => 8 + Math.sin(PRAD[7]) * r);

  useMotionValueEvent(travelT, "change", t => {
    if (!pathRef.current || pathLen === 0) return;
    const pt = pathRef.current.getPointAtLength(t * pathLen);
    dotX.set(pt.x);
    dotY.set(pt.y);
  });

  const particles: [typeof bp0x, typeof bp0y][] = [
    [bp0x, bp0y], [bp1x, bp1y], [bp2x, bp2y], [bp3x, bp3y],
    [bp4x, bp4y], [bp5x, bp5y], [bp6x, bp6y], [bp7x, bp7y],
  ];

  return (
    <svg
      width={PCW}
      height={PCH}
      viewBox={`0 0 ${PCW} ${PCH}`}
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <linearGradient id={`pcg-${id}`} x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={fromColor} stopOpacity="0.85" />
          <stop offset="100%" stopColor={toColor} stopOpacity="1" />
        </linearGradient>
        <filter id={`pcf-${id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="inner" />
          <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="outer" />
          <feMerge>
            <feMergeNode in="outer" />
            <feMergeNode in="inner" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Resting thread */}
      <path
        d={PCONN_PATH}
        stroke={fromColor}
        strokeWidth="1"
        fill="none"
        style={{ opacity: 0.12, filter: `drop-shadow(0 0 2px ${fromColor})` }}
      />

      {/* Beam */}
      <motion.path
        ref={pathRef}
        d={PCONN_PATH}
        stroke={`url(#pcg-${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        filter={`url(#pcf-${id})`}
        style={{ pathLength: beamProgress }}
      />

      {/* Orb — outer glow ring */}
      <motion.circle
        cx={dotX} cy={dotY} r={5}
        fill="none" stroke={toColor} strokeWidth="1.5"
        style={{
          opacity: orbOp,
          filter: `drop-shadow(0 0 4px ${toColor}) drop-shadow(0 0 8px ${toColor})`,
        }}
      />
      {/* Orb — core */}
      <motion.circle
        cx={dotX} cy={dotY} r={2.5}
        fill="#ffffff"
        style={{
          opacity: orbOp,
          filter: `drop-shadow(0 0 4px ${toColor}) drop-shadow(0 0 8px ${toColor})`,
        }}
      />

      {/* Impact flash */}
      <motion.circle
        cx={PCW} cy={8} r={flashR}
        fill={toColor}
        style={{ opacity: flashOp, filter: `drop-shadow(0 0 8px ${toColor}) drop-shadow(0 0 16px ${toColor})` }}
      />

      {/* 8 scatter particles */}
      {particles.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy}
          r={PSIZES[i]}
          fill={i % 2 === 0 ? toColor : "#ffffff"}
          style={{
            opacity: burstOp,
            filter: `drop-shadow(0 0 ${i % 2 === 0 ? 5 : 3}px ${toColor})`,
          }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NODE CARD — strong ghost→active contrast
   ═══════════════════════════════════════════════════════════════════════ */
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

  // All hooks at top level
  const filterVal = useTransform(
    progress,
    p => `grayscale(${(1 - p) * 85}%) brightness(${0.22 + p * 0.78}) blur(${((1 - p) * 0.8).toFixed(1)}px)`
  );
  const boxShadow = useTransform(progress, p => {
    const b1 = Math.round(p * 80).toString(16).padStart(2, "0");
    const b2 = Math.round(p * 22).toString(16).padStart(2, "0");
    return [
      `0 0 0 1px ${pillar.letterColor}${b1}`,
      `0 0 0 4px ${pillar.letterColor}${b2}`,
      `0 0 60px rgba(${rgb}, ${(p * 0.4).toFixed(2)})`,
      `0 0 120px rgba(${rgb}, ${(p * 0.15).toFixed(2)})`,
      `inset 0 1px 0 rgba(${rgb}, ${(p * 0.15).toFixed(2)})`,
    ].join(", ");
  });
  const cardScale    = useTransform(progress, [0, 1], [0.955, 1]);
  const glowOp       = useTransform(progress, [0, 0.7], [0, 1]);
  const numOp        = useTransform(progress, [0, 1], [0.04, 0.13]);
  const headerOp     = useTransform(progress, [0.0, 0.28], [0, 1]);
  const headerY      = useTransform(progress, [0.0, 0.28], [18, 0]);
  const titleSc      = useTransform(progress, [0.05, 0.38], [0.88, 1]);
  const sepOp        = useTransform(progress, [0.24, 0.48], [0, 1]);
  const descOp       = useTransform(progress, [0.32, 0.60], [0, 1]);
  const ctaOp        = useTransform(progress, [0.52, 0.80], [0, 1]);
  const ctaY         = useTransform(progress, [0.52, 0.80], [14, 0]);
  const pulseOp      = useTransform(progress, [0.85, 1.0], [0, 0.2]);
  const iconGlow     = useTransform(
    progress,
    p => `0 0 ${Math.round(p * 18)}px rgba(${rgb}, ${(p * 0.3).toFixed(2)})`
  );
  const titleShadow  = useTransform(
    progress,
    p => p > 0.5 ? `0 0 ${Math.round(p * 30)}px rgba(${rgb}, ${(p * 0.15).toFixed(2)})` : "none"
  );

  return (
    <motion.div
      className="relative flex-1 min-w-0 rounded-3xl overflow-hidden flex flex-col"
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
      {/* Active border pulse */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
        style={{
          border: `1px solid ${pillar.letterColor}`,
          opacity: pulseOp,
        }}
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
          <motion.div
            className="w-11 h-11 p-2 rounded-xl flex items-center justify-center"
            style={{
              color: pillar.letterColor,
              background: `${pillar.letterColor}10`,
              border: `1px solid ${pillar.letterColor}22`,
              boxShadow: iconGlow,
            }}
          >
            {pillar.icon}
          </motion.div>
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
            <motion.span
              style={{
                fontFamily: '"Bebas Neue", serif',
                fontSize: "clamp(3.5rem, 3.6vw, 6rem)",
                color: "var(--text-primary)",
                display: "block",
                letterSpacing: "0.02em",
                textShadow: titleShadow,
              }}
            >
              {pillar.title}
            </motion.span>
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

/* ═══════════════════════════════════════════════════════════════════════
   STAGE INDICATOR HEADER — pills connected by progress line
   ═══════════════════════════════════════════════════════════════════════ */
const STAGE_COLORS = pillars.map(p => p.letterColor);

function SectionHeader({
  visible,
  activeStage,
  pillConn1,
  pillConn2,
}: {
  visible: boolean;
  activeStage: number;
  pillConn1?: MotionValue<number>;
  pillConn2?: MotionValue<number>;
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
        non-negotiable. People first, process second, performance follows.
      </p>

      {/* Stage progress indicator — gap connectors only, no line through pills */}
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
                background: activeStage === i ? `${STAGE_COLORS[i]}0d` : "var(--bg-base)",
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

            {/* Connector line lives only in the gap between pills */}
            {i < 2 && (
              <div className="w-10 flex items-center justify-center" style={{ overflow: "visible" }}>
                {i === 0 && pillConn1 ? (
                  <PillConnector progress={pillConn1} fromColor={STAGE_COLORS[0]} toColor={STAGE_COLORS[1]} id="pc1" />
                ) : i === 1 && pillConn2 ? (
                  <PillConnector progress={pillConn2} fromColor={STAGE_COLORS[1]} toColor={STAGE_COLORS[2]} id="pc2" />
                ) : (
                  <motion.div
                    className="h-px w-full"
                    animate={{
                      opacity: activeStage > i ? 0.7 : 0.15,
                      background: activeStage > i
                        ? `linear-gradient(to right, ${STAGE_COLORS[i]}, ${STAGE_COLORS[i + 1]})`
                        : "var(--border-subtle)",
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DESKTOP — pinned scroll, 360vh
   ═══════════════════════════════════════════════════════════════════════ */
function PillarsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-8%" });
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", v => {
    if (v >= 0.60) setActiveStage(2);
    else if (v >= 0.30) setActiveStage(1);
    else setActiveStage(0);
  });

  // Node activation windows — cards appear before explosion, which then celebrates their arrival
  const box1  = useTransform(scrollYProgress, [0.00, 0.20], [0, 1]);
  const conn1 = useTransform(scrollYProgress, [0.14, 0.54], [0, 1]); // wider range = slower travel
  const box2  = useTransform(scrollYProgress, [0.30, 0.52], [0, 1]); // card mostly there before explosion
  const conn2 = useTransform(scrollYProgress, [0.48, 0.82], [0, 1]); // wider range = slower travel
  const box3  = useTransform(scrollYProgress, [0.60, 0.88], [0, 1]); // card mostly there before explosion

  return (
    <div
      ref={containerRef}
      id="pillars"
      className="relative hidden lg:block"
      style={{ height: "360vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[400px] rounded-full bg-blue-600/5 blur-3xl" />
        </div>
        {/* Section border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "var(--border-subtle)", opacity: 0.3 }}
        />

        <div className="w-full px-8 xl:px-16 max-w-[1680px] mx-auto">
          <SectionHeader visible={isInView} activeStage={activeStage} pillConn1={conn1} pillConn2={conn2} />

          {/* Three nodes connected by straight beams */}
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

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE — stacked cards with straight vertical connectors
   ═══════════════════════════════════════════════════════════════════════ */
const MOBILE_MEANDER = "M 20 0 L 20 72";

function PillarsMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 lg:hidden overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5">
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

              {/* Straight vertical connector */}
              {pi < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.12 * pi + 0.45, duration: 0.5 }}
                  className="flex flex-col items-center py-2"
                >
                  <svg width="40" height="72" viewBox="0 0 40 72" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id={`mc-${pi}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={pillar.letterColor} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={pillars[pi + 1].letterColor} stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {/* Ghost track */}
                    <path
                      d={MOBILE_MEANDER}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="3 7"
                      fill="none"
                    />
                    {/* Coloured meander */}
                    <path
                      d={MOBILE_MEANDER}
                      stroke={`url(#mc-${pi})`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
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
