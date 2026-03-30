"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

const inputClass =
  "w-full px-4 py-3.5 bg-slate-800/50 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all";

const labelClass = "block text-xs text-slate-400 mb-2 tracking-wide";

const trustItems = [
  {
    title: "Strictly Confidential",
    desc: "Your information is never shared with third parties.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "24-Hour Response",
    desc: "We'll be in touch within one business day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "No Obligation",
    desc: "A conversation costs nothing — ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex items-center justify-center p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-emerald-400" stroke="currentColor" strokeWidth="2">
            <motion.path
              d="M4.5 12.75l6 6 9-13.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
        <h3
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          Message received
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          Thank you for getting in touch. A member of our team will respond within 24 hours.
        </p>
        <p className="text-emerald-400/70 text-xs tracking-widest uppercase mt-6">
          Strictly Confidential
        </p>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      org: (form.elements.namedItem("company") as HTMLInputElement).value,
      inquiry: (form.elements.namedItem("inquiry") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: info + trust ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-medium mb-6">
              Get in touch
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: '"DM Serif Display", "Playfair Display", serif' }}
            >
              Let&rsquo;s talk about
              <br />
              <span className="italic gradient-text-flow">your business.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-md">
              Whether you&rsquo;re considering an exit, looking to scale, or simply
              exploring what&rsquo;s possible — we&rsquo;d love to hear your story. No
              pitch decks, no pressure. Just a conversation.
            </p>

            {/* Trust items */}
            <div className="space-y-5 mb-10">
              {trustItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">{item.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="pt-8 border-t border-slate-800/60 space-y-4">
              <div>
                <span className="text-[10px] text-slate-600 tracking-[0.35em] uppercase block mb-1">Email</span>
                <a
                  href="mailto:Info@regenovate.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  Info@regenovate.com
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-600 tracking-[0.35em] uppercase block mb-1">Office</span>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Dalton House, Lakhpur Court,<br />
                  Staffordshire Technology Park,<br />
                  Stafford. ST18 0FX
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 p-8 md:p-10 rounded-2xl border border-slate-800/80 bg-slate-900/50"
                >
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full Name *</label>
                    <input type="text" id="fullName" name="fullName" required placeholder="Jane Smith" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email *</label>
                      <input type="email" id="email" name="email" required placeholder="jane@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone *</label>
                      <input type="tel" id="phone" name="phone" required placeholder="+44 7700 000000" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>Company Name *</label>
                    <input type="text" id="company" name="company" required placeholder="Your Business Ltd." className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="inquiry" className={labelClass}>What brings you to us? *</label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      defaultValue=""
                      className={`${inputClass} cursor-pointer`}
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" disabled>Select an option...</option>
                      <option value="exit">I&apos;m considering selling my business</option>
                      <option value="transform">I want to transform and grow my business</option>
                      <option value="invest">I&apos;m seeking an investment partner</option>
                      <option value="btp">I want to learn about the BTP</option>
                      <option value="other">Just exploring my options</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Tell us more <span className="text-slate-600">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="A bit about your business, what stage you're at, or any questions you have..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/25"
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Request a Confidential Call"
                    )}
                  </button>

                  <p className="text-center text-[10px] text-slate-600 tracking-wide">
                    By submitting you agree to our Privacy Policy. We never share your information.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
