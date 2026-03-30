"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { type PillarDef, pillars } from "@/lib/pillar-data";
import { ParticleField } from "@/components/ui/particle-field";

/* ─── Item card ─────────────────────────────────────────────────── */
function ItemCard({
  item, letterColor, outlineColor, index,
}: {
  item: PillarDef["items"][0];
  letterColor: string;
  outlineColor: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 * index }}
      className="relative rounded-2xl p-8 overflow-hidden group"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${letterColor}18`,
      }}
    >
      {/* Hover wash */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${letterColor}0a, transparent 60%)` }} />

      <div className="relative flex items-start gap-8">
        {/* Letter */}
        <div className="flex-shrink-0">
          <span
            className="text-[7rem] font-bold leading-none block"
            style={{
              fontFamily: '"Bebas Neue", serif',
              color: letterColor,
              textShadow: `0 0 60px ${letterColor}44`,
              lineHeight: 0.85,
            }}
          >
            {item.letter}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-bold" style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}>
              {item.word}
            </h3>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${letterColor}30, transparent)` }} />
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
        </div>
      </div>

      {/* Index number */}
      <div className="absolute top-6 right-8 text-[9px] tracking-[0.4em] uppercase font-medium"
        style={{ color: letterColor, opacity: 0.35 }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function PillarPage({ pillar }: { pillar: PillarDef }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  const prevPillar = pillar.prevSlug ? pillars.find(p => p.slug === pillar.prevSlug) : null;
  const nextPillar = pillar.nextSlug ? pillars.find(p => p.slug === pillar.nextSlug) : null;

  return (
    <main style={{ background: "var(--bg-base)" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <ParticleField particleCount={60} connectionDistance={110} mouseRadius={130} baseHue={225} className="z-0" />

        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
          <div className="orb w-[900px] h-[900px] -top-48 -left-48"
            style={{ backgroundColor: `${pillar.letterColor}18`, animationDelay: "0s" }} />
          <div className="orb w-[600px] h-[600px] top-1/2 right-[-15%]"
            style={{ backgroundColor: `${pillar.letterColor}10`, animationDelay: "-9s" }} />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02] z-[2] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Ghost number */}
        <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: '"Bebas Neue", serif',
              fontSize: "clamp(20rem, 50vw, 60rem)",
              color: pillar.letterColor,
              opacity: 0.03,
              letterSpacing: "0.02em",
            }}
          >
            {pillar.number}
          </span>
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-5xl mx-auto px-8 pt-32 pb-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-12"
          >
            <Link href="/#pillars" className="text-xs tracking-[0.4em] uppercase transition-colors"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => (e.currentTarget.style.color = pillar.letterColor)}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
              BTP
            </Link>
            <span style={{ color: "var(--text-faint)" }}>·</span>
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: pillar.letterColor, opacity: 0.7 }}>
              {pillar.number}
            </span>
          </motion.div>

          {/* Number tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="font-bold leading-none block mb-2"
              style={{
                fontFamily: '"Bebas Neue", serif',
                fontSize: "clamp(6rem, 14vw, 14rem)",
                color: pillar.letterColor,
                textShadow: `0 0 120px ${pillar.letterColor}44`,
                lineHeight: 0.85,
              }}
            >
              {pillar.number}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.2 }}
            className="font-bold mb-3"
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: "clamp(3rem, 7vw, 7rem)",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            {pillar.title}
          </motion.h1>

          {/* Subtitle + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
          >
            <p className="text-[10px] tracking-[0.6em] uppercase font-semibold mb-4"
              style={{ color: pillar.letterColor, opacity: 0.7 }}>{pillar.subtitle}</p>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}>{pillar.tagline}</p>
            <p className="text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.75 }}>
              {pillar.desc}
            </p>
          </motion.div>

          {/* Acronym pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="mt-10 inline-flex items-center gap-3"
          >
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: pillar.outlineColor, border: `1px solid ${pillar.letterColor}30` }}
            >
              <span className="text-xs tracking-[0.4em] uppercase font-medium" style={{ color: pillar.letterColor }}>
                The {pillar.acronym} Framework
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: pillar.letterColor }} />
              <span className="text-xs font-medium" style={{ color: pillar.letterColor, opacity: 0.65 }}>
                {pillar.items.length} principles
              </span>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-14 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b"
              style={{ backgroundImage: `linear-gradient(to bottom, ${pillar.letterColor}50, transparent)` }}
            />
            <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--text-faint)" }}>
              Explore the framework
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FRAMEWORK ITEMS ──────────────────────────────────────── */}
      <section className="py-24 max-w-4xl mx-auto px-8">
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3" style={{ color: pillar.letterColor }}>
            {pillar.acronym} — The {pillar.items.length} Principles
          </p>
          <div className="h-px w-16" style={{ background: `linear-gradient(to right, ${pillar.letterColor}60, transparent)` }} />
        </div>

        <div className="flex flex-col gap-5">
          {pillar.items.map((item, i) => (
            <ItemCard key={i} item={item} letterColor={pillar.letterColor} outlineColor={pillar.outlineColor} index={i} />
          ))}
        </div>
      </section>

      {/* ── OUTCOME ──────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-8">
        <OutcomeBlock pillar={pillar} />
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────── */}
      <nav className="py-16 max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-between gap-4">
          {prevPillar ? (
            <Link
              href={`/${prevPillar.slug}`}
              className="flex items-center gap-3 group flex-1"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 flex-shrink-0"
                viewBox="0 0 20 20" fill="none" style={{ color: prevPillar.letterColor }}>
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: "var(--text-faint)" }}>Previous</p>
                <p className="text-sm font-semibold" style={{ color: prevPillar.letterColor }}>{prevPillar.title}</p>
              </div>
            </Link>
          ) : (
            <Link href="/#pillars" className="flex items-center gap-3 group flex-1">
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 flex-shrink-0"
                viewBox="0 0 20 20" fill="none" style={{ color: "var(--text-faint)" }}>
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: "var(--text-faint)" }}>Back</p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Overview</p>
              </div>
            </Link>
          )}

          <div className="flex gap-2">
            {pillars.map(p => (
              <Link key={p.slug} href={`/${p.slug}`}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: p.slug === pillar.slug ? pillar.letterColor : "var(--border-subtle)" }} />
            ))}
          </div>

          {nextPillar ? (
            <Link href={`/${nextPillar.slug}`} className="flex items-center gap-3 group flex-1 justify-end text-right">
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: "var(--text-faint)" }}>Next</p>
                <p className="text-sm font-semibold" style={{ color: nextPillar.letterColor }}>{nextPillar.title}</p>
              </div>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0"
                viewBox="0 0 20 20" fill="none" style={{ color: nextPillar.letterColor }}>
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ) : (
            <Link href="/contact" className="flex items-center gap-3 group flex-1 justify-end text-right">
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: "var(--text-faint)" }}>Ready?</p>
                <p className="text-sm font-semibold text-blue-400">Get Started</p>
              </div>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0 text-blue-400"
                viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}

/* ─── Outcome block ─────────────────────────────────────────────── */
function OutcomeBlock({ pillar }: { pillar: PillarDef }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
      className="relative rounded-3xl p-12 overflow-hidden text-center"
      style={{
        background: `linear-gradient(135deg, ${pillar.outlineColor}, rgba(255,255,255,0.01))`,
        border: `1px solid ${pillar.letterColor}25`,
      }}
    >
      {/* Ghost acronym */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{ fontFamily: '"Bebas Neue", serif', fontSize: "14rem", color: pillar.letterColor, opacity: 0.04, letterSpacing: "0.08em" }}>
          {pillar.acronym}
        </span>
      </div>
      <div className="relative">
        <p className="text-[9px] tracking-[0.5em] uppercase font-medium mb-4" style={{ color: pillar.letterColor, opacity: 0.75 }}>
          The Outcome
        </p>
        <p
          className="text-2xl md:text-3xl font-bold mb-6 mx-auto max-w-xl leading-tight"
          style={{ fontFamily: '"DM Serif Display", serif', color: "var(--text-primary)" }}
        >
          &ldquo;{pillar.outcome}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${pillar.letterColor}50)` }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: pillar.letterColor }} />
          <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${pillar.letterColor}50)` }} />
        </div>
      </div>
    </motion.div>
  );
}
