"use client"; // needed for the filter buttons + animation

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/site"; // reads from the data file

// Filter buttons shown above the cards
const categories = ["All", "Desktop", "Web"];

// Moves the glow so it follows the mouse inside a card
function handleMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Projects() {
  // Which filter is selected right now
  const [active, setActive] = useState("All");

  // Projects to show for the selected filter
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      {/* ---- Section title ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm uppercase tracking-widest text-[var(--accent-2)]">My work</p>
        <h2 className="font-display mt-3 text-4xl font-bold sm:text-6xl">Projects</h2>
        <p className="mt-3 max-w-xl text-[var(--muted)]">Real apps for real shops and clinics. Some are done, some I am still working on.</p>
      </motion.div>

      {/* ---- Filter buttons ---- */}
      <div className="mt-8 flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === c ? "btn-primary" : "glass text-[var(--muted)] hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ---- Project cards ---- */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
              onMouseMove={handleMove}
              className="glass spotlight flex flex-col rounded-3xl p-4"
            >
              {/* Cover: your screenshot if you added one, otherwise a gradient with initials */}
              <div
                className="flex h-44 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, hsl(${(i * 47 + 250) % 360} 80% 55% / 0.35), hsl(${(i * 47 + 310) % 360} 80% 55% / 0.12))`,
                }}
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-5xl font-bold text-white/80">
                    {p.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-3 pt-5">
                {/* Title + status badge */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <span
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      p.status === "In progress" ? "badge-progress" : "badge-live"
                    }`}
                  >
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-current" />
                    {p.status}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-[var(--muted)]">{p.text}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link (only shows if the project has one) */}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 text-sm font-medium text-[var(--accent-2)] hover:underline">
                    Visit site
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}