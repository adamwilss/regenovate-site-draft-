"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navColumns = [
  {
    heading: "Company",
    links: [
      { href: "/about",     label: "About Us"  },
      { href: "/solutions", label: "Solutions"  },
      { href: "/contact",   label: "Contact"   },
    ],
  },
  {
    heading: "The Method",
    links: [
      { href: "/stabilise", label: "Stabilise" },
      { href: "/systemise", label: "Systemise" },
      { href: "/scale",     label: "Scale"     },
    ],
  },
];

const social = [
  {
    href: "https://www.linkedin.com/company/regenovate",
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/regenovate",
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

/* ─── Animated link ──────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm transition-colors duration-200"
        style={{ color: hovered ? "var(--text-primary)" : "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="inline-block w-3 h-px transition-all duration-300 flex-shrink-0"
          style={{
            background: hovered ? "#3a7bff" : "rgba(148,163,184,0.2)",
            transform: hovered ? "scaleX(1.5)" : "scaleX(1)",
            transformOrigin: "left",
          }}
        />
        {label}
      </Link>
    </li>
  );
}

/* ─── Main footer ────────────────────────────────────────────────── */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

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
        animate={{
          opacity: showTop ? 1 : 0,
          y: showTop ? 0 : 12,
          pointerEvents: showTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg shadow-blue-500/20"
        style={{ background: "linear-gradient(135deg, #1f5edc, #3a7bff)" }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 16V4m0 0L4 10m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(148,163,184,0.07)", backgroundColor: "var(--bg-base)" }}
      >
        {/* ── Background atmosphere ────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary bottom glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "rgba(31,94,220,0.06)" }}
          />
          {/* Left ambient */}
          <div
            className="absolute top-0 left-0 w-[500px] h-[300px] rounded-full blur-[120px]"
            style={{ background: "rgba(10,31,68,0.35)" }}
          />
        </div>

        {/* ── Watermark — Bebas Neue brand text ───────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(5rem, 18vw, 18rem)",
              letterSpacing: "0.08em",
              lineHeight: 0.85,
              color: "rgba(175,196,232,0.025)",
              whiteSpace: "nowrap",
            }}
          >
            REGENOVATE
          </span>
        </div>

        {/* ── Top accent ──────────────────────────────────────── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(58,123,255,0.4), transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">

          {/* ── Brand statement ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 max-w-2xl"
          >
            <p
              className="text-[10px] tracking-[0.6em] uppercase mb-5"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
            >
              Ownership thinking applied to transformation
            </p>
            <h2
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              We fix, stabilise, and scale
              <br />
              <span style={{ color: "var(--text-faint)", fontStyle: "italic" }}>real businesses. No theory.</span>
            </h2>
          </motion.div>

          {/* ── Main grid ───────────────────────────────────────── */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.07)" }}
          >

            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-2 flex flex-col gap-6"
            >
              <Link href="/" className="inline-flex items-center group">
                <span className="flex items-center rounded-lg px-3 py-1.5 bg-white/95 group-hover:bg-white transition-colors">
                  <Image src="/logo.png" alt="Regenovate" width={130} height={34} className="object-contain" />
                </span>
              </Link>

              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem", lineHeight: 1.75 }}
              >
                We invest, partner, or acquire businesses to transform and scale them using proven methods — protecting your team, securing your legacy.
              </p>

              {/* Brand mantra */}
              <div className="flex items-center gap-3">
                {["Stabilise", "Systemise", "Scale"].map((word, i) => (
                  <span key={word} className="flex items-center gap-3">
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase"
                      style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
                    >
                      {word}
                    </span>
                    {i < 2 && (
                      <span style={{ color: "rgba(58,123,255,0.3)", fontSize: "10px" }}>·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex gap-2.5">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/10"
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid rgba(148,163,184,0.09)",
                      background: "rgba(10,11,18,0.5)",
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
                transition={{ duration: 0.6, delay: 0.2 + colIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4
                  className="text-[9px] tracking-[0.5em] uppercase font-medium mb-6"
                  style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
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

          {/* ── Contact bar ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.07)" }}
          >
            <div className="flex flex-col gap-2">
              <h4
                className="text-[9px] tracking-[0.5em] uppercase font-medium mb-1"
                style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
              >
                Contact
              </h4>
              <a
                href="mailto:Info@regenovate.com"
                className="text-sm transition-colors duration-200 hover:text-blue-400 w-fit"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem" }}
              >
                Info@regenovate.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h4
                className="text-[9px] tracking-[0.5em] uppercase font-medium mb-1"
                style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif' }}
              >
                Office
              </h4>
              <address
                className="text-sm not-italic leading-relaxed"
                style={{ color: "var(--text-muted)", fontFamily: '"Inter", sans-serif', fontSize: "0.82rem", lineHeight: 1.7 }}
              >
                Dalton House, Lakhpur Court<br />
                Staffordshire Technology Park<br />
                Stafford, ST18 0FX
              </address>
            </div>
          </motion.div>

          {/* ── Bottom bar ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8"
          >
            <p
              className="text-xs"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif', fontSize: "0.72rem" }}
            >
              &copy; {new Date().getFullYear()} Regenovate Ltd. All rights reserved.
              &nbsp;·&nbsp; Registered in England &amp; Wales
            </p>
            <a
              href="https://www.regenovate.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200 hover:text-blue-400"
              style={{ color: "var(--text-faint)", fontFamily: '"Inter", sans-serif', fontSize: "0.72rem" }}
            >
              www.regenovate.co
            </a>
          </motion.div>

        </div>
      </footer>
    </>
  );
}
