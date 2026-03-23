"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Analyse",
    desc: "We start by thoroughly evaluating the marketplace you are in and your position within it. We review your products and how they meet the demands of the market, and look for new opportunities — ones which ideally create passive revenue.",
  },
  {
    title: "Plan",
    desc: "Now we know where we are headed and why, we plan the transition from \"As Is\" to \"To Be\", plotting the key milestones and waymarkers we need to stay on track. Having completed this process over 100 times, we know where the pitfalls are.",
  },
  {
    title: "Execute",
    desc: "Our strategy revolves around 3 Core Principles: Policy (what we want to achieve), Process (how we will achieve it), and Systems (capturing data to provide Intelligence). This Best in Class approach has been honed over 20 years.",
  },
  {
    title: "Grow",
    desc: "Now we know 'what works' we invest wisely, get the phone ringing, close deals and drive growth. Once stable growth is achieved with solid operations, we look to accelerate through horizontal or vertical acquisitions.",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-400 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Proven Approach
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Business Transformation
              <br />
              Programme
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              We take traditional businesses with fragmented systems and
              infrastructure and equip them to prosper in the modern economy
              using the power of Cloud technology — delivering predictable,
              measurable, and repeatable growth.
            </p>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                  style={{
                    margin: `${ring * 30}px`,
                    animation: `spin ${15 + ring * 5}s linear infinite${
                      ring % 2 === 0 ? " reverse" : ""
                    }`,
                  }}
                >
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
                    style={{ top: "-5px", left: "50%", marginLeft: "-5px" }}
                  />
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center glow">
                  <span className="text-white font-bold text-xs tracking-wider text-center leading-tight">
                    Regenovate
                    <br />
                    <span className="text-blue-200 text-[10px] font-normal">BTP</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
