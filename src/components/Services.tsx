"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { TextReveal } from "@/components/ui/text-reveal";

const solutions = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2" />
        <path d="M4 14l20 10m0 0l20-10M24 24v20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Acquisition Mastery",
    desc: "We find small businesses with real potential and give them the resources they need to thrive. Through smart growth strategies, including mergers and acquisitions, we bring businesses into our ecosystem and help them flourish.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M24 4a20 20 0 010 40" stroke="currentColor" strokeWidth="2" />
        <path d="M14 12h20M10 24h28M14 36h20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Marketing Innovation",
    desc: "We go beyond traditional marketing. We craft compelling stories, build genuine connections with customers and drive real brand loyalty. We deliver a constant stream of prospects who want what you sell, from you, now, and can afford it.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M24 4v10m0 20v10M4 24h10m20 0h10" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    ),
    title: "Cloud Technology",
    desc: "The future of business is in the cloud, and we have been at the forefront for over 20 years. Our cloud solutions deliver efficiency, scalability and agility, giving your business the power to do more of what works with world-class real-time Business Intelligence.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M8 40V20l16-16 16 16v20H8z" stroke="currentColor" strokeWidth="2" />
        <path d="M18 40V28h12v12" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Business Transformation Programme",
    desc: "Our proven REGENOVATE BTP has been honed over 20 years. We take traditional businesses with fragmented systems and equip them to prosper in the modern economy, delivering predictable, measurable, and repeatable growth.",
  },
];

const highlights = [
  { title: "Proven Success", desc: "Numerous small businesses turned into industry leaders." },
  { title: "Holistic Approach", desc: "Cloud technology, marketing and acquisition combined." },
  { title: "Experienced Team", desc: "Experts in finance, marketing, technology and operations." },
  { title: "Tailored Solutions", desc: "Strategies as individual as your business." },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Why Choose Regenovate
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <TextReveal delay={0.1}>The blueprint for sustainable success</TextReveal>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We don&apos;t just transform your business for today. We prepare it for
            the challenges of tomorrow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <TiltCard className="h-full" tiltAmount={8}>
                <div className="group relative p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300 h-full shimmer">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-blue-400 mb-5 group-hover:scale-110 transition-transform origin-left">{solution.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">{solution.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Highlight strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + 0.1 * i }}
              className="p-5 rounded-xl border border-slate-800/50 bg-slate-900/30 hover:bg-slate-900/60 transition-colors group"
            >
              <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
