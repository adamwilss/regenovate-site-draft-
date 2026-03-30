import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { pillarBySlug } from "@/lib/pillar-data";

export const metadata: Metadata = {
  title: "Scale — The CHART Framework",
  description: "Performance is the payoff. Turn a strong, systemised business into a market force using the CHART framework.",
};

export default function ScalePage() {
  return <PillarPage pillar={pillarBySlug["scale"]} />;
}
