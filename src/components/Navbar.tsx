"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          <Link href="/" className="flex items-center group">
            {/* Full wordmark on desktop — white pill so black-text logo is always readable */}
            <span className="hidden md:flex items-center bg-white/95 rounded-lg px-3 py-1.5 group-hover:bg-white transition-colors">
              <Image
                src="/logo.png"
                alt="Regenovate"
                width={160}
                height={40}
                className="object-contain"
              />
            </span>
            {/* Icon only on mobile */}
            <span className="md:hidden flex items-center bg-white/95 rounded-lg p-1.5 group-hover:bg-white transition-colors">
              <Image
                src="/logo-icon.png"
                alt="Regenovate"
                width={40}
                height={40}
                className=""
              />
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-[0.08em] transition-colors ${
                  pathname === link.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
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

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {[...navLinks, { href: "/contact", label: "Get in Touch" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-semibold transition-colors ${
                      pathname === link.href
                        ? "text-blue-400"
                        : "text-white hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
