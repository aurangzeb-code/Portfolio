"use client"; // needed because we use animation

import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/data/site"; // reads from the data file

export default function Contact() {
  // ---- Copy-email: copies the address and shows "copied!" for 2 seconds ----
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // If the browser blocks copying, do nothing (the Email button still works)
    }
  }
  // Build the button list; empty values in site.js are skipped
  const links = [
    contact.email && { label: "Email", href: `mailto:${contact.email}` },
    contact.github && { label: "GitHub", href: contact.github },
    contact.whatsapp && { label: "WhatsApp", href: contact.whatsapp },
  ].filter(Boolean);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 pb-10 pt-20 sm:px-6 sm:pt-28">
      {/* ---- Big call-to-action card ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:py-20"
      >
        {/* Soft glow behind the text */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/30 blur-3xl" />

        <div className="relative">
          <p className="text-sm uppercase tracking-widest text-[var(--accent-2)]">Contact</p>
          <h2 className="font-display mt-3 text-4xl font-bold sm:text-6xl">
            Let&apos;s build something <span className="text-gradient">together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--muted)]">
            Got a shop, a clinic or just an idea? Tell me about it. I read every message myself.
            <button
              onClick={copyEmail}
              className="font-hand mt-4 block w-full text-2xl text-[var(--accent-2)] transition hover:opacity-80"
            >
              {contact.email} - {copied ? "copied!" : "tap to copy"}
            </button>
          </p>

          {/* Buttons: first one is the main (gradient) button */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`${i === 0 ? "btn-primary" : "glass"} rounded-full px-7 py-3 text-sm font-semibold`}
              >
                {l.label}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---- Footer ---- */}
      <p className="mt-10 text-center text-sm text-[var(--muted)]">
        Made with care by Aurang Zeb. &copy; 2026
      </p>
    </section>
  );
}