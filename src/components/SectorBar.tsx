"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────── */
const capabilities = [
  "Manufacturing",
  "Software Development",
  "Display Technology",
  "Engineering",
  "Cloud ERP",
  "Business Transformation",
  "Marketing Innovation",
  "Acquisition Strategy",
];

const proof = [
  { label: "20+",   sublabel: "Years Experience",      isStat: true  },
  { label: "People First",                              isStat: false },
  { label: "200+",  sublabel: "Clients Transformed",   isStat: true  },
  { label: "No Theory",                                 isStat: false },
  { label: "10",    sublabel: "Businesses Owned",       isStat: true  },
  { label: "Ownership Thinking",                        isStat: false },
  { label: "£300M+", sublabel: "Revenue Generated",    isStat: true  },
  { label: "Real Results",                              isStat: false },
];

const philosophy = [
  "Stabilise · Systemise · Scale",
  "Fix the fundamentals first",
  "Data over opinion",
  "Protect talent always",
  "Systemise before scaling",
  "Clarity over complexity",
  "Action over theory",
];

/* ─── Separators ─────────────────────────────────────────────────── */
const Diamond = () => (
  <span className="mx-6 flex-shrink-0 flex items-center" aria-hidden>
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
      <rect x="2.5" y="0" width="2.5" height="2.5" transform="rotate(45 2.5 0)" fill="#3a7bff" opacity="0.55" />
    </svg>
  </span>
);

const Slash = () => (
  <span
    className="mx-5 flex-shrink-0"
    aria-hidden
    style={{
      fontFamily: '"Playfair Display", serif',
      fontStyle: "italic",
      fontSize: "0.75rem",
      color: "rgba(58,123,255,0.18)",
      lineHeight: 1,
      userSelect: "none",
    }}
  >
    /
  </span>
);

/* ─── Row 1: Capabilities — Bebas Neue, scrolls left ────────────── */
function CapabilityRow({ speed = 55 }: { speed?: number }) {
  const items = [...capabilities, ...capabilities, ...capabilities];
  return (
    <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="cursor-default transition-colors duration-200"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(1.35rem, 2vw, 1.9rem)",
                letterSpacing: "0.13em",
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.68)")}
            >
              {text}
            </span>
            <Diamond />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 2: Proof — stats pop, scrolls right ───────────────────── */
function ProofRow({ speed = 65 }: { speed?: number }) {
  const items = [...proof, ...proof, ...proof];
  return (
    <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: `marquee-reverse ${speed}s linear infinite` }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            {item.isStat ? (
              <span
                className="inline-flex items-baseline gap-2 px-4 py-[5px] rounded-[5px] cursor-default"
                style={{
                  background: "rgba(58,123,255,0.07)",
                  border: "1px solid rgba(58,123,255,0.18)",
                  boxShadow: "0 0 12px rgba(58,123,255,0.06) inset",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
                    color: "#5a9bff",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(175,196,232,0.45)",
                    lineHeight: 1,
                  }}
                >
                  {item.sublabel}
                </span>
              </span>
            ) : (
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: "italic",
                  fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
                  color: "rgba(175,196,232,0.32)",
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                  cursor: "default",
                }}
              >
                {item.label}
              </span>
            )}
            <Slash />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 3: Philosophy — fine italic, scrolls left slowly ──────── */
function PhilosophyRow({ speed = 80 }: { speed?: number }) {
  const items = [...philosophy, ...philosophy, ...philosophy];
  return (
    <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(0.72rem, 0.9vw, 0.84rem)",
                color: "rgba(99,130,200,0.28)",
                letterSpacing: "0.05em",
                lineHeight: 1,
                cursor: "default",
              }}
            >
              {text}
            </span>
            <span
              className="mx-7 flex-shrink-0"
              aria-hidden
              style={{ color: "rgba(58,123,255,0.12)", fontFamily: '"Playfair Display", serif', fontStyle: "italic", userSelect: "none" }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function SectorBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative py-9 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top / bottom hairlines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(58,123,255,0.12) 30%, rgba(58,123,255,0.12) 70%, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(58,123,255,0.08) 30%, rgba(58,123,255,0.08) 70%, transparent)" }}
      />

      {/* Centre ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 120% at 50% 50%, rgba(31,94,220,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col gap-[18px]">
        <CapabilityRow speed={55} />
        <ProofRow speed={65} />
        <PhilosophyRow speed={80} />
      </div>
    </motion.div>
  );
}
