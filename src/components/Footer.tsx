"use client";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#pillars", label: "Pillars" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <a href="#" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              R
            </span>
            <span className="text-lg font-semibold text-white tracking-tight">
              regenovate
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/50">
          <p className="text-sm text-slate-500">
            &copy; 2026 Regenovate. All rights reserved.
          </p>
          <a
            href="https://www.regenovate.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
          >
            www.regenovate.co
          </a>
        </div>
      </div>
    </footer>
  );
}
