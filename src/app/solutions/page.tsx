import Services from "@/components/Services";
import Approach from "@/components/Approach";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Acquisition Mastery, Marketing Innovation, Cloud Technology and our proven Business Transformation Programme — the blueprint for sustainable success.",
};

export default function SolutionsPage() {
  return (
    <main className="pt-24">
      <Services />
      <Approach />
    </main>
  );
}
