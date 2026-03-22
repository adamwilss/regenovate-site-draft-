"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path
          d="M24 4L4 14v20l20 10 20-10V14L24 4z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 14l20 10m0 0l20-10M24 24v20"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Business Transformation",
    desc: "Upgrading traditional businesses with modern technologies — cloud systems, automation, and digital infrastructure — to improve efficiency, profitability, and scalability while maintaining sustainable practices.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M24 4a20 20 0 010 40" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 12h20M10 24h28M14 36h20"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Regenerative Strategy",
    desc: "Aligning your growth strategy with natural systems and circular economy principles. We design approaches that regenerate resources and ecosystems while driving meaningful business results.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path
          d="M24 4v10m0 20v10M4 24h10m20 0h10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
    ),
    title: "Positive Impact Frameworks",
    desc: "Building measurable frameworks for climate positivity, nature positivity, social positivity, and economic positivity — ensuring growth benefits both your business and the broader ecosystem.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path
          d="M8 40V20l16-16 16 16v20H8z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M18 40V28h12v12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Sustainable Operations",
    desc: "Implementing operational changes that reduce waste, enhance resilience, and create long-term sustainability. From supply chains to energy systems, we help you operate regeneratively.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative" ref={ref}>
      {/* Subtle divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            What We Do
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Regenovation in action
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From digital transformation to regenerative strategy, we help
            organisations upgrade their systems while creating positive
            environmental, social, and economic impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-emerald-400 mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
