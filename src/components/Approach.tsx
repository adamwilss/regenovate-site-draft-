"use client";

import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Analyse",
    color: "#60a5fa",
    gradFrom: "from-blue-300",
    gradTo: "to-blue-500",
    glow: "rgba(96,165,250,0.3)",
    desc: "We thoroughly evaluate your marketplace and your position within it. We review your products, how they meet market demands, and seek new opportunities — ideally ones that create passive revenue streams.",
    tags: ["Market Positioning", "Gap Analysis", "Opportunity Mapping"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Plan",
    color: "#4169e1",
    gradFrom: "from-blue-400",
    gradTo: "to-blue-600",
    glow: "rgba(65,105,225,0.3)",
    desc: "We plan the transition from 'As Is' to 'To Be', plotting key milestones and waymarkers. Having completed this process over 100 times, we know exactly where the pitfalls are — and how to avoid them.",
    tags: ["Milestone Mapping", "Risk Assessment", "Transformation Roadmap"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Execute",
    color: "#34d399",
    gradFrom: "from-emerald-400",
    gradTo: "to-teal-400",
    glow: "rgba(52,211,153,0.3)",
    desc: "Our strategy revolves around three core principles: Policy (what we want to achieve), Process (how we achieve it), and Systems (capturing data for intelligence). This Best in Class approach has been honed over 20 years.",
    tags: ["Policy · Process · Systems", "Cloud Deployment", "Team Enablement"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Grow",
    color: "#2dd4bf",
    gradFrom: "from-teal-400",
    gradTo: "to-blue-500",
    glow: "rgba(45,212,191,0.3)",
    desc: "Now we know 'what works' we invest wisely, get the phone ringing, close deals and drive growth. Once stable growth is achieved with solid operations, we look to accelerate through horizontal or vertical acquisitions.",
    tags: ["Revenue Acceleration", "Acquisition Strategy", "Market Dominance"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─── Straight line SVG path connector ──────────────────────────── */
function MeanderConnector({
  progress,
  fromColor,
  toColor,
}: {
  progress: MotionValue<number>;
  fromColor: string;
  toColor: string;
}) {
  const beam   = useTransform(progress, [0.1, 0.85], [0, 1]);
  const dotOp  = useTransform(progress, [0.5, 0.8], [0, 1]);
  const arrowOp = useTransform(progress, [0.75, 1.0], [0, 1]);
  const id = `meander-${fromColor.replace("#","")}-${toColor.replace("#","")}`;

  // Straight vertical line centered at x=50
  const path = "M 50 0 L 50 300";

  return (
    <div className="flex items-center justify-center w-24 flex-shrink-0 self-stretch relative">
      <svg
        width="100"
        height="100%"
        viewBox="0 0 100 300"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={fromColor} stopOpacity="0.3"/>
            <stop offset="50%"  stopColor={toColor}   stopOpacity="0.7"/>
            <stop offset="100%" stopColor={toColor}   stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        {/* Static dotted track */}
        <path d={path} stroke="var(--border-subtle)" strokeWidth="1" fill="none" strokeDasharray="3 7"/>
        {/* Animated flowing beam */}
        <motion.path
          d={path}
          stroke={`url(#${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: beam }}
        />
        {/* Pulsing node at midpoint */}
        <motion.circle
          cx={50}
          cy={150}
          r={4}
          fill="none"
          stroke={toColor}
          strokeWidth="1.5"
          style={{ opacity: dotOp, filter: `drop-shadow(0 0 6px ${toColor})` }}
        />
        <motion.circle
          cx={50}
          cy={150}
          r={1.5}
          fill={toColor}
          style={{ opacity: dotOp }}
        />
      </svg>

      {/* Arrow at end */}
      <motion.div
        style={{ opacity: arrowOp }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v12M3 9l5 5 5-5"
            stroke={toColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 5px ${toColor})` }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Step card ─────────────────────────────────────────────────── */
function StepCard({
  step, progress,
}: {
  step: typeof steps[0];
  progress: MotionValue<number>;
}) {
  const filterVal = useTransform(progress, p => `grayscale(${(1-p)*75}%) brightness(${0.3 + p * 0.7})`);
  const glowShadow = useTransform(progress, p =>
    `0 0 0 1px ${step.color}${Math.round(p*38).toString(16).padStart(2,"0")}, 0 20px 80px ${step.glow.replace("0.3", String(p * 0.25))}`
  );
  const headerOp  = useTransform(progress, [0, 0.2], [0, 1]);
  const headerY   = useTransform(progress, [0, 0.2], [22, 0]);
  const contentOp = useTransform(progress, [0.12, 0.38], [0, 1]);
  const contentY  = useTransform(progress, [0.12, 0.38], [14, 0]);
  const tagOp     = useTransform(progress, [0.55, 0.85], [0, 1]);
  const tagScale  = useTransform(progress, [0.55, 0.85], [0.93, 1]);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden flex-1"
      style={{
        filter: filterVal,
        boxShadow: glowShadow,
        background: "var(--surface-glass)",
        border: "1px solid var(--border-subtle)",
        minHeight: "440px",
      }}
    >
      {/* Colour wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(progress, [0, 1], [0, 1]),
          background: `radial-gradient(ellipse at 30% 30%, ${step.glow}, transparent 65%)`,
        }}
      />
      {/* Ghost number */}
      <motion.div
        className="absolute -bottom-6 -right-3 leading-none select-none pointer-events-none"
        style={{
          fontFamily: '"Bebas Neue", serif',
          fontSize: "10rem",
          color: step.color,
          opacity: useTransform(progress, [0, 0.4], [0, 0.055]),
          letterSpacing: "0.04em",
        }}
      >
        {step.number}
      </motion.div>

      <div className="relative p-9 flex flex-col h-full">
        {/* Icon + number */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="flex items-start justify-between mb-6">
          <span
            className={`text-6xl font-bold leading-none bg-gradient-to-br ${step.gradFrom} ${step.gradTo} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Bebas Neue", serif' }}
          >
            {step.number}
          </span>
          <div className="w-8 h-8 mt-1" style={{ color: step.color, opacity: 0.65 }}>
            {step.icon}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-5">
          <h3
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
          >
            {step.title}
          </h3>
          <div className="h-px w-10" style={{ background: `linear-gradient(to right, ${step.color}60, transparent)` }} />
        </motion.div>

        {/* Description */}
        <motion.p
          style={{ opacity: contentOp, y: contentY, color: "var(--text-muted)" }}
          className="text-sm leading-relaxed flex-1"
        >
          {step.desc}
        </motion.p>

        {/* Tags */}
        <motion.div style={{ opacity: tagOp, scale: tagScale }} className="mt-6 flex flex-wrap gap-2">
          {step.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.3em] uppercase font-medium px-3 py-1.5 rounded-full"
              style={{
                color: step.color,
                background: `${step.glow.replace("0.3", "0.08")}`,
                border: `1px solid ${step.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function Header({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
      className="text-center mb-8"
    >
      <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-4">
        Our Proven Approach
      </p>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
      >
        Business Transformation Programme
      </h2>
      <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Predictable. Measurable. Repeatable. Every engagement follows the same
        four-phase sequence — because sequencing is what makes transformation stick.
      </p>
    </motion.div>
  );
}

/* ─── Desktop scroll-jacked ──────────────────────────────────────── */
function ApproachDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const s1  = useTransform(scrollYProgress, [0.02, 0.24], [0, 1]);
  const c1  = useTransform(scrollYProgress, [0.18, 0.42], [0, 1]);
  const s2  = useTransform(scrollYProgress, [0.36, 0.56], [0, 1]);
  const c2  = useTransform(scrollYProgress, [0.50, 0.68], [0, 1]);
  const s3  = useTransform(scrollYProgress, [0.62, 0.80], [0, 1]);
  const c3  = useTransform(scrollYProgress, [0.74, 0.88], [0, 1]);
  const s4  = useTransform(scrollYProgress, [0.82, 1.00], [0, 1]);

  return (
    <div ref={containerRef} id="approach" className="relative hidden lg:block" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-subtle)", opacity: 0.4 }}/>

        <div className="w-full px-8 xl:px-16 max-w-[1700px] mx-auto pt-6">
          <Header visible={isInView} />

          {/* 4 cards + 3 straight connectors */}
          <div className="flex items-stretch gap-0 mt-6" style={{ minHeight: "440px" }}>
            <StepCard step={steps[0]} progress={s1} />
            <MeanderConnector progress={c1} fromColor={steps[0].color} toColor={steps[1].color} />
            <StepCard step={steps[1]} progress={s2} />
            <MeanderConnector progress={c2} fromColor={steps[1].color} toColor={steps[2].color} />
            <StepCard step={steps[2]} progress={s3} />
            <MeanderConnector progress={c3} fromColor={steps[2].color} toColor={steps[3].color} />
            <StepCard step={steps[3]} progress={s4} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center text-[9px] tracking-[0.4em] uppercase mt-6"
            style={{ color: "var(--text-faint)" }}
          >
            Scroll to progress through each phase
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile stacked ─────────────────────────────────────────────── */
function ApproachMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:hidden" ref={ref}>
      <div className="max-w-xl mx-auto px-5">
        <Header visible={isInView} />
        <div className="flex flex-col gap-5 mt-6">
          {steps.map((step, i) => (
            <div key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 * i, ease: [0.16,1,0.3,1] }}
                className="relative rounded-3xl overflow-hidden p-8"
                style={{
                  background: "var(--surface-glass)",
                  border: `1px solid ${step.color}20`,
                  boxShadow: `0 0 60px ${step.glow.replace("0.3","0.12")}`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-5xl font-bold leading-none bg-gradient-to-br ${step.gradFrom} ${step.gradTo} bg-clip-text text-transparent`}
                    style={{ fontFamily: '"Bebas Neue", serif' }}>{step.number}</span>
                  <div className="w-7 h-7 mt-1" style={{ color: step.color, opacity: 0.65 }}>{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3"
                  style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-[9px] tracking-[0.3em] uppercase font-medium px-3 py-1.5 rounded-full"
                      style={{ color: step.color, background: `${step.glow.replace("0.3","0.08")}`, border: `1px solid ${step.color}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="flex flex-col items-center py-3 gap-1"
                >
                  <div className="w-px h-6"
                    style={{ background: `linear-gradient(to bottom, ${step.color}40, ${steps[i+1].color}40)` }}/>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke={steps[i+1].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ filter: `drop-shadow(0 0 4px ${steps[i+1].color})` }}/>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col gap-3"
        >
          <Link href="/contact"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide rounded-xl transition-all text-center">
            Request a Confidential Call
          </Link>
          <Link href="/about"
            className="px-8 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all text-center"
            style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
            Learn About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA strip (desktop only, after scroll) ────────────────────── */
function ApproachCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 hidden lg:block" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/contact"
          className="px-9 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/25">
          Request a Confidential Call
        </Link>
        <Link href="/about"
          className="px-9 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all"
          style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
          Learn About Us
        </Link>
      </motion.div>
    </section>
  );
}

/* ─── Export ─────────────────────────────────────────────────────── */
export default function Approach() {
  return (
    <>
      <ApproachDesktop />
      <ApproachCTA />
      <ApproachMobile />
    </>
  );
}
