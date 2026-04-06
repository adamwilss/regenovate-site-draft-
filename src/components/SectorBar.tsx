"use client";

/* ─── Data ───────────────────────────────────────────────────────── */
const capabilities = [
  { text: "Manufacturing" },
  { text: "Software Development" },
  { text: "Display Technology" },
  { text: "Engineering" },
  { text: "Cloud ERP" },
  { text: "Business Transformation" },
  { text: "Marketing Innovation" },
  { text: "Acquisition Strategy" },
];

const proof = [
  { label: "20+",  sublabel: "Years Experience",     isStat: true  },
  { label: "People First",                            isStat: false },
  { label: "200+", sublabel: "Clients Transformed",  isStat: true  },
  { label: "No Theory",                               isStat: false },
  { label: "10",   sublabel: "Businesses Owned",      isStat: true  },
  { label: "Ownership Thinking",                      isStat: false },
  { label: "4",    sublabel: "Core Sectors",          isStat: true  },
  { label: "Real Results",                            isStat: false },
];

const philosophy = [
  "Stabilise", "Systemise", "Scale",
  "Fix the fundamentals first",
  "Data over opinion",
  "Protect talent always",
  "Systemise before scaling",
  "Clarity over complexity",
  "Action over theory",
];

/* ─── Separators ─────────────────────────────────────────────────── */
const Gem = () => (
  <span className="mx-7 flex-shrink-0 flex items-center" aria-hidden>
    <svg width="6" height="6" viewBox="0 0 6 6">
      <rect x="3" y="0" width="3" height="3" transform="rotate(45 3 0)" fill="#3a7bff" opacity="0.5" />
    </svg>
  </span>
);

const Dot = () => (
  <span
    className="mx-7 flex-shrink-0 inline-block w-[3px] h-[3px] rounded-full"
    aria-hidden
    style={{ background: "rgba(58,123,255,0.2)" }}
  />
);

/* ─── Row 1: Capabilities — large Bebas Neue, scrolls left ──────── */
function CapabilityRow() {
  const items = [...capabilities, ...capabilities, ...capabilities];
  return (
    <div className="overflow-hidden group/row">
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: "marquee 50s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
            >
              {item.text}
            </span>
            <Gem />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 2: Proof — stats pop out, scrolls right ───────────────── */
function ProofRow() {
  const items = [...proof, ...proof, ...proof];
  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: "marquee-reverse 60s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            {item.isStat ? (
              /* Stat pill — stands out from the flow */
              <span
                className="inline-flex items-baseline gap-1.5 px-4 py-1 rounded-md"
                style={{
                  background: "rgba(58,123,255,0.08)",
                  border: "1px solid rgba(58,123,255,0.2)",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                    color: "#3a7bff",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
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
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: "italic",
                  fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                  color: "rgba(175,196,232,0.35)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            )}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 3: Philosophy — fine italic, scrolls left slower ──────── */
function PhilosophyRow() {
  const items = [...philosophy, ...philosophy, ...philosophy];
  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: "marquee 70s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(0.75rem, 1vw, 0.88rem)",
                color: "rgba(99,130,200,0.3)",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              {item}
            </span>
            <span
              className="mx-6 flex-shrink-0"
              aria-hidden
              style={{ color: "rgba(58,123,255,0.15)", fontFamily: '"Playfair Display", serif', fontStyle: "italic" }}
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function SectorBar() {
  return (
    <div
      className="relative py-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(6,7,13,0.0) 0%, rgba(8,11,20,0.7) 50%, rgba(6,7,13,0.0) 100%)",
        borderTop: "1px solid rgba(148,163,184,0.07)",
        borderBottom: "1px solid rgba(148,163,184,0.07)",
      }}
    >
      {/* Centre glow — draws the eye */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(31,94,220,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Fade masks — wider to clean up edges on large screens */}
      <div
        className="absolute left-0 top-0 bottom-0 w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
      />

      <div className="flex flex-col gap-5">
        <CapabilityRow />
        <ProofRow />
        <PhilosophyRow />
      </div>
    </div>
  );
}
