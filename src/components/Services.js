"use client"; // needed because we use scroll animation

import { motion } from "framer-motion";
import { services } from "@/data/site"; // reads from the data file

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      {/* ---- Section title (fades in when scrolled into view) ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm uppercase tracking-widest text-[var(--accent-2)]">How I can help</p>
        <h2 className="font-display mt-3 text-4xl font-bold sm:text-6xl">Services</h2>
      </motion.div>

      {/* ---- Cards: one per service, each appears slightly after the last ---- */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-8"
          >
            <span className="font-display text-gradient text-5xl font-bold">{s.number}</span>
            <h3 className="font-display mt-4 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-[var(--muted)]">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}