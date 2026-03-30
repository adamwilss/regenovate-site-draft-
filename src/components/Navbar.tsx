"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme, type Theme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
];

/* ── Theme icons ─────────────────────────────────────────────────── */
function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
  if (theme === "midnight") return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
  // dark
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  midnight: "Midnight",
};

const THEME_NEXT: Record<Theme, Theme> = {
  dark: "light",
  light: "midnight",
  midnight: "dark",
};

/* ── Component ──────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const pathname = usePathname();
  const { theme, cycle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const logoNeedsWhiteBg = theme === "dark" || theme === "midnight";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}>

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className={`hidden md:flex items-center rounded-lg px-3 py-1.5 transition-colors ${
              logoNeedsWhiteBg ? "bg-white/95 group-hover:bg-white" : "bg-white/80 group-hover:bg-white"
            }`}>
              <Image src="/logo.png" alt="Regenovate" width={160} height={40} className="object-contain" />
            </span>
            <span className={`md:hidden flex items-center rounded-lg p-1.5 transition-colors ${
              logoNeedsWhiteBg ? "bg-white/95 group-hover:bg-white" : "bg-white/80 group-hover:bg-white"
            }`}>
              <Image src="/logo-icon.png" alt="Regenovate" width={40} height={40} />
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium tracking-[0.08em] transition-colors"
                style={{ color: pathname === link.href ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Theme toggle */}
            <div className="relative">
              <motion.button
                onClick={() => { cycle(); setTooltip(true); setTimeout(() => setTooltip(false), 1400); }}
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--surface-glass)",
                }}
                aria-label="Switch theme"
              >
                <ThemeIcon theme={theme} />
                <span className="hidden lg:inline">{THEME_LABELS[theme]}</span>
              </motion.button>

              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap pointer-events-none"
                    style={{
                      background: "var(--surface-glass)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-muted)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    Next: {THEME_LABELS[THEME_NEXT[theme]]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className={`px-5 py-2.5 text-white text-sm font-medium tracking-[0.06em] rounded-xl transition-all ${
                pathname === "/contact"
                  ? "bg-blue-500 shadow-lg shadow-blue-500/25"
                  : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
              }`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={cycle}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
              aria-label="Switch theme"
            >
              <ThemeIcon theme={theme} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
                style={{ backgroundColor: "var(--text-primary)" }} />
              <span className={`w-6 h-0.5 transition-all ${mobileOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--text-primary)" }} />
              <span className={`w-6 h-0.5 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                style={{ backgroundColor: "var(--text-primary)" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 backdrop-blur-xl pt-24 px-6 md:hidden"
            style={{ background: "var(--surface-glass)" }}
          >
            <div className="flex flex-col gap-6">
              {[...navLinks, { href: "/contact", label: "Get in Touch" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold transition-colors"
                  style={{ color: pathname === link.href ? "#60a5fa" : "var(--text-primary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
