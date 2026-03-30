"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const trustItems = [
  {
    label: "Strictly Confidential",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "24hr Response",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "No Obligation",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function HomeCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-slate-900/60 backdrop-blur-sm p-12 md:p-16 text-center"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full bg-blue-600/12 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium mb-7"
            >
              Start the conversation
            </motion.p>

            {/* Headline */}
            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "105%" }}
                animate={isInView ? { y: 0 } : { y: "105%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight"
                style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
              >
                Ready to secure your legacy?
              </motion.h2>
            </div>

            <div className="overflow-hidden mb-10">
              <motion.span
                className="block text-4xl md:text-5xl lg:text-[3.5rem] font-bold italic leading-tight"
                initial={{ y: "105%" }}
                animate={isInView ? { y: 0 } : { y: "105%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
              >
                <span className="gradient-text-flow">Let&rsquo;s talk.</span>
              </motion.span>
            </div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="text-slate-400 max-w-lg mx-auto mb-10 text-base leading-relaxed"
            >
              Whether you&rsquo;re looking to exit, scale, or transform — our team of
              experts is ready to guide you through the next chapter of your business journey.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                href="/contact"
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/30 text-sm"
              >
                Request a Confidential Call
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 border border-slate-700 hover:border-blue-400/40 text-slate-400 hover:text-white font-semibold tracking-wide rounded-xl transition-all text-sm"
              >
                Learn About Us
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            >
              {trustItems.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-[10px] text-slate-500 tracking-[0.3em] uppercase"
                >
                  <span className="text-blue-500/50">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
