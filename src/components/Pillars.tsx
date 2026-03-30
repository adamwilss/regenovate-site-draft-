"use client";

import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef } from "react";

/* ─── Data ─────────────────────────────────────────────────────── */
const pillars = [
  {
    number: "01",
    title: "Stabilise",
    subtitle: "PEOPLE",
    acronym: "ALIGN",
    outcome: "Stable, aligned, trusted workforce",
    desc: "The most important resource in your business is your people. When they feel safe and valued, culture becomes your strongest competitive advantage.",
    gradient: "from-blue-400/20 via-blue-500/10 to-transparent",
    numberColor: "from-blue-300 to-blue-500",
    letterColor: "#60a5fa",
    outlineColor: "rgba(96,165,250,0.15)",
    items: [
      { letter: "A", word: "Assess",  desc: "team structure, strengths & gaps" },
      { letter: "L", word: "Lead",    desc: "mission, vision & values" },
      { letter: "I", word: "Inspire", desc: "trust, clarity & direction" },
      { letter: "G", word: "Grow",    desc: "training, recruitment & leadership" },
      { letter: "N", word: "Nurture", desc: "retention, loyalty & culture" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Systemise",
    subtitle: "PROCESS",
    acronym: "BUILD",
    outcome: "Efficient, consistent, scalable operations",
    desc: "Cloud power combined with traditional business wisdom — our 'secret sauce' puts growth on autopilot. Efficient businesses are more profitable and more fun to work in.",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    numberColor: "from-blue-400 to-blue-600",
    letterColor: "#4169e1",
    outlineColor: "rgba(65,105,225,0.15)",
    items: [
      { letter: "B", word: "Blueprint", desc: "core processes & what good looks like" },
      { letter: "U", word: "Unify",     desc: "workflows & remove silos" },
      { letter: "I", word: "Integrate", desc: "systems, ERP & data centralisation" },
      { letter: "L", word: "Leverage",  desc: "data insights & continuous optimisation" },
      { letter: "D", word: "Define",    desc: "KPIs, metrics & tracking" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "PERFORMANCE",
    acronym: "CHART",
    outcome: "Scalable, high-performance growth engine",
    desc: "We generate perfect customers who want your products, from you, now, and can afford them — by constantly monitoring what works using the latest technology.",
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    numberColor: "from-emerald-400 to-teal-500",
    letterColor: "#34d399",
    outlineColor: "rgba(52,211,153,0.15)",
    items: [
      { letter: "C", word: "Capture",     desc: "new markets & opportunities" },
      { letter: "H", word: "Harness",     desc: "existing resources & tools" },
      { letter: "A", word: "Accelerate",  desc: "revenue, pricing & partnerships" },
      { letter: "R", word: "Reach",       desc: "brand, visibility & marketing" },
      { letter: "T", word: "Transform",   desc: "continuous improvement & kaizen" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─── Item row within a card ─────────────────────────────────────── */
function AcronymItem({
  item,
  letterColor,
  progress,
  index,
}: {
  item: typeof pillars[0]["items"][0];
  letterColor: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.18 + index * 0.13;
  const end   = start + 0.22;
  const op  = useTransform(progress, [start, end], [0, 1]);
  const y   = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.div style={{ opacity: op, y }} className="flex items-baseline gap-3 py-1.5">
      {/* Letter badge */}
      <span
        className="text-2xl font-bold leading-none w-7 flex-shrink-0 tabular-nums"
        style={{
          fontFamily: '"Bebas Neue", serif',
          color: letterColor,
          textShadow: `0 0 20px ${letterColor}55`,
        }}
      >
        {item.letter}
      </span>
      {/* Word */}
      <span
        className="text-sm font-semibold w-24 flex-shrink-0"
        style={{ color: "var(--text-primary)" }}
      >
        {item.word}
      </span>
      {/* Divider + description */}
      <span className="text-xs leading-snug" style={{ color: "var(--text-faint)" }}>
        {item.desc}
      </span>
    </motion.div>
  );
}

/* ─── Pillar card ────────────────────────────────────────────────── */
function PillarCard({
  pillar,
  progress,
}: {
  pillar: typeof pillars[0];
  progress: MotionValue<number>;
}) {
  const filterVal    = useTransform(progress, (p) => `grayscale(${(1-p)*80}%) brightness(${0.35 + p * 0.65})`);
  const glowOp       = useTransform(progress, [0.15, 1],   [0, 1]);
  const lineScale    = useTransform(progress, [0.3, 0.7],  [0, 1]);
  const headerOp     = useTransform(progress, [0.0, 0.2],  [0, 1]);
  const headerY      = useTransform(progress, [0.0, 0.2],  [14, 0]);
  const descOp       = useTransform(progress, [0.08, 0.28],[0, 1]);
  const descY        = useTransform(progress, [0.08, 0.28],[12, 0]);
  const outcomeOp    = useTransform(progress, [0.85, 1.0], [0, 1]);
  const outcomeScale = useTransform(progress, [0.85, 1.0], [0.92, 1]);
  const acronymOp    = useTransform(progress, [0.0, 0.18], [0, 0.06]);

  return (
    <motion.div
      className="relative flex-1 p-7 rounded-2xl overflow-hidden"
      style={{
        filter: filterVal,
        border: "1px solid var(--border-subtle)",
        background: "rgba(15,23,42,0.4)",
      }}
    >
      {/* Colour wash */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
        style={{ opacity: glowOp }}
      />

      {/* Ghost acronym background */}
      <motion.div
        className="absolute -bottom-6 -right-4 leading-none select-none pointer-events-none"
        style={{
          fontFamily: '"Bebas Neue", serif',
          fontSize: "9rem",
          opacity: acronymOp,
          color: pillar.letterColor,
        }}
      >
        {pillar.acronym}
      </motion.div>

      <div className="relative">
        {/* Number + icon */}
        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="flex items-start justify-between mb-5"
        >
          <span
            className={`text-5xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Bebas Neue", serif' }}
          >
            {pillar.number}
          </span>
          <div style={{ color: pillar.letterColor, opacity: 0.6 }}>{pillar.icon}</div>
        </motion.div>

        {/* Title + subtitle */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-4">
          <h3
            className="text-xl font-semibold mb-0.5"
            style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
          >
            {pillar.title}
          </h3>
          <p className="text-[9px] tracking-[0.45em] uppercase font-medium"
            style={{ color: pillar.letterColor, opacity: 0.75 }}>
            {pillar.subtitle}
          </p>
        </motion.div>

        {/* Brief description */}
        <motion.p
          style={{ opacity: descOp, y: descY, color: "var(--text-muted)" }}
          className="text-xs leading-relaxed mb-5"
        >
          {pillar.desc}
        </motion.p>

        {/* Divider + acronym label */}
        <motion.div style={{ opacity: descOp }} className="flex items-center gap-3 mb-3">
          <motion.div
            className="h-px flex-1"
            style={{
              scaleX: lineScale,
              originX: 0,
              background: `linear-gradient(to right, ${pillar.letterColor}55, transparent)`,
            }}
          />
          <span
            className="text-[9px] tracking-[0.45em] uppercase font-medium flex-shrink-0"
            style={{ color: pillar.letterColor, opacity: 0.6 }}
          >
            {pillar.acronym}
          </span>
        </motion.div>

        {/* Acronym items */}
        <div className="space-y-0">
          {pillar.items.map((item, i) => (
            <AcronymItem
              key={item.letter + i}
              item={item}
              letterColor={pillar.letterColor}
              progress={progress}
              index={i}
            />
          ))}
        </div>

        {/* Outcome badge */}
        <motion.div
          style={{
            opacity: outcomeOp,
            scale: outcomeScale,
            background: pillar.outlineColor,
            border: `1px solid ${pillar.letterColor}30`,
            color: pillar.letterColor,
          }}
          className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide"
        >
          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: pillar.letterColor }} />
          {pillar.outcome}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── SVG wire connector ─────────────────────────────────────────── */
function Wire({ progress }: { progress: MotionValue<number> }) {
  const arrowOp = useTransform(progress, [0.7, 1], [0, 1]);
  return (
    <div className="flex items-center justify-center w-14 flex-shrink-0">
      <svg width="56" height="24" viewBox="0 0 56 24" style={{ overflow: "visible" }}>
        <line x1="4" y1="12" x2="52" y2="12" stroke="var(--border-subtle)" strokeWidth="1.5"/>
        <motion.path
          d="M 4 12 L 44 12"
          stroke="#4169e1"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M 40 8 L 50 12 L 40 16"
          stroke="#4169e1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity: arrowOp }}
        />
      </svg>
    </div>
  );
}

/* ─── Section header ────────────────────────────────────────────── */
function SectionHeader({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-12"
    >
      <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-4">
        The Business Transformation Programme
      </p>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        style={{
          fontFamily: '"DM Serif Display", "Playfair Display", serif',
          color: "var(--text-primary)",
        }}
      >
        Stabilise. Systemise. Scale.
      </h2>
      <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Every step in order. You cannot scale broken systems or an unstable team.
        People first, then process, then performance.
      </p>
    </motion.div>
  );
}

/* ─── Flow indicator ────────────────────────────────────────────── */
function FlowBar({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="flex items-center justify-center gap-3 mb-8"
    >
      {["PEOPLE", "→", "PROCESS", "→", "PERFORMANCE"].map((item, i) => (
        <span
          key={i}
          className={item === "→"
            ? "text-blue-400/30 text-sm"
            : "text-[9px] tracking-[0.4em] uppercase font-medium px-3 py-1 rounded-full"
          }
          style={item !== "→" ? {
            color: "var(--text-faint)",
            border: "1px solid var(--border-subtle)",
          } : {}}
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
}

/* ─── Desktop: scroll-jacked ────────────────────────────────────── */
function PillarsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const box1  = useTransform(scrollYProgress, [0.03, 0.25], [0, 1]);
  const wire1 = useTransform(scrollYProgress, [0.20, 0.44], [0, 1]);
  const box2  = useTransform(scrollYProgress, [0.38, 0.60], [0, 1]);
  const wire2 = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const box3  = useTransform(scrollYProgress, [0.68, 0.93], [0, 1]);

  return (
    <div ref={containerRef} id="pillars" className="relative hidden md:block" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-16 left-0 right-0 h-px" style={{ background: "var(--border-subtle)" }} />

        <div className="max-w-7xl mx-auto px-6 w-full pt-10">
          <SectionHeader visible={isInView} />
          <FlowBar visible={isInView} />

          <div className="flex items-stretch gap-0">
            <PillarCard pillar={pillars[0]} progress={box1} />
            <Wire progress={wire1} />
            <PillarCard pillar={pillars[1]} progress={box2} />
            <Wire progress={wire2} />
            <PillarCard pillar={pillars[2]} progress={box3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center text-[9px] tracking-[0.35em] uppercase mt-8"
            style={{ color: "var(--text-faint)" }}
          >
            Scroll to explore each phase
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: static card reveals ───────────────────────────────── */
function PillarsMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 md:hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeader visible={isInView} />
        <FlowBar visible={isInView} />

        <div className="grid gap-5">
          {pillars.map((pillar, pi) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 * pi, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border-subtle)", background: "rgba(15,23,42,0.4)" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`} />

              {/* Ghost acronym */}
              <div
                className="absolute -bottom-4 -right-2 leading-none select-none pointer-events-none opacity-[0.05]"
                style={{ fontFamily: '"Bebas Neue", serif', fontSize: "7rem", color: pillar.letterColor }}
              >
                {pillar.acronym}
              </div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-5xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
                    style={{ fontFamily: '"Bebas Neue", serif' }}
                  >
                    {pillar.number}
                  </span>
                  <div style={{ color: pillar.letterColor, opacity: 0.6 }}>{pillar.icon}</div>
                </div>

                <h3
                  className="text-xl font-semibold mb-0.5"
                  style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[9px] tracking-[0.4em] uppercase font-medium mb-3"
                  style={{ color: pillar.letterColor, opacity: 0.75 }}>
                  {pillar.subtitle}
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {pillar.desc}
                </p>

                {/* Divider + acronym label */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1"
                    style={{ background: `linear-gradient(to right, ${pillar.letterColor}55, transparent)` }} />
                  <span className="text-[9px] tracking-[0.45em] uppercase font-medium"
                    style={{ color: pillar.letterColor, opacity: 0.65 }}>{pillar.acronym}</span>
                </div>

                {/* Items */}
                <div className="space-y-1.5 mb-4">
                  {pillar.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.12 * pi + 0.08 * i + 0.3, duration: 0.45, ease: "easeOut" }}
                      className="flex items-baseline gap-3"
                    >
                      <span
                        className="text-xl font-bold w-6 flex-shrink-0"
                        style={{ fontFamily: '"Bebas Neue", serif', color: pillar.letterColor }}
                      >
                        {item.letter}
                      </span>
                      <span className="text-sm font-semibold w-24 flex-shrink-0" style={{ color: "var(--text-primary)" }}>
                        {item.word}
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-faint)" }}>{item.desc}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Outcome */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide"
                  style={{ background: pillar.outlineColor, border: `1px solid ${pillar.letterColor}30`, color: pillar.letterColor }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: pillar.letterColor }} />
                  {pillar.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Export ────────────────────────────────────────────────────── */
export default function Pillars() {
  return (
    <>
      <PillarsDesktop />
      <PillarsMobile />
    </>
  );
}
