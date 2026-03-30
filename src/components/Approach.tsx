"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";

const steps = [
  {
    title: "Analyse",
    desc: "We start by thoroughly evaluating the marketplace you are in and your position within it. We review your products and how they meet the demands of the market, and look for new opportunities — ones which ideally create passive revenue.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Plan",
    desc: "Now we know where we are headed and why, we plan the transition from \"As Is\" to \"To Be\", plotting the key milestones and waymarkers we need to stay on track. Having completed this process over 100 times, we know where the pitfalls are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Execute",
    desc: "Our strategy revolves around 3 Core Principles: Policy (what we want to achieve), Process (how we will achieve it), and Systems (capturing data to provide Intelligence). This Best in Class approach has been honed over 20 years.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Grow",
    desc: "Now we know 'what works' we invest wisely, get the phone ringing, close deals and drive growth. Once stable growth is achieved with solid operations, we look to accelerate through horizontal or vertical acquisitions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Our Proven Approach
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <TextReveal delay={0.1}>Business Transformation Programme</TextReveal>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We take traditional businesses with fragmented systems and equip them
            to prosper in the modern economy — delivering predictable, measurable,
            and repeatable growth.
          </p>
        </motion.div>

        {/* Horizontal timeline on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop: horizontal connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/40 via-blue-400/60 to-blue-500/40 origin-left"
          />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.15 * i }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="flex lg:flex-col items-center lg:items-center gap-4 lg:gap-0 mb-4 lg:mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + 0.15 * i, type: "spring" }}
                    className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0"
                  >
                    {step.icon}
                  </motion.div>
                  {/* Mobile connector */}
                  <div className="lg:hidden flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
                </div>

                <div className="lg:text-center">
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="px-9 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/25"
          >
            Request a Confidential Call
          </Link>
          <Link
            href="/about"
            className="px-9 py-4 border border-slate-700 hover:border-blue-400/40 text-slate-400 hover:text-white font-semibold text-sm tracking-wide rounded-xl transition-all"
          >
            Learn About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
