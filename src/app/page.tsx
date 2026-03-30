import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SectorBar from "@/components/SectorBar";
import Pillars from "@/components/Pillars";
import Testimonials from "@/components/Testimonials";
import Quote from "@/components/Quote";
import HomeCTA from "@/components/HomeCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <SectorBar />
      <Pillars />
      <Testimonials />
      <Quote />
      <HomeCTA />
    </main>
  );
}
