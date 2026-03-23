import About from "@/components/About";
import Mission from "@/components/Mission";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "For more than two decades, Regenovate has been at the forefront of business transformation through Cloud Technology. We own and operate 10 diverse businesses.",
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      <About />
      <Mission />
    </main>
  );
}
