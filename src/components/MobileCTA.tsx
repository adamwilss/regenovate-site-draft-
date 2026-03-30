"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on contact page — they're already there
  if (pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80"
        >
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm tracking-wide rounded-xl transition-all"
          >
            Start the Conversation
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
