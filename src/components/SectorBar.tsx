"use client";

/* ─── Data ───────────────────────────────────────────────────────── */
const rowOne = [
  { text: "Manufacturing" },
  { text: "Software Development" },
  { text: "Display Technology" },
  { text: "Engineering" },
  { text: "Cloud ERP" },
  { text: "Business Transformation" },
  { text: "Marketing Innovation" },
  { text: "Acquisition Strategy" },
  { text: "20+", suffix: " Years Experience", isStat: true },
  { text: "200+", suffix: " Clients Transformed", isStat: true },
];

const rowTwo = [
  "Stabilise",
  "Systemise",
  "Scale",
  "People First",
  "Process Driven",
  "Performance Focused",
  "Ownership Thinking",
  "No Theory",
  "Real Businesses",
  "Real Results",
];

/* ─── Separators ─────────────────────────────────────────────────── */
const DiamondSep = () => (
  <span className="mx-8 flex items-center flex-shrink-0 opacity-30" aria-hidden>
    <svg width="5" height="5" viewBox="0 0 5 5">
      <rect x="2.5" y="0" width="2.5" height="2.5" transform="rotate(45 2.5 0)" fill="#3a7bff" />
    </svg>
  </span>
);

const SlashSep = () => (
  <span
    className="mx-6 flex-shrink-0"
    aria-hidden
    style={{ color: "rgba(58,123,255,0.2)", fontFamily: '"Playfair Display", serif', fontStyle: "italic", fontSize: "1rem" }}
  >
    /
  </span>
);

/* ─── Row 1 — Bebas Neue capabilities ───────────────────────────── */
function CapabilityRow() {
  const doubled = [...rowOne, ...rowOne];

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-baseline whitespace-nowrap w-max"
        style={{ animation: "marquee 45s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-baseline flex-shrink-0">
            {item.isStat ? (
              /* Stat: number in blue, suffix in smaller weight */
              <span className="flex items-baseline gap-1">
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.45rem",
                    letterSpacing: "0.05em",
                    color: "#3a7bff",
                    lineHeight: 1,
                  }}
                >
                  {item.text}
                </span>
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.1rem",
                    letterSpacing: "0.08em",
                    color: "rgba(175,196,232,0.5)",
                    lineHeight: 1,
                  }}
                >
                  {item.suffix}
                </span>
              </span>
            ) : (
              <span
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "1.25rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1,
                }}
              >
                {item.text}
              </span>
            )}
            <DiamondSep />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Row 2 — Playfair italic philosophy ────────────────────────── */
function PhilosophyRow() {
  const doubled = [...rowTwo, ...rowTwo];

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: "marquee 35s linear infinite reverse" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "0.9rem",
                letterSpacing: "0.03em",
                color: "rgba(99,130,200,0.45)",
                lineHeight: 1,
              }}
            >
              {item}
            </span>
            <SlashSep />
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
      className="relative py-7 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(148,163,184,0.07)",
        borderBottom: "1px solid rgba(148,163,184,0.07)",
        background: "rgba(6,7,13,0.6)",
      }}
    >
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
      />

      <div className="flex flex-col gap-5">
        <CapabilityRow />
        <PhilosophyRow />
      </div>
    </div>
  );
}
