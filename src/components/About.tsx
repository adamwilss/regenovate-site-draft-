"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";

/* ─── Animated counter ───────────────────────────────────────────── */
function useCounter(target: number, inView: boolean, duration = 1.8) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
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
    text: "Twenty years ago, we weren't building a methodology. We were just trying to fix broken businesses — not the obvious kind, but the ones that looked fine on the surface yet were full of friction underneath. Disconnected systems. Conflicting data. Good people pulling in different directions.",
  },
  {
    label: "What we learned",
    text: "We came from a background of building and running businesses ourselves, not advising from the sidelines. Through trial, error, and getting it wrong more than once, we learned what actually moves the needle. Not theory. Not trends. What works. That became the foundation of Regenovate.",
  },
  {
    label: "The turning point",
    text: "One conversation changed everything. Instead of guiding a client through transformation, we proposed something different: acquire the business, fix it properly, and hand it back better. They didn't take the offer — but the idea stuck. Because it solved a problem most consultants never face: we would live with the consequences.",
  },
  {
    label: "Where we are now",
    text: "Today, we own and operate multiple businesses across manufacturing, software, display and engineering. We don't just recommend change — we implement it, test it, and prove it in our own companies first. That's the difference.",
  },
];

const sectors = ["Manufacturing", "Software Development", "Engineering", "Display Technology"];

/* ─── Stat ───────────────────────────────────────────────────────── */
function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-2"
    >
      <span
        className="text-5xl md:text-6xl font-bold leading-none"
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          background: "linear-gradient(135deg, #60a5fa 0%, #7dd3fc 60%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-[10px] tracking-[0.35em] uppercase"
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
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex gap-5 p-6 rounded-2xl cursor-default transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? "rgba(96,165,250,0.25)" : "rgba(148,163,184,0.07)"}`,
        background: hovered
          ? "rgba(96,165,250,0.04)"
          : "transparent",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
        style={{
          background: "linear-gradient(to bottom, #3a7bff, #7dd3fc)",
          transformOrigin: "top",
        }}
      />

      <div className="flex-shrink-0 pt-0.5">
        <span
          className="text-[11px] font-semibold tracking-[0.2em]"
          style={{
            color: hovered ? "#60a5fa" : "var(--text-faint)",
            fontFamily: '"Space Grotesk", sans-serif',
            transition: "color 0.3s",
          }}
        >
          {number}
        </span>
      </div>

      <div>
        <h3
          className="text-sm font-semibold mb-2 leading-snug transition-colors duration-300"
          style={{
            color: hovered ? "#ffffff" : "var(--text-primary)",
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          {title}
        </h3>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif' }}
        >
          {body}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── Story accordion ────────────────────────────────────────────── */
function StoryAccordion() {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col divide-y" style={{ borderColor: "rgba(148,163,184,0.07)" }}>
      {story.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span
                className="text-sm font-semibold tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  color: isOpen ? "#60a5fa" : "var(--text-primary)",
                }}
              >
                {item.label}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{
                  border: `1px solid ${isOpen ? "rgba(96,165,250,0.4)" : "rgba(148,163,184,0.15)"}`,
                  color: isOpen ? "#60a5fa" : "var(--text-faint)",
                }}
              >
                +
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p
                className="pb-5 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif' }}
              >
                {item.text}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={sectionRef}>

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(31,94,220,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.5em] uppercase mb-5 font-medium"
            style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
          >
            Who we are
          </motion.p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-0"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}
          >
            <TextReveal delay={0.1}>Built in real businesses.</TextReveal>
            <br />
            <span style={{ color: "var(--text-faint)" }}>
              <TextReveal delay={0.35}>Not boardrooms.</TextReveal>
            </span>
          </h2>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Principles */}
          <div className="flex flex-col gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[11px] tracking-[0.35em] uppercase mb-2"
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
                  className="px-3 py-1.5 rounded-lg text-[10px] tracking-[0.25em] uppercase"
                  style={{
                    border: "1px solid rgba(96,165,250,0.15)",
                    color: "#60a5fa",
                    background: "rgba(96,165,250,0.05)",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Story accordion */}
          <div className="flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[11px] tracking-[0.35em] uppercase"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
            >
              Our story
            </motion.p>

            <StoryAccordion />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          className="mt-24 rounded-2xl p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-10"
          style={{
            border: "1px solid rgba(148,163,184,0.07)",
            background: "rgba(10,11,18,0.6)",
          }}
        >
          <Stat value={20}  suffix="+"  label="Years' experience"           delay={0}    />
          <Stat value={10}  suffix=""   label="Businesses owned & operated"  delay={0.1}  />
          <Stat value={4}   suffix=""   label="Core sectors"                 delay={0.2}  />
          <Stat value={200} suffix="+"  label="Clients transformed"          delay={0.3}  />
        </div>

        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rounded-2xl p-8 md:p-10"
          style={{
            border: "1px solid rgba(96,165,250,0.12)",
            background: "linear-gradient(135deg, rgba(31,94,220,0.06) 0%, rgba(58,123,255,0.03) 100%)",
          }}
        >
          <div>
            <p
              className="text-lg font-semibold mb-1"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: "var(--text-primary)" }}
            >
              Ready to see what ownership thinking looks like in your business?
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
            >
              One conversation. No pitch decks. No theory.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/about"
              className="text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
              style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif' }}
            >
              Our full story →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-semibold tracking-wide rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #1f5edc, #3a7bff)",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Start the conversation
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
