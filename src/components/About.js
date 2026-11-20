"use client"; // needed because we use animation + counters

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { about, now, projects } from "@/data/site"; // reads from the data file

// ---- Numbers calculated automatically from your project list ----
const total = projects.length;
const ready = projects.filter((p) => p.status !== "In progress").length;
const building = total - ready;

const stats = [
  { value: total, label: "Projects" },
  { value: ready, label: "Ready / Live" },
  { value: building, label: "In progress" },
];

// ---- Number that counts up when it scrolls into view ----
function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true }); // true once visible
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Animate from 0 to the target number in 1.5 seconds
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{n}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      {/* ---- Section title ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm uppercase tracking-widest text-[var(--accent-2)]">Who I am</p>
        <h2 className="font-display mt-3 text-4xl font-bold sm:text-6xl">About</h2>
      </motion.div>

      {/* ---- Bio (left) + counters (right) ---- */}
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
        >
          {about.text}
        </motion.p>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-3 text-center sm:p-5">
              <div className="font-display text-gradient text-4xl font-bold sm:text-5xl">
                <CountUp to={s.value} />
              </div>
              <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- "Right now" cards ---- */}
      <h3 className="font-display mt-20 text-2xl font-semibold sm:text-3xl">Right now</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {now.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6"
          >
            <p className="text-xs uppercase tracking-widest text-[var(--accent-2)]">{n.label}</p>
            <p className="mt-3 text-[var(--muted)]">{n.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}