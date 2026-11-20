"use client"; // needed for timer + animation

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Shows a loading screen first, then slides it away and plays the page animations
export default function Intro({ children }) {
  // false = loading screen showing, true = finished
  const [ready, setReady] = useState(false);

  // After 1.7 seconds, finish the intro (change 1700 to make it shorter or longer)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1700);
    return () => clearTimeout(t); // clean up
  }, []);

  return (
    <>
      {/* ---- Loading screen: slides up and away when ready becomes true ---- */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="intro"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-gradient text-7xl font-bold sm:text-8xl"
            >
              AZ
            </motion.div>
            <p className="font-hand mt-3 text-2xl text-[var(--muted)]">hey, give me a second...</p>

            {/* Progress bar that fills up */}
            <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full"
                style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The page itself. Changing the key restarts all page animations
          at the moment the loading screen leaves, so you actually see them. */}
      <div key={ready ? "show" : "wait"}>{children}</div>
    </>
  );
}