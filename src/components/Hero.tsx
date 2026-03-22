"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="orb w-[600px] h-[600px] bg-emerald-600/30 -top-48 -left-48"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="orb w-[500px] h-[500px] bg-teal-500/20 top-1/3 right-[-10%]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-emerald-500/15 bottom-[-10%] left-1/3"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          Regenerate + Innovate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Transforming systems
          <br />
          for a{" "}
          <span className="gradient-text">regenerative</span>{" "}
          future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We help businesses and communities innovate with purpose — creating
          solutions that are sustainable, resilient, and beneficial for both
          people and the planet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-slate-600 hover:border-emerald-500 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </header>
  );
}
