"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navColumns = [
  {
    heading: "Company",
    links: [
      { href: "/about",    label: "About Us"  },
      { href: "/solutions", label: "Solutions" },
      { href: "/contact",  label: "Contact"   },
    ],
  },
  {
    heading: "The Method",
    links: [
      { href: "/stabilise",  label: "Stabilise"  },
      { href: "/systemise",  label: "Systemise"  },
      { href: "/scale",      label: "Scale"      },
    ],
  },
];

const social = [
  {
    href: "https://www.linkedin.com/company/regenovate",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/regenovate",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 16V4m0 0L4 10m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <footer
        className="relative border-t overflow-hidden"
        style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-base)" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-600/[0.05] blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">

          {/* ── Top: brand + nav columns ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center group mb-6 block">
                <span className="flex items-center rounded-lg px-3 py-1.5 bg-white/95 group-hover:bg-white transition-colors">
                  <Image src="/logo.png" alt="Regenovate" width={140} height={36} className="object-contain" />
                </span>
              </Link>
              <p
                className="text-sm leading-relaxed max-w-xs mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                We fix, stabilise, and scale real businesses. Ownership thinking applied to transformation. No theory.
              </p>
              <p
                className="text-[10px] tracking-[0.35em] uppercase font-medium mb-6"
                style={{ color: "var(--text-faint)" }}
              >
                Stabilise &nbsp;·&nbsp; Systemise &nbsp;·&nbsp; Scale
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--surface-glass)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {navColumns.map((col) => (
              <div key={col.heading}>
                <h4
                  className="text-[10px] tracking-[0.4em] uppercase font-medium mb-5"
                  style={{ color: "var(--text-faint)" }}
                >
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Contact bar ──────────────────────────────────────── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div>
              <h4
                className="text-[10px] tracking-[0.4em] uppercase font-medium mb-3"
                style={{ color: "var(--text-faint)" }}
              >
                Contact
              </h4>
              <a
                href="mailto:Info@regenovate.com"
                className="text-sm transition-colors block"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                Info@regenovate.com
              </a>
            </div>
            <div>
              <h4
                className="text-[10px] tracking-[0.4em] uppercase font-medium mb-3"
                style={{ color: "var(--text-faint)" }}
              >
                Office
              </h4>
              <address
                className="text-sm not-italic leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Dalton House, Lakhpur Court<br />
                Staffordshire Technology Park<br />
                Stafford, ST18 0FX
              </address>
            </div>
          </div>

          {/* ── Bottom bar ───────────────────────────────────────── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              &copy; {new Date().getFullYear()} Regenovate Ltd. All rights reserved.
              &nbsp;·&nbsp; Registered in England &amp; Wales
            </p>
            <a
              href="https://www.regenovate.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}
            >
              www.regenovate.co
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}
