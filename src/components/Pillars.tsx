"use client";

import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

/* ─── Data ─────────────────────────────────────────────────────── */
const pillars = [
  {
    number: "01",
    title: "Stabilise",
    subtitle: "PEOPLE",
    desc: "We understand that the most important resource in your business is your Human Resource, your PEOPLE. When people feel safe, valued and rewarded fairly, the culture is strong, resilient and can cope with the challenges of growth. Get it right and the business becomes a \"Talent Magnet\".",
    gradient: "from-blue-400/20 via-blue-500/10 to-transparent",
    numberColor: "from-blue-300 to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Systemise",
    subtitle: "PROCESS",
    desc: "By using the power of the Cloud, combined with the wisdom of traditional business practice, we have created a 'secret sauce' that puts growth on autopilot. Efficient businesses are more fun to work in and as a result generate more profit.",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    numberColor: "from-blue-400 to-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "PERFORMANCE",
    desc: "We know how to generate perfect customers who want your products and services, from you, now, and can afford them. By constantly monitoring what works using the latest technology, we secure Market Share and create Scale.",
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    numberColor: "from-emerald-400 to-teal-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Scroll-animated pillar card ───────────────────────────────── */
function PillarCard({
  pillar,
  progress,
}: {
  pillar: typeof pillars[0];
  progress: MotionValue<number>;
}) {
  const filterVal = useTransform(
    progress,
    (p) => `grayscale(${(1 - p) * 85}%) brightness(${0.38 + p * 0.62})`
  );
  const glowOp = useTransform(progress, [0.2, 1], [0, 1]);
  const lineScale = useTransform(progress, [0.35, 1], [0, 1]);

  return (
    <motion.div
      className="relative flex-1 p-8 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden"
      style={{ filter: filterVal }}
    >
      {/* Colour wash on activation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`}
        style={{ opacity: glowOp }}
      />

      {/* Ghost number background */}
      <div
        className="absolute -top-4 -right-2 text-[8rem] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
        style={{ fontFamily: '"Bebas Neue", serif' }}
      >
        {pillar.number}
      </div>

      <div className="relative">
        {/* Number + icon row */}
        <div className="flex items-start justify-between mb-8">
          <span
            className={`text-6xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Bebas Neue", serif' }}
          >
            {pillar.number}
          </span>
          <div className="text-slate-600 mt-1">{pillar.icon}</div>
        </div>

        <h3
          className="text-2xl font-semibold text-white mb-1"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          {pillar.title}
        </h3>
        <p className="text-[10px] tracking-[0.4em] uppercase font-medium text-blue-400/70 mb-5">
          {pillar.subtitle}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>

        {/* Activation line */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-blue-500/60 to-transparent"
          style={{ scaleX: lineScale, originX: 0 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── SVG wire connector ─────────────────────────────────────────── */
function Wire({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex items-center justify-center w-16 flex-shrink-0">
      <svg width="64" height="24" viewBox="0 0 64 24" style={{ overflow: "visible" }}>
        {/* Static track */}
        <line x1="4" y1="12" x2="60" y2="12" stroke="#1e293b" strokeWidth="1.5" />
        {/* Animated wire */}
        <motion.path
          d="M 4 12 L 52 12"
          stroke="#4169e1"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: progress }}
        />
        {/* Arrowhead fades in as wire completes */}
        <motion.path
          d="M 48 8 L 58 12 L 48 16"
          stroke="#4169e1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity: useTransform(progress, [0.7, 1], [0, 1]) }}
        />
      </svg>
    </div>
  );
}

/* ─── Section header (shared) ───────────────────────────────────── */
function SectionHeader({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-14"
    >
      <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-5">
        Our Philosophy
      </p>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
        style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
      >
        Stabilise. Systemise. Scale.
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
        In business you are always trying to do &ldquo;more of what works&rdquo; and &ldquo;less
        of what doesn&apos;t&rdquo;. Sounds simple — and it is, if you have access to the right
        tools, wisdom and experience.
      </p>
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

  // Activation schedule (matches CLAUDE.md spec)
  const box1 = useTransform(scrollYProgress, [0.03, 0.22], [0, 1]);
  const wire1 = useTransform(scrollYProgress, [0.17, 0.45], [0, 1]);
  const box2 = useTransform(scrollYProgress, [0.40, 0.60], [0, 1]);
  const wire2 = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const box3 = useTransform(scrollYProgress, [0.70, 0.92], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="pillars"
      className="relative hidden md:block"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-16">
        {/* Top rule */}
        <div className="absolute top-16 left-0 right-0 h-px bg-slate-800/60" />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeader visible={isInView} />

          {/* Pillars row with wire connectors */}
          <div className="flex items-stretch gap-0">
            <PillarCard pillar={pillars[0]} progress={box1} />
            <Wire progress={wire1} />
            <PillarCard pillar={pillars[1]} progress={box2} />
            <Wire progress={wire2} />
            <PillarCard pillar={pillars[2]} progress={box3} />
          </div>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center text-[10px] text-slate-600 tracking-[0.3em] uppercase mt-10"
          >
            Scroll to explore
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: regular card reveals ─────────────────────────────── */
function PillarsMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader visible={isInView} />

        <div className="grid gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 rounded-2xl border border-slate-800 bg-slate-900/40 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none`} />
              <div
                className="absolute -top-4 -right-2 text-[8rem] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ fontFamily: '"Bebas Neue", serif' }}
              >
                {pillar.number}
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`text-6xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
                    style={{ fontFamily: '"Bebas Neue", serif' }}
                  >
                    {pillar.number}
                  </span>
                  <div className="text-blue-400/60 mt-1">{pillar.icon}</div>
                </div>
                <h3
                  className="text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: '"DM Serif Display", serif' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[10px] tracking-[0.4em] uppercase font-medium text-blue-400/70 mb-4">
                  {pillar.subtitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
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
