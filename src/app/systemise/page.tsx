import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { pillarBySlug } from "@/lib/pillar-data";

export const metadata: Metadata = {
  title: "Systemise | The BUILD Framework",
  description: "Process is the engine. Build scalable, efficient operations using the BUILD framework: Blueprint, Unify, Integrate, Leverage, Define.",
};

export default function SystemisePage() {
  return <PillarPage pillar={pillarBySlug["systemise"]} />;
}
