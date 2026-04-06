"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ─── Animated counter ───────────────────────────────────────────── */
function useCounter(target: number, inView: boolean, duration = 2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ─── Data ───────────────────────────────────────────────────────── */
const principles = [
  {
    number: "01",
    title: "We own businesses. We don't just advise them.",
    body: "We operate across manufacturing, software, display technology and engineering. Every method we bring to your business has already been tested and proven in ours.",
  },
  {
    number: "02",
    title: "We live with the consequences.",
    body: "Most advisors leave before the hard part. We invest capital, take on risk, and share the outcome. That changes everything about how we make decisions.",
  },
  {
    number: "03",
    title: "People before process — always.",
    body: "Your team is your most valuable asset. Before we touch a single system, we stabilise the people. No process survives a team that doesn't trust the direction.",
  },
];

const story = [
  {
    label: "How it started",
    year: "20 yrs ago",
    text: "We weren't building a methodology. We were trying to fix broken businesses — not the obvious kind, but the ones that looked fine on the surface yet were full of friction underneath. Disconnected systems. Conflicting data. Good people pulling in different directions.",
  },
  {
    label: "What we learned",
    year: "The grind",
    text: "We came from a background of building and running businesses ourselves, not advising from the sidelines. Through trial, error, and getting it wrong more than once, we learned what actually moves the needle. Not theory. Not trends. What works.",
  },
  {
    label: "The turning point",
    year: "The shift",
    text: "One conversation changed everything. Instead of guiding a client through transformation, we proposed something different: acquire the business, fix it properly, and hand it back better. The idea stuck — because we would live with the consequences.",
  },
  {
    label: "Where we are now",
    year: "Today",
    text: "We own and operate multiple businesses across manufacturing, software, display and engineering. We don't just recommend change — we implement it, test it, and prove it in our own companies first. That's the difference.",
  },
];

const sectors = ["Manufacturing", "Software Development", "Engineering", "Display Technology"];

const stats = [
  { value: 20,  suffix: "+", label: "Years' experience" },
  { value: 10,  suffix: "",  label: "Businesses owned" },
  { value: 4,   suffix: "",  label: "Core sectors" },
  { value: 200, suffix: "+", label: "Clients transformed" },
];

/* ─── Stat block ─────────────────────────────────────────────────── */
function StatBlock({
  value,
  suffix,
  label,
  delay,
  index,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCounter(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-4 py-10 px-8"
      style={{
        borderRight: index < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      {/* Large number in Bebas Neue */}
      <div className="flex items-end gap-1 leading-none">
        <span
          className="leading-none tabular-nums"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: "clamp(4rem, 7vw, 7rem)",
            letterSpacing: "0.02em",
            background: "linear-gradient(160deg, #ffffff 30%, #3a7bff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
        </span>
        {suffix && (
          <span
            className="mb-2 leading-none"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(2rem, 4vw, 4rem)",
              color: "#3a7bff",
              letterSpacing: "0.02em",
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Thin rule */}
      <div
        className="w-8 h-[1px]"
        style={{ background: "linear-gradient(to right, #3a7bff, transparent)" }}
      />

      {/* Label */}
      <span
        className="text-[11px] tracking-[0.3em] uppercase"
        style={{
          color: "rgba(175,196,232,0.5)",
          fontFamily: '"Inter", sans-serif',
          letterSpacing: "0.28em",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Principle row ──────────────────────────────────────────────── */
function PrincipleRow({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative py-8 cursor-default"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Hover fill line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "linear-gradient(to right, #3a7bff, rgba(58,123,255,0.3))" }}
      />

      <div className="flex items-start gap-8">
        {/* Number */}
        <span
          className="flex-shrink-0 mt-0.5 transition-all duration-300"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: hovered ? "rgba(58,123,255,0.8)" : "rgba(175,196,232,0.2)",
            fontStyle: "italic",
            paddingTop: "2px",
            minWidth: "28px",
          }}
        >
          {number}
        </span>

        <div className="flex flex-col gap-2.5">
          <h3
            className="text-base font-medium leading-snug transition-colors duration-300"
            style={{
              fontFamily: '"DM Serif Display", serif',
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.4,
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed transition-all duration-300"
            style={{
              color: hovered ? "rgba(175,196,232,0.7)" : "rgba(175,196,232,0.4)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.83rem",
              lineHeight: 1.7,
            }}
          >
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Story timeline ─────────────────────────────────────────────── */
function StoryTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex flex-col">
      {story.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-4 py-8"
          style={{ borderBottom: i < story.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
        >
          {/* Year tag and label row */}
          <div className="flex items-center gap-4">
            <span
              className="text-[9px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-sm"
              style={{
                fontFamily: '"Inter", sans-serif',
                color: "#3a7bff",
                background: "rgba(58,123,255,0.1)",
                border: "1px solid rgba(58,123,255,0.2)",
                letterSpacing: "0.35em",
              }}
            >
              {item.year}
            </span>
            <span
              className="text-xs font-medium tracking-wide"
              style={{
                fontFamily: '"DM Serif Display", serif',
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
              }}
            >
              {item.label}
            </span>
          </div>

          {/* Body */}
          <p
            className="text-sm leading-relaxed pl-0"
            style={{
              color: "rgba(175,196,232,0.45)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.82rem",
              lineHeight: 1.75,
            }}
          >
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={sectionRef}>

      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(31,94,220,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 60% at 10% 80%, rgba(10,31,68,0.5) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(58,123,255,0.02) 0%, transparent 80%)",
          ].join(", "),
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(rgba(175,196,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(175,196,232,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="mb-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div
              className="w-6 h-[1px]"
              style={{ background: "#3a7bff" }}
            />
            <span
              className="text-[9px] tracking-[0.5em] uppercase"
              style={{
                color: "rgba(58,123,255,0.7)",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Who we are
            </span>
          </motion.div>

          {/* Main headline — editorial, large-scale */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "#ffffff",
              }}
            >
              Built in real businesses.
            </motion.h2>
          </div>

          {/* Second line with rule — asymmetric offset */}
          <div className="flex items-center gap-6 mt-4">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 h-[1px] w-16 md:w-24"
              style={{
                background: "linear-gradient(to right, rgba(58,123,255,0.5), rgba(58,123,255,0.1))",
                transformOrigin: "left",
              }}
            />
            <motion.h2
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "rgba(175,196,232,0.3)",
              }}
            >
              Not boardrooms.
            </motion.h2>
          </div>

        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-20 items-start">

          {/* Left: Principles as editorial rows */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 mb-2"
            >
              <span
                className="text-[9px] tracking-[0.45em] uppercase"
                style={{ color: "rgba(175,196,232,0.3)", fontFamily: '"Inter", sans-serif' }}
              >
                What makes us different
              </span>
            </motion.div>

            {/* Top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-full mb-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                transformOrigin: "left",
              }}
            />

            {principles.map((p, i) => (
              <PrincipleRow key={p.number} {...p} delay={0.25 + i * 0.1} />
            ))}

            {/* Sector tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {sectors.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-sm text-[9px] tracking-[0.3em] uppercase"
                  style={{
                    border: "1px solid rgba(58,123,255,0.15)",
                    color: "rgba(58,123,255,0.55)",
                    background: "transparent",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Story */}
          <div className="flex flex-col mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-4 mb-2"
            >
              <span
                className="text-[9px] tracking-[0.45em] uppercase"
                style={{ color: "rgba(175,196,232,0.3)", fontFamily: '"Inter", sans-serif' }}
              >
                Our story
              </span>
            </motion.div>

            {/* Top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-full mb-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                transformOrigin: "left",
              }}
            />

            <StoryTimeline />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28"
        >
          {/* Top rule with label */}
          <div className="flex items-center gap-6 mb-0">
            <div
              className="flex-1 h-[1px]"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <span
              className="text-[8px] tracking-[0.5em] uppercase flex-shrink-0"
              style={{ color: "rgba(175,196,232,0.2)", fontFamily: '"Inter", sans-serif' }}
            >
              By the numbers
            </span>
            <div
              className="flex-1 h-[1px]"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {stats.map((s, i) => (
              <StatBlock key={s.label} {...s} delay={0.05 * i} index={i} />
            ))}
          </div>

          {/* Bottom rule */}
          <div
            className="h-[1px] w-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <div className="max-w-lg">
            <p
              className="mb-2"
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.35,
              }}
            >
              Ready to see what ownership thinking looks like in your business?
            </p>
            <p
              className="text-xs"
              style={{
                color: "rgba(175,196,232,0.3)",
                fontFamily: '"Inter", sans-serif',
                letterSpacing: "0.04em",
              }}
            >
              One conversation. No pitch decks. No theory.
            </p>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <Link
              href="/about"
              className="text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:text-white group flex items-center gap-2"
              style={{
                color: "rgba(175,196,232,0.35)",
                fontFamily: '"Inter", sans-serif',
                letterSpacing: "0.2em",
              }}
            >
              Our full story
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ display: "inline-block" }}
              >
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2.5 px-8 py-4 text-white text-xs font-medium tracking-widest uppercase overflow-hidden group"
              style={{
                background: "transparent",
                border: "1px solid rgba(58,123,255,0.4)",
                fontFamily: '"Inter", sans-serif',
                letterSpacing: "0.2em",
              }}
            >
              {/* Hover fill */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "linear-gradient(135deg, #1f5edc, #3a7bff)" }}
              />
              <span className="relative z-10">Start the conversation</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
