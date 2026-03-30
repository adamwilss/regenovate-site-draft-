"use client";

import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { pillars } from "@/lib/pillar-data";

/* ─── Acronym item row ───────────────────────────────────────────── */
function AcronymRow({
  item, letterColor, progress, index,
}: {
  item: typeof pillars[0]["items"][0];
  letterColor: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.16 + index * 0.12;
  const end   = start + 0.18;
  const op = useTransform(progress, [start, end], [0, 1]);
  const x  = useTransform(progress, [start, end], [-18, 0]);

  return (
    <motion.div style={{ opacity: op, x }} className="flex items-start gap-4 py-2">
      <span
        className="text-3xl font-bold leading-none w-8 flex-shrink-0 pt-0.5"
        style={{ fontFamily: '"Bebas Neue", serif', color: letterColor, textShadow: `0 0 24px ${letterColor}66` }}
      >
        {item.letter}
      </span>
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
          {item.word}
        </span>
        <span className="block text-xs leading-relaxed" style={{ color: "var(--text-faint)" }}>
          {item.desc}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Pillar card ────────────────────────────────────────────────── */
function PillarCard({
  pillar, progress,
}: {
  pillar: typeof pillars[0];
  progress: MotionValue<number>;
}) {
  const filterVal  = useTransform(progress, p => `grayscale(${(1-p)*80}%) brightness(${0.3 + p * 0.7})`);
  const glowOp     = useTransform(progress, [0.0, 0.3], [0, 1]);
  const headerOp   = useTransform(progress, [0.0, 0.18], [0, 1]);
  const headerY    = useTransform(progress, [0.0, 0.18], [20, 0]);
  const dividerW   = useTransform(progress, [0.1, 0.4],  [0, 1]);
  const outcomeOp  = useTransform(progress, [0.82, 1.0], [0, 1]);
  const outcomeSc  = useTransform(progress, [0.82, 1.0], [0.9, 1]);
  const acronymGhostOp = useTransform(progress, [0.0, 0.3], [0, 0.055]);
  const borderGlow = useTransform(progress, p =>
    `0 0 0 1px ${pillar.letterColor}${Math.round(p * 40).toString(16).padStart(2,"0")}, 0 0 60px ${pillar.glowColor}${Math.round(p * 60).toString(16).padStart(2,"0")}`
  );

  return (
    <motion.div
      className="relative flex-1 rounded-3xl overflow-hidden"
      style={{
        filter: filterVal,
        boxShadow: borderGlow,
        background: `linear-gradient(160deg, ${pillar.cardGradient})`,
        minHeight: "560px",
      }}
    >
      {/* Colour wash */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
        style={{ opacity: glowOp }}
      />
      {/* Inner border */}
      <div className="absolute inset-[1px] rounded-3xl pointer-events-none"
        style={{ border: `1px solid ${pillar.letterColor}18` }} />

      {/* Ghost acronym */}
      <motion.div
        className="absolute -bottom-8 -right-6 leading-none select-none pointer-events-none"
        style={{
          fontFamily: '"Bebas Neue", serif',
          fontSize: "11rem",
          opacity: acronymGhostOp,
          color: pillar.letterColor,
          letterSpacing: "0.06em",
        }}
      >
        {pillar.acronym}
      </motion.div>

      <div className="relative p-10 flex flex-col h-full">
        {/* Number + icon */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="flex items-start justify-between mb-6">
          <span
            className={`text-7xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Bebas Neue", serif' }}
          >
            {pillar.number}
          </span>
          <div className="w-8 h-8 mt-1" style={{ color: pillar.letterColor, opacity: 0.65 }}>
            {pillar.icon}
          </div>
        </motion.div>

        {/* Title block */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-6">
          <p className="text-[9px] tracking-[0.5em] uppercase font-medium mb-1.5"
            style={{ color: pillar.letterColor, opacity: 0.7 }}>{pillar.subtitle}</p>
          <h3 className="text-3xl font-bold mb-1"
            style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}>
            {pillar.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{pillar.tagline}</p>
        </motion.div>

        {/* Divider with acronym label */}
        <motion.div style={{ opacity: headerOp }} className="flex items-center gap-3 mb-4">
          <motion.div className="h-px flex-1"
            style={{ scaleX: dividerW, originX: 0, background: `linear-gradient(to right, ${pillar.letterColor}50, transparent)` }} />
          <span className="text-[8px] tracking-[0.5em] uppercase font-semibold flex-shrink-0"
            style={{ color: pillar.letterColor, opacity: 0.55 }}>
            The {pillar.acronym} Framework
          </span>
        </motion.div>

        {/* Acronym items */}
        <div className="flex-1 space-y-0.5">
          {pillar.items.map((item, i) => (
            <AcronymRow key={i} item={item} letterColor={pillar.letterColor} progress={progress} index={i} />
          ))}
        </div>

        {/* Outcome + CTA */}
        <motion.div style={{ opacity: outcomeOp, scale: outcomeSc }} className="mt-8 space-y-3">
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium"
            style={{
              background: pillar.outlineColor,
              border: `1px solid ${pillar.letterColor}25`,
              color: pillar.letterColor,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
              style={{ background: pillar.letterColor }} />
            {pillar.outcome}
          </div>
          <Link
            href={`/${pillar.slug}`}
            className="flex items-center gap-2 text-xs font-medium tracking-wide transition-all group"
            style={{ color: pillar.letterColor, opacity: 0.75 }}
          >
            <span className="group-hover:opacity-100" style={{ opacity: 0.75 }}>Explore {pillar.title}</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Elaborate connector ────────────────────────────────────────── */
function PillarConnector({
  progress,
  fromColor,
  toColor,
  label,
}: {
  progress: MotionValue<number>;
  fromColor: string;
  toColor: string;
  label: string;
}) {
  // 3 nodes along the path
  const node1Op = useTransform(progress, [0.2, 0.4], [0, 1]);
  const node2Op = useTransform(progress, [0.45, 0.6], [0, 1]);
  const node3Op = useTransform(progress, [0.65, 0.8], [0, 1]);
  const beamProgress = useTransform(progress, [0.15, 0.85], [0, 1]);
  const labelOp = useTransform(progress, [0.3, 0.6], [0, 1]);
  const arrowOp = useTransform(progress, [0.75, 1.0], [0, 1]);
  const arrowX  = useTransform(progress, [0.75, 1.0], [-6, 0]);

  return (
    <div className="flex flex-col items-center justify-center w-28 flex-shrink-0 gap-3 self-stretch">
      {/* Label */}
      <motion.span
        style={{ opacity: labelOp, color: "var(--text-faint)" }}
        className="text-[8px] tracking-[0.4em] uppercase font-medium"
      >
        then
      </motion.span>

      {/* SVG connector */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 112 320"
          preserveAspectRatio="none"
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`beam-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fromColor} stopOpacity="0.25"/>
              <stop offset="50%" stopColor={toColor} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={toColor} stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          {/* Track */}
          <path
            d="M 56 0 C 56 80, 56 240, 56 320"
            stroke="var(--border-subtle)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 6"
          />
          {/* Animated beam */}
          <motion.path
            d="M 56 0 C 56 80, 56 240, 56 320"
            stroke={`url(#beam-${label})`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: beamProgress }}
          />
          {/* Flowing glow */}
          <motion.circle
            cx="56"
            cy="0"
            r="5"
            fill={fromColor}
            style={{
              opacity: beamProgress,
              filter: `drop-shadow(0 0 8px ${fromColor})`,
            }}
          />
        </svg>

        {/* Node dots at fixed positions */}
        <div className="absolute inset-0 flex flex-col items-center justify-around pointer-events-none">
          {[node1Op, node2Op, node3Op].map((op, i) => (
            <motion.div
              key={i}
              style={{ opacity: op, borderColor: i < 1 ? fromColor : toColor, background: "var(--bg-base)" }}
              className="w-2.5 h-2.5 rounded-full border flex items-center justify-center"
            >
              <div className="w-1 h-1 rounded-full" style={{ background: i < 1 ? fromColor : toColor }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow tip */}
      <motion.div style={{ opacity: arrowOp, x: arrowX }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <motion.path
            d="M 4 10 L 16 10 M 11 5 L 16 10 L 11 15"
            stroke={toColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: `drop-shadow(0 0 6px ${toColor})`,
            }}
          />
        </svg>
      </motion.div>

      {/* Bottom label */}
      <motion.span
        style={{ opacity: labelOp }}
        className="text-[8px] tracking-[0.3em] uppercase text-center leading-snug"
      >
        <span style={{ color: "var(--text-faint)" }}>{label}</span>
      </motion.span>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function SectionHeader({ visible }: { visible: boolean }) {
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
      {/* Flow pill row */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {["PEOPLE", "→", "PROCESS", "→", "PERFORMANCE"].map((item, i) => (
          <span
            key={i}
            className={item === "→"
              ? "text-blue-400/25 text-base"
              : "text-[9px] tracking-[0.4em] uppercase font-semibold px-4 py-1.5 rounded-full"
            }
            style={item !== "→" ? {
              color: "var(--text-muted)",
              border: "1px solid var(--border-subtle)",
              background: "rgba(255,255,255,0.02)",
            } : {}}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Desktop: scroll-jacked ─────────────────────────────────────── */
function PillarsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const box1  = useTransform(scrollYProgress, [0.02, 0.26], [0, 1]);
  const conn1 = useTransform(scrollYProgress, [0.18, 0.46], [0, 1]);
  const box2  = useTransform(scrollYProgress, [0.38, 0.62], [0, 1]);
  const conn2 = useTransform(scrollYProgress, [0.54, 0.76], [0, 1]);
  const box3  = useTransform(scrollYProgress, [0.68, 0.95], [0, 1]);

  return (
    <div ref={containerRef} id="pillars" className="relative hidden lg:block" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-subtle)", opacity: 0.4 }} />

        <div className="w-full px-8 xl:px-16 max-w-[1600px] mx-auto pt-6">
          <SectionHeader visible={isInView} />

          {/* Cards + connectors */}
          <div className="flex items-stretch gap-0 mt-8" style={{ minHeight: "560px" }}>
            <PillarCard pillar={pillars[0]} progress={box1} />
            <PillarConnector
              progress={conn1}
              fromColor={pillars[0].letterColor}
              toColor={pillars[1].letterColor}
              label="People → Process"
            />
            <PillarCard pillar={pillars[1]} progress={box2} />
            <PillarConnector
              progress={conn2}
              fromColor={pillars[1].letterColor}
              toColor={pillars[2].letterColor}
              label="Process → Performance"
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
        <SectionHeader visible={isInView} />

        <div className="flex flex-col gap-6 mt-8">
          {pillars.map((pillar, pi) => (
            <motion.div key={pillar.number}>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.14 * pi, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${pillar.cardGradient})`,
                  boxShadow: `0 0 0 1px ${pillar.letterColor}20`,
                  minHeight: "420px",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`} />
                <div className="absolute inset-[1px] rounded-3xl pointer-events-none"
                  style={{ border: `1px solid ${pillar.letterColor}15` }} />
                <div className="absolute -bottom-6 -right-4 leading-none select-none pointer-events-none"
                  style={{ fontFamily: '"Bebas Neue", serif', fontSize: "8rem", opacity: 0.05, color: pillar.letterColor }}>
                  {pillar.acronym}
                </div>

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-6xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
                      style={{ fontFamily: '"Bebas Neue", serif' }}>{pillar.number}</span>
                    <div className="w-7 h-7 mt-1" style={{ color: pillar.letterColor, opacity: 0.65 }}>{pillar.icon}</div>
                  </div>
                  <p className="text-[9px] tracking-[0.5em] uppercase font-medium mb-1"
                    style={{ color: pillar.letterColor, opacity: 0.7 }}>{pillar.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-1"
                    style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}>{pillar.title}</h3>
                  <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>{pillar.tagline}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${pillar.letterColor}50, transparent)` }} />
                    <span className="text-[8px] tracking-[0.5em] uppercase font-semibold"
                      style={{ color: pillar.letterColor, opacity: 0.6 }}>The {pillar.acronym} Framework</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pillar.items.map((item, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.14 * pi + 0.07 * i + 0.3, duration: 0.4, ease: "easeOut" }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-2xl font-bold w-7 flex-shrink-0 leading-none pt-0.5"
                          style={{ fontFamily: '"Bebas Neue", serif', color: pillar.letterColor }}>{item.letter}</span>
                        <div>
                          <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.word}</span>
                          <span className="block text-xs leading-snug" style={{ color: "var(--text-faint)" }}>{item.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium mb-3 inline-flex"
                    style={{ background: pillar.outlineColor, border: `1px solid ${pillar.letterColor}25`, color: pillar.letterColor }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pillar.letterColor }} />
                    {pillar.outcome}
                  </div>
                  <div>
                    <Link href={`/${pillar.slug}`}
                      className="flex items-center gap-2 text-xs font-medium mt-2 group"
                      style={{ color: pillar.letterColor }}>
                      Explore in depth
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Mobile connector arrow between cards */}
              {pi < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.14 * pi + 0.5, duration: 0.5 }}
                  className="flex flex-col items-center py-4 gap-1"
                >
                  <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${pillar.letterColor}40, ${pillars[pi+1].letterColor}40)` }} />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke={pillars[pi+1].letterColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ filter: `drop-shadow(0 0 4px ${pillars[pi+1].letterColor})` }} />
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
