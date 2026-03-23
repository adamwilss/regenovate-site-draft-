"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  /** "word" animates word-by-word, "letter" animates letter-by-letter */
  mode?: "word" | "letter";
  /** Duration per unit (word or letter) */
  stagger?: number;
  style?: React.CSSProperties;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  mode = "word",
  stagger = 0.05,
  style,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const units = mode === "word" ? children.split(" ") : children.split("");

  return (
    <span ref={ref} className={`inline ${className}`} style={style}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {unit}
            {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({ children, className = "", delay = 0 }: RevealBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
