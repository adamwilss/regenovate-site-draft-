import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Pillars from "@/components/Pillars";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Testimonials from "@/components/Testimonials";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Pillars />
        <Services />
        <Approach />
        <Testimonials />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
