"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { TextReveal } from "@/components/ui/text-reveal";

const pillars = [
  {
    number: "01",
    title: "Stabilise",
    subtitle: "PEOPLE",
    desc: "We understand that the most important resource in your business is your Human Resource, your PEOPLE. When people feel safe, valued and rewarded fairly, the culture is strong, resilient and can cope with the challenges of growth. Get it right and the business becomes a \"Talent Magnet\".",
    gradient: "from-blue-400/20 via-blue-500/10 to-transparent",
    numberColor: "from-blue-300 to-blue-500",
    borderHover: "hover:border-blue-400/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Systemise",
    subtitle: "PROCESS",
    desc: "By using the power of the Cloud, combined with the wisdom of traditional business practice, we have created a 'secret sauce' that puts growth on autopilot. Efficient businesses are more fun to work in and as a result generate more profit.",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    numberColor: "from-blue-400 to-blue-600",
    borderHover: "hover:border-blue-500/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "PERFORMANCE",
    desc: "We know how to generate perfect customers who want your products and services, from you, now, and can afford them. By constantly monitoring what works using the latest technology, we secure Market Share and create Scale.",
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    numberColor: "from-emerald-400 to-teal-500",
    borderHover: "hover:border-emerald-400/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" className="py-32 relative" ref={ref}>
      {/* Wave divider top */}
      <div className="wave-divider top">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z" fill="var(--color-slate-950)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-blue-400 text-[10px] font-medium tracking-[0.5em] uppercase mb-5">
            Our Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
          >
            <TextReveal delay={0.1}>Stabilise. Systemise. Scale.</TextReveal>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            In business you are always trying to do &ldquo;more of what works&rdquo; and
            &ldquo;less of what doesn&apos;t&rdquo;. Sounds simple — and it is, if you have access
            to the right tools, wisdom and experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full" glareColor="rgba(65, 105, 225, 0.08)">
                <div
                  className={`relative p-8 rounded-2xl border border-slate-800 ${pillar.borderHover} bg-slate-900/40 transition-all duration-500 h-full group overflow-hidden`}
                >
                  {/* Gradient wash that intensifies on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Ghost number — large background element */}
                  <div
                    className="absolute -top-4 -right-2 text-[8rem] font-bold leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500"
                    style={{ fontFamily: '"Bebas Neue", serif' }}
                  >
                    {pillar.number}
                  </div>

                  <div className="relative">
                    {/* Top row: number + icon */}
                    <div className="flex items-start justify-between mb-8">
                      <span
                        className={`text-6xl font-bold leading-none bg-gradient-to-br ${pillar.numberColor} bg-clip-text text-transparent`}
                        style={{ fontFamily: '"Bebas Neue", "DM Serif Display", serif' }}
                      >
                        {pillar.number}
                      </span>
                      <div className="text-slate-600 group-hover:text-blue-400 transition-colors duration-300 mt-1">
                        {pillar.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-semibold text-white mb-1"
                      style={{ fontFamily: '"DM Serif Display", serif' }}
                    >
                      {pillar.title}
                    </h3>

                    {/* Subtitle badge */}
                    <p className="text-[10px] tracking-[0.4em] uppercase font-medium text-blue-400/70 mb-5">
                      {pillar.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {pillar.desc}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mt-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
