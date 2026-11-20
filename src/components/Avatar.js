"use client"; // needed for state, timers and animation

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { avatar } from "@/data/site"; // image list from the data file

export default function Avatar() {
  // ---- 1. State ----
  const [mounted, setMounted] = useState(false); // true once running in the browser
  const [status, setStatus] = useState({});      // per image: "ok" (loaded) or "bad" (missing)
  const [index, setIndex] = useState(0);         // which expression is showing

  // ---- 2. 3D tilt: the avatar turns toward the mouse ----
  const mx = useMotionValue(0); // mouse X: -0.5 (left) to 0.5 (right)
  const my = useMotionValue(0); // mouse Y: -0.5 (top) to 0.5 (bottom)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });

  useEffect(() => {
    setMounted(true);
    // Track the mouse anywhere on the page
    function onMove(e) {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove); // clean up
  }, [mx, my]);

  // ---- 3. Work out which images can be used ----
  const visible = avatar.images.filter((src) => status[src] !== "bad"); // not broken
  const loaded = visible.filter((src) => status[src] === "ok");         // fully loaded
  const current = loaded.length ? loaded[index % loaded.length] : null; // image to show now

  // ---- 4. Change expression automatically every 2.5 seconds ----
  useEffect(() => {
    if (loaded.length < 2) return; // nothing to switch between
    const timer = setInterval(() => setIndex((i) => i + 1), 2500);
    return () => clearInterval(timer); // clean up
  }, [loaded.length]);

  return (
    // Outer box: floats up and down forever
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-60 w-60 sm:h-80 sm:w-80"
    >
      {/* Soft glow behind the avatar */}
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-violet-600/30 blur-3xl" />

      {/* Tilt box: turns in 3D toward the mouse, grows slightly on hover */}
      <motion.div
        onMouseEnter={() => setIndex((i) => i + 1)}
        whileHover={{ scale: 1.05 }}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="absolute inset-0 cursor-pointer"
      >
        {/* Spinning gradient ring */}
        <div className="avatar-ring absolute inset-0 rounded-full" />

        {/* Inner circle that crops the images into a round shape */}
        <div className="absolute inset-[6px] overflow-hidden rounded-full bg-[var(--bg)]">
          {/* Fallback "AZ" shown until a real image loads */}
          <div
            className="avatar-orb font-display absolute inset-0 flex items-center justify-center text-7xl font-bold text-white transition-opacity duration-500"
            style={{ opacity: current ? 0 : 1 }}
          >
            {avatar.initials}
          </div>

          {/* All images stacked; the current one fades and zooms in */}
          {mounted &&
            visible.map((src) => (
              <motion.img
                key={src}
                src={src}
                alt="Aurang Zeb avatar"
                draggable={false}
                onLoad={() => setStatus((s) => ({ ...s, [src]: "ok" }))}
                onError={() => setStatus((s) => ({ ...s, [src]: "bad" }))}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: src === current ? 1 : 0, scale: src === current ? 1 : 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}