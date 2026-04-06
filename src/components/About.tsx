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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We live with the consequences.",
    body: "Most advisors leave before the hard part. We invest capital, take on risk, and share the outcome. That changes everything about how we make decisions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "People before process — always.",
    body: "Your team is your most valuable asset. Before we touch a single system, we stabilise the people. No process survives a team that doesn't trust the direction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
];

const story = [
  {
    label: "How it started",
    year: "20 yrs ago",
    text: "We weren't building a methodology. We were trying to fix broken businesses — not the obvious kind, but the ones that looked fine on the surface yet were full of friction underneath.",
  },
  {
    label: "What we learned",
    year: "The grind",
    text: "Through trial, error, and getting it wrong more than once, we learned what actually moves the needle. Not theory. Not trends. What works.",
  },
  {
    label: "The turning point",
    year: "The shift",
    text: "Instead of guiding a client through transformation, we proposed something different: acquire the business, fix it properly, and hand it back better.",
  },
  {
    label: "Where we are now",
    year: "Today",
    text: "We own and operate multiple businesses across manufacturing, software, display and engineering. We don't recommend change — we prove it in our own companies first.",
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-2 p-8"
      style={{
        borderRight: index < stats.length - 1 ? "1px solid rgba(148,163,184,0.07)" : "none",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-8 w-10 h-[2px] rounded-full"
        style={{ background: "linear-gradient(to right, #3a7bff, transparent)" }}
      />

      <div className="flex items-end gap-0.5 leading-none">
        <span
          className="leading-none tabular-nums"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)",
            letterSpacing: "0.01em",
            background: "linear-gradient(140deg, #ffffff 40%, #afc4e8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
        </span>
        {suffix && (
          <span
            className="mb-1.5 leading-none"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)",
              color: "#3a7bff",
              letterSpacing: "0.01em",
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      <span
        className="text-[10px] tracking-[0.3em] uppercase mt-1"
        style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Principle card ─────────────────────────────────────────────── */
function PrincipleCard({
  number,
  title,
  body,
  icon,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col gap-5 p-7 rounded-2xl cursor-default transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? "rgba(58,123,255,0.18)" : "rgba(148,163,184,0.09)"}`,
        background: hovered
          ? "rgba(31,94,220,0.05)"
          : "rgba(10,11,18,0.5)",
        boxShadow: hovered ? "0 8px 40px rgba(31,94,220,0.08)" : "none",
      }}
    >
      {/* Icon + number row */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
          style={{
            background: hovered ? "rgba(58,123,255,0.15)" : "rgba(58,123,255,0.07)",
            color: hovered ? "#60a5fa" : "rgba(58,123,255,0.6)",
            border: "1px solid rgba(58,123,255,0.15)",
          }}
        >
          {icon}
        </div>
        <span
          className="text-[10px] font-bold tracking-[0.25em] transition-colors duration-300"
          style={{
            fontFamily: '"Inter", sans-serif',
            color: hovered ? "rgba(58,123,255,0.5)" : "rgba(148,163,184,0.15)",
          }}
        >
          {number}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2.5">
        <h3
          className="text-sm font-semibold leading-snug transition-colors duration-300"
          style={{
            color: hovered ? "#ffffff" : "var(--text-primary)",
            fontFamily: '"DM Serif Display", serif',
            fontSize: "1rem",
            lineHeight: 1.35,
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "var(--text-muted)",
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.82rem",
            opacity: hovered ? 0.9 : 0.55,
            transition: "opacity 0.3s",
          }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Story timeline ─────────────────────────────────────────────── */
function StoryTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex flex-col gap-0">
      {/* Animated vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[7px] top-3 bottom-3 w-px"
        style={{
          background: "linear-gradient(to bottom, rgba(58,123,255,0.6), rgba(58,123,255,0.05))",
          transformOrigin: "top",
        }}
      />

      {story.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex gap-6 pb-9 last:pb-0"
        >
          {/* Dot */}
          <div className="flex-shrink-0 mt-[5px]">
            <div
              className="w-[15px] h-[15px] rounded-full border flex items-center justify-center"
              style={{
                borderColor: "rgba(58,123,255,0.4)",
                background: "#0B0F1A",
              }}
            >
              <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#3a7bff" }} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-semibold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "0.9rem",
                }}
              >
                {item.label}
              </span>
              <span
                className="text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 rounded-sm"
                style={{
                  color: "rgba(58,123,255,0.75)",
                  background: "rgba(58,123,255,0.08)",
                  border: "1px solid rgba(58,123,255,0.18)",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {item.year}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-muted)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.82rem",
                opacity: 0.65,
                lineHeight: 1.7,
              }}
            >
              {item.text}
            </p>
          </div>
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

      {/* Background glows — matching site pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 85% 30%, rgba(31,94,220,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 55% at 15% 75%, rgba(10,31,68,0.45) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Centered divider accent — matching site header style */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(58,123,255,0.4), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="max-w-3xl mb-20">

          {/* Eyebrow — matches site pattern */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.6em] uppercase mb-6 font-medium"
            style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
          >
            Who we are
          </motion.p>

          {/* Headline in DM Serif Display — more editorial than Space Grotesk */}
          <div className="overflow-hidden mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
              }}
            >
              Built in real businesses.
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "var(--text-faint)",
              }}
            >
              Not boardrooms.
            </motion.h2>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left: Principles */}
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[10px] tracking-[0.45em] uppercase mb-1"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
            >
              What makes us different
            </motion.p>

            {principles.map((p, i) => (
              <PrincipleCard key={p.number} {...p} delay={0.2 + i * 0.1} />
            ))}

            {/* Sector tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-2 flex flex-wrap gap-2"
            >
              {sectors.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg text-[9px] tracking-[0.2em] uppercase"
                  style={{
                    border: "1px solid rgba(148,163,184,0.09)",
                    color: "rgba(96,165,250,0.65)",
                    background: "rgba(58,123,255,0.04)",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Story timeline */}
          <div className="flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[10px] tracking-[0.45em] uppercase"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
            >
              Our story
            </motion.p>

            <StoryTimeline />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 rounded-2xl overflow-hidden grid grid-cols-2 md:grid-cols-4"
          style={{
            border: "1px solid rgba(148,163,184,0.07)",
            background: "rgba(10,11,18,0.7)",
          }}
        >
          {stats.map((s, i) => (
            <StatBlock key={s.label} {...s} delay={0.08 * i} index={i} />
          ))}
        </motion.div>

        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rounded-2xl p-8 md:p-10"
          style={{
            border: "1px solid rgba(58,123,255,0.1)",
            background: "linear-gradient(135deg, rgba(31,94,220,0.06) 0%, rgba(58,123,255,0.02) 100%)",
          }}
        >
          <div>
            <p
              className="text-lg font-semibold mb-1.5"
              style={{
                fontFamily: '"DM Serif Display", serif',
                color: "var(--text-primary)",
                fontSize: "1.15rem",
                lineHeight: 1.4,
              }}
            >
              Ready to see what ownership thinking looks like in your business?
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif', fontSize: "0.8rem" }}
            >
              One conversation. No pitch decks. No theory.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/about"
              className="text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap hover:text-white"
              style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
            >
              Our full story →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #1f5edc, #3a7bff)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.82rem",
              }}
            >
              Start the conversation
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
