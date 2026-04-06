"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── Data ───────────────────────────────────────────────────────── */
const navColumns = [
  {
    heading: "Company",
    links: [
      { href: "/about",     label: "About Us"  },
      { href: "/solutions", label: "Solutions" },
      { href: "/contact",   label: "Contact"   },
    ],
  },
  {
    heading: "The Method",
    links: [
      { href: "/stabilise", label: "Stabilise", num: "01" },
      { href: "/systemise", label: "Systemise", num: "02" },
      { href: "/scale",     label: "Scale",     num: "03" },
    ],
  },
];

const social = [
  {
    href: "https://www.linkedin.com/company/regenovate",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/regenovate",
    label: "Facebook",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

/* ─── Footer nav link ────────────────────────────────────────────── */
function FooterLink({ href, label, num }: { href: string; label: string; num?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <Link
        href={href}
        className="inline-flex items-center gap-3 transition-colors duration-200"
        style={{
          color: hovered ? "var(--text-primary)" : "var(--text-muted)",
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.82rem",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {num && (
          <span
            className="flex-shrink-0 transition-colors duration-200"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: hovered ? "rgba(58,123,255,0.7)" : "rgba(148,163,184,0.2)",
            }}
          >
            {num}
          </span>
        )}
        {!num && (
          <span
            className="inline-block h-px flex-shrink-0 transition-all duration-300"
            style={{
              width: hovered ? "18px" : "10px",
              background: hovered ? "#3a7bff" : "rgba(148,163,184,0.2)",
            }}
          />
        )}
        {label}
      </Link>
    </li>
  );
}

/* ─── Main footer ────────────────────────────────────────────────── */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-40px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Back to top ─────────────────────────────────────────── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 40,
          width: "2.75rem", height: "2.75rem", borderRadius: "50%",
          background: "linear-gradient(135deg, #1f5edc, #3a7bff)",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(31,94,220,0.25)",
          pointerEvents: showTop ? "auto" : "none",
          border: "none", cursor: "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 16V4m0 0L4 10m6-6l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      {/* ── Pre-footer CTA strip ─────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--bg-base)", borderTop: "1px solid rgba(148,163,184,0.07)" }}
      >
        {/* Glow behind CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 100% at 50% 120%, rgba(31,94,220,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p
              className="text-[9px] tracking-[0.6em] uppercase mb-5"
              style={{ color: "rgba(58,123,255,0.7)", fontFamily: '"Inter", sans-serif' }}
            >
              Ready to transform
            </p>
            <h2
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)",
                lineHeight: 1.08,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              One conversation can change
              <br />
              <span style={{ fontStyle: "italic", color: "var(--text-faint)" }}>
                the direction of your business.
              </span>
            </h2>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
            >
              No pitch decks. No theory. Just a direct conversation about what&apos;s possible.
            </p>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #1f5edc, #3a7bff)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.82rem",
                letterSpacing: "0.02em",
              }}
            >
              Start the conversation
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="text-sm transition-colors duration-200 hover:text-white whitespace-nowrap"
              style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
            >
              Learn how we work →
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(148,163,184,0.06)", backgroundColor: "#080b14" }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-[140px]"
            style={{ background: "rgba(10,31,68,0.5)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full blur-[120px]"
            style={{ background: "rgba(31,94,220,0.04)" }}
          />
        </div>

        {/* REGENOVATE watermark */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(5rem, 20vw, 20rem)",
              letterSpacing: "0.06em",
              lineHeight: 0.82,
              color: "rgba(175,196,232,0.03)",
              whiteSpace: "nowrap",
            }}
          >
            REGENOVATE
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">

          {/* ── Main nav grid ────────────────────────────────────── */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 pb-12"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}
          >

            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 flex flex-col gap-6"
            >
              <Link href="/" className="inline-flex items-center group w-fit">
                <span className="flex items-center rounded-lg px-3 py-1.5 bg-white/95 group-hover:bg-white transition-colors duration-200">
                  <Image src="/logo.png" alt="Regenovate" width={126} height={32} className="object-contain" />
                </span>
              </Link>

              <p
                className="max-w-xs leading-relaxed"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.8rem", lineHeight: 1.8, opacity: 0.7 }}
              >
                We invest, partner, or acquire businesses to transform and scale them — protecting your team, securing your legacy.
              </p>

              {/* SSS mantra with blue dots */}
              <div className="flex items-center gap-0">
                {["Stabilise", "Systemise", "Scale"].map((word, i) => (
                  <span key={word} className="flex items-center">
                    <span
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(175,196,232,0.25)",
                      }}
                    >
                      {word}
                    </span>
                    {i < 2 && (
                      <span
                        className="mx-3 inline-block w-[3px] h-[3px] rounded-full flex-shrink-0"
                        style={{ background: "rgba(58,123,255,0.35)" }}
                      />
                    )}
                  </span>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex gap-2">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      color: "rgba(175,196,232,0.3)",
                      border: "1px solid rgba(148,163,184,0.08)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#60a5fa";
                      e.currentTarget.style.borderColor = "rgba(58,123,255,0.3)";
                      e.currentTarget.style.background = "rgba(58,123,255,0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(175,196,232,0.3)";
                      e.currentTarget.style.borderColor = "rgba(148,163,184,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Nav columns */}
            {navColumns.map((col, colIdx) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + colIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4
                  className="mb-6"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.65rem",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "rgba(175,196,232,0.2)",
                  }}
                >
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <FooterLink key={link.href} {...link} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Contact + Office ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}
          >
            <div>
              <p
                className="mb-3"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(175,196,232,0.2)",
                }}
              >
                Get in touch
              </p>
              <a
                href="mailto:Info@regenovate.com"
                className="group inline-flex items-center gap-2 transition-colors duration-200"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                Info@regenovate.com
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div>
              <p
                className="mb-3"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(175,196,232,0.2)",
                }}
              >
                Office
              </p>
              <address
                className="not-italic"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.8rem", lineHeight: 1.8, opacity: 0.6 }}
              >
                Dalton House, Lakhpur Court<br />
                Staffordshire Technology Park<br />
                Stafford, ST18 0FX
              </address>
            </div>
          </motion.div>

          {/* ── Bottom bar ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7"
          >
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: "0.7rem", color: "rgba(175,196,232,0.18)" }}>
              &copy; {new Date().getFullYear()} Regenovate Ltd. All rights reserved.
              &nbsp;&middot;&nbsp; Registered in England &amp; Wales
            </p>
            <a
              href="https://www.regenovate.co"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ fontFamily: '"Inter", sans-serif', fontSize: "0.7rem", color: "rgba(175,196,232,0.18)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(96,165,250,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(175,196,232,0.18)")}
            >
              www.regenovate.co
            </a>
          </motion.div>

        </div>
      </footer>
    </>
  );
}
