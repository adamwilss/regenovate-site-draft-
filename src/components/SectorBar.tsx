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
  { label: "20+",    sublabel: "Years Experience",    isStat: true  },
  { label: "People First",                             isStat: false },
  { label: "200+",   sublabel: "Clients Transformed", isStat: true  },
  { label: "No Theory",                                isStat: false },
  { label: "10",     sublabel: "Businesses Owned",    isStat: true  },
  { label: "Ownership Thinking",                       isStat: false },
  { label: "£300M+", sublabel: "Revenue Generated",   isStat: true  },
  { label: "Real Results",                             isStat: false },
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

/* ─── Row 1: Capabilities ────────────────────────────────────────── */
function CapabilityRow() {
  const items = [...capabilities, ...capabilities, ...capabilities];
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: "marquee 45s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="cursor-default transition-all duration-300 select-none"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(58,123,255,0)",
                transition: "color 0.25s, text-shadow 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.textShadow = "0 0 30px rgba(58,123,255,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.82)";
                e.currentTarget.style.textShadow = "0 0 40px rgba(58,123,255,0)";
              }}
            >
              {text}
            </span>
            {/* Diamond separator */}
            <span className="mx-8 flex-shrink-0 flex items-center" aria-hidden>
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
                <rect x="2.5" y="0" width="2.5" height="2.5" transform="rotate(45 2.5 0)" fill="#3a7bff" opacity="0.6" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 2: Proof ───────────────────────────────────────────────── */
function ProofRow() {
  const items = [...proof, ...proof, ...proof];
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: "marquee-reverse 55s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            {item.isStat ? (
              <span
                className="inline-flex items-baseline gap-2.5 cursor-default select-none"
                style={{
                  padding: "6px 16px 7px",
                  borderRadius: "4px",
                  background: "linear-gradient(135deg, rgba(31,94,220,0.12) 0%, rgba(58,123,255,0.06) 100%)",
                  border: "1px solid rgba(58,123,255,0.28)",
                  boxShadow: "0 0 20px rgba(58,123,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(1.25rem, 1.9vw, 1.7rem)",
                    color: "#6aaeff",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(175,196,232,0.5)",
                    lineHeight: 1,
                  }}
                >
                  {item.sublabel}
                </span>
              </span>
            ) : (
              <span
                className="cursor-default select-none"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: "italic",
                  fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                  color: "rgba(175,196,232,0.38)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            )}
            <span
              className="mx-6 flex-shrink-0 select-none"
              aria-hidden
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "rgba(58,123,255,0.2)",
                lineHeight: 1,
              }}
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 3: Philosophy ──────────────────────────────────────────── */
function PhilosophyRow() {
  const items = [...philosophy, ...philosophy, ...philosophy];
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center whitespace-nowrap w-max will-change-transform"
        style={{ animation: "marquee 90s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="cursor-default select-none"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
                color: "rgba(120,150,210,0.35)",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              {text}
            </span>
            <span
              className="mx-7 flex-shrink-0 select-none"
              aria-hidden
              style={{ color: "rgba(58,123,255,0.15)", userSelect: "none" }}
            >
              —
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
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scaleY = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scaleY }}
      className="relative overflow-hidden"
      aria-hidden="true"
    >
      {/* Top hairline with glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 0%, rgba(58,123,255,0.35) 25%, rgba(58,123,255,0.5) 50%, rgba(58,123,255,0.35) 75%, transparent 100%)" }}
      />

      {/* Inner top glow */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(31,94,220,0.06) 0%, transparent 100%)" }}
      />

      {/* Centre bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 150% at 50% 50%, rgba(31,94,220,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Bottom hairline */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 0%, rgba(58,123,255,0.2) 30%, rgba(58,123,255,0.2) 70%, transparent 100%)" }}
      />

      {/* Inner bottom glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(31,94,220,0.04) 0%, transparent 100%)" }}
      />

      <div className="flex flex-col py-10 gap-6">
        <CapabilityRow />
        <ProofRow />
        <PhilosophyRow />
      </div>
    </motion.div>
  );
}
