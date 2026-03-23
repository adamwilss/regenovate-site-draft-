import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Regenovate. Whether you're looking to exit your business, secure your legacy, or explore our Business Transformation Programme.",
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      <Contact />
    </main>
  );
}
