"use client"; // needed because it runs in the browser

import { useEffect } from "react";
import Lenis from "lenis";

// Adds smooth, glide-style scrolling to the whole page. Shows nothing on screen.
export default function SmoothScroll() {
  useEffect(() => {
    // anchors: true makes the nav links (#projects etc.) glide too
    const lenis = new Lenis({ duration: 1.2, anchors: true });

    // Lenis needs to be updated on every animation frame
    let id;
    function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    // Clean up when the page closes
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}