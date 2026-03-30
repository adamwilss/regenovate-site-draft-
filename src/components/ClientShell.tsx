"use client";

import { type ReactNode } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MobileCTA } from "@/components/MobileCTA";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      {/* Noise texture overlay for depth */}
      <div
        className="pointer-events-none fixed inset-0 z-[55] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
      {children}
      <MobileCTA />
    </ThemeProvider>
  );
}
