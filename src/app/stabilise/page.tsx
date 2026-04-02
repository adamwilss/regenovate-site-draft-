import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { pillarBySlug } from "@/lib/pillar-data";

export const metadata: Metadata = {
  title: "Stabilise | The ALIGN Framework",
  description: "People first. Before you can systemise or scale, you need a stable, aligned, trusted workforce. Discover the ALIGN framework.",
};

export default function StabilisePage() {
  return <PillarPage pillar={pillarBySlug["stabilise"]} />;
}
