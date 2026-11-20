"use client"; // needed because we use animation

import { motion } from "framer-motion";

// Menu items: text shown + section it scrolls to
const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    // Outer box centers the navbar at the top; clicks pass through the empty sides
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      {/* The glass pill that slides down when the page loads */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="glass pointer-events-auto flex items-center gap-0.5 rounded-full px-1.5 py-1.5 sm:gap-1 sm:px-2 sm:py-2"
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-2.5 py-2.5 text-xs text-[var(--muted)] sm:py-2 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
          >
            {l.label}
          </a>
        ))}
      </motion.nav>
    </div>
  );
}