"use client";

const items = [
  "Manufacturing",
  "Software Development",
  "Display Technology",
  "Engineering",
  "Cloud ERP",
  "Business Transformation",
  "Marketing Innovation",
  "Acquisition Mastery",
  "20+ Years Experience",
  "200+ Clients Transformed",
];

// Duplicate for seamless infinite scroll
const marqueeItems = [...items, ...items];

export default function SectorBar() {
  return (
    <div className="relative py-6 overflow-hidden border-y border-slate-800/50">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
        {marqueeItems.map((item, i) => (
          <span
            key={i}
            className="flex items-center text-[10px] text-slate-600 tracking-[0.35em] uppercase font-medium flex-shrink-0"
          >
            {item}
            <span className="mx-8 w-1 h-1 rounded-full bg-blue-500/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
