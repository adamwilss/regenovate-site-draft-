import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pillars from "@/components/Pillars";
import Approach from "@/components/Approach";
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
        <Services />
        <Pillars />
        <Approach />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
