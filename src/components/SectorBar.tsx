"use client";

const rowOne = [
  "Manufacturing",
  "Software Development",
  "Display Technology",
  "Engineering",
  "Cloud ERP",
  "Business Transformation",
  "Marketing Innovation",
  "Acquisition Strategy",
  "20+ Years Experience",
  "200+ Clients Transformed",
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

const Separator = () => (
  <span className="mx-6 flex items-center flex-shrink-0" aria-hidden>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
      <rect x="3" y="0" width="3" height="3" transform="rotate(45 3 0)" fill="currentColor" className="text-blue-500/50" />
    </svg>
  </span>
);

function MarqueeRow({
  items,
  reverse = false,
  speed = "30s",
}: {
  items: string[];
  reverse?: boolean;
  speed?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{
          animation: `marquee ${speed} linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
              className="text-[10px] tracking-[0.4em] uppercase"
            >
              {item}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SectorBar() {
  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(148,163,184,0.07)",
        borderBottom: "1px solid rgba(148,163,184,0.07)",
      }}
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }} />

      <div className="flex flex-col gap-3">
        <div style={{ color: "var(--text-faint)" }}>
          <MarqueeRow items={rowOne} speed="40s" />
        </div>
        <div style={{ color: "rgba(99,130,200,0.45)" }}>
          <MarqueeRow items={rowTwo} reverse speed="32s" />
        </div>
      </div>
    </div>
  );
}
