import type { ReactNode } from "react";

export interface PillarItem {
  letter: string;
  word: string;
  desc: string;
}

export interface PillarDef {
  slug: string;
  number: string;
  numberInt: number;
  title: string;
  subtitle: string;
  acronym: string;
  tagline: string;
  outcome: string;
  desc: string;
  gradient: string;
  cardGradient: string;
  numberColor: string;
  letterColor: string;
  outlineColor: string;
  glowColor: string;
  items: PillarItem[];
  icon: ReactNode;
  nextSlug: string | null;
  prevSlug: string | null;
}

export const pillars: PillarDef[] = [
  {
    slug: "stabilise",
    number: "01",
    numberInt: 1,
    title: "Stabilise",
    subtitle: "PEOPLE",
    acronym: "ALIGN",
    tagline: "Build the foundation your business stands on.",
    outcome: "Stable, aligned, trusted workforce",
    desc: "The most important resource in any business is its people. When your team feels safe, valued and rewarded fairly, culture becomes your greatest competitive advantage. The business becomes a Talent Magnet.",
    gradient: "from-blue-400/30 via-blue-500/15 to-transparent",
    cardGradient: "from-[#0d2154] via-[#0d1b3e] to-[#0a0f2e]",
    numberColor: "from-blue-300 to-blue-500",
    letterColor: "#60a5fa",
    outlineColor: "rgba(96,165,250,0.12)",
    glowColor: "rgba(96,165,250,0.35)",
    items: [
      { letter: "A", word: "Assess",  desc: "Map your team structure, surface strengths and close critical skill gaps." },
      { letter: "L", word: "Lead",    desc: "Define and communicate a clear mission, vision and set of values everyone believes in." },
      { letter: "I", word: "Inspire", desc: "Create the trust, clarity and sense of direction that turns staff into advocates." },
      { letter: "G", word: "Grow",    desc: "Invest in training, smart recruitment and the next generation of leaders." },
      { letter: "N", word: "Nurture", desc: "Build the environment that earns loyalty, drives retention and makes people stay." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    nextSlug: "systemise",
    prevSlug: null,
  },
  {
    slug: "systemise",
    number: "02",
    numberInt: 2,
    title: "Systemise",
    subtitle: "PROCESS",
    acronym: "BUILD",
    tagline: "Architect the engine that runs without you.",
    outcome: "Efficient, consistent, scalable operations",
    desc: "Cloud power combined with the wisdom of traditional business practice. Our secret sauce puts growth on autopilot. Efficient businesses are more fun to work in and, as a result, generate significantly more profit.",
    gradient: "from-blue-500/30 via-blue-600/15 to-transparent",
    cardGradient: "from-[#0f1d5a] via-[#0d1b3e] to-[#0a0f2e]",
    numberColor: "from-blue-400 to-blue-600",
    letterColor: "#4169e1",
    outlineColor: "rgba(65,105,225,0.12)",
    glowColor: "rgba(65,105,225,0.35)",
    items: [
      { letter: "B", word: "Blueprint", desc: "Document every core process. Define what 'good' looks like before you try to replicate it." },
      { letter: "U", word: "Unify",     desc: "Eliminate silos by connecting workflows across departments into a single coherent system." },
      { letter: "I", word: "Integrate", desc: "Deploy ERP, cloud platforms and data infrastructure that talk to each other seamlessly." },
      { letter: "L", word: "Leverage",  desc: "Turn your data into decisions. Use real-time insights to continuously optimise." },
      { letter: "D", word: "Define",    desc: "Set the KPIs, metrics and dashboards that keep the whole business accountable." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    nextSlug: "scale",
    prevSlug: "stabilise",
  },
  {
    slug: "scale",
    number: "03",
    numberInt: 3,
    title: "Scale",
    subtitle: "PERFORMANCE",
    acronym: "CHART",
    tagline: "Turn a strong business into a market force.",
    outcome: "Scalable, high-performance growth engine",
    desc: "We know how to find perfect customers. People who want your products, from you, now, and can afford them. By constantly monitoring what works using the latest technology, we secure market share and create real scale.",
    gradient: "from-emerald-500/25 via-teal-500/15 to-transparent",
    cardGradient: "from-[#0a2a1e] via-[#0d1b3e] to-[#0a0f2e]",
    numberColor: "from-emerald-400 to-teal-500",
    letterColor: "#34d399",
    outlineColor: "rgba(52,211,153,0.12)",
    glowColor: "rgba(52,211,153,0.35)",
    items: [
      { letter: "C", word: "Capture",    desc: "Identify and enter the new markets and opportunities your business is ready to own." },
      { letter: "H", word: "Harness",    desc: "Extract maximum value from the resources, tools and relationships you already have." },
      { letter: "A", word: "Accelerate", desc: "Unlock revenue through smarter pricing, strategic partnerships and upsell pathways." },
      { letter: "R", word: "Reach",      desc: "Build the brand presence and marketing engine that makes you impossible to ignore." },
      { letter: "T", word: "Transform",  desc: "Commit to Kaizen. Continuous improvement baked into how the whole business operates." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    nextSlug: null,
    prevSlug: "systemise",
  },
];

export const pillarBySlug = Object.fromEntries(pillars.map(p => [p.slug, p]));
