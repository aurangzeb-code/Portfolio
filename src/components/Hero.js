"use client"; // needed because we use animation + mouse events

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { hero } from "@/data/site";

// Words of the big headline (the last one gets the gradient color)
const words = [
  { text: "HI,", gradient: false },
  { text: "I'M", gradient: false },
  { text: "AURANG", gradient: true },
];

export default function Hero() {
  // ---- 0. Greeting based on the visitor's local time ----
  const [greeting, setGreeting] = useState("Hello, glad you stopped by");
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 5) setGreeting("Up late? Glad you stopped by");
    else if (h < 12) setGreeting("Good morning, glad you stopped by");
    else if (h < 18) setGreeting("Good afternoon, glad you stopped by");
    else setGreeting("Good evening, glad you stopped by");
  }, []);

  // ---- 1. Mouse tracking ----
  const mx = useMotionValue(0); // mouse X: -0.5 (left) to 0.5 (right)
  const my = useMotionValue(0); // mouse Y: -0.5 (top) to 0.5 (bottom)

  // Springs make the movement smooth instead of jumpy
  const sx = useSpring(mx, { stiffness: 80, damping: 15 });
  const sy = useSpring(my, { stiffness: 80, damping: 15 });

  // ---- 2. Turn mouse position into movement ----
  const avatarX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const avatarRotate = useTransform(sx, [-0.5, 0.5], [0, 0]);
  const headlineX = useTransform(sx, [-0.5, 0.5], [14, -14]); // opposite direction = depth

  // ---- 3. Update the values whenever the mouse moves ----
  function handleMouseMove(e) {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ---- Background: grid ---- */}
      <div className="bg-grid pointer-events-none absolute inset-0" />

      {/* ---- Background: two floating glow blobs ---- */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-28 text-center">
        {/* Small status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-[var(--muted)] sm:text-sm"
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
          {greeting}
        </motion.div>

        {/* Big headline: each word slides up from behind a mask */}
        <motion.h1
          style={{ x: headlineX, fontSize: "clamp(2.2rem, 9vw, 8rem)" }}
          className="font-display flex flex-wrap justify-center gap-x-[0.25em] font-bold leading-none tracking-tight"
        >
          {words.map((w, i) => (
            <span key={w.text} className="overflow-hidden py-2">
              <motion.span
                className={`inline-block ${w.gradient ? "text-gradient" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Avatar placeholder: follows the mouse. Step 3 replaces it with your avatar */}
        <motion.div
          style={{ x: avatarX, y: avatarY, rotate: avatarRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-20 mt-2 sm:-mt-4"
        ><Avatar />

          <span className="font-hand mt-1 block text-center text-2xl text-[var(--accent-2)] md:hidden">{hero.note}</span>

          {/* Handwritten note with a hand-drawn arrow */}
          <div className="pointer-events-none absolute left-full top-6 ml-4 hidden md:block">
            <span className="font-hand block -rotate-6 whitespace-nowrap text-3xl text-[var(--accent-2)]">{hero.note}</span>
            <svg viewBox="0 0 80 50" className="ml-4 h-12 w-20 text-[var(--accent-2)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M72 6 C 55 4, 25 14, 12 42" />
              <path d="M23.5 34 L12 42 L10.7 28" />
            </svg>
          </div>
        </motion.div>

        {/* One-line intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 max-w-xl text-base text-[var(--muted)] sm:text-lg"
        >
          {hero.tagline}
        </motion.p>

        {/* Two buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary rounded-full px-7 py-3 text-sm font-semibold"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="glass rounded-full px-7 py-3 text-sm font-semibold"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}