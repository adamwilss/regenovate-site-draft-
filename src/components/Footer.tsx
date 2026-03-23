"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About Us" },
  { href: "#solutions", label: "Solutions" },
  { href: "#approach", label: "Our Approach" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 16V4m0 0L4 10m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <a href="#" className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                R
              </span>
              <span className="text-lg font-semibold text-white tracking-tight">
                Regenovate
              </span>
            </a>
            <div className="flex flex-wrap gap-6 justify-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-slate-800/50">
            <div>
              <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Contact</h4>
              <a href="mailto:Info@regenovate.com" className="text-sm text-slate-400 hover:text-blue-400 transition-colors block mb-1">
                Info@regenovate.com
              </a>
            </div>
            <div>
              <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Office</h4>
              <p className="text-sm text-slate-400">
                Dalton House, Lakhpur Court,<br />
                Staffordshire Technology Park,<br />
                Stafford. ST18 0FX
              </p>
            </div>
            <div>
              <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Follow</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/regenovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/regenovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/50">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Regenovate. All rights reserved.
            </p>
            <a
              href="https://www.regenovate.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              www.regenovate.co
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
