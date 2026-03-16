"use client";

/* ─── Chapter 7: Monthly Memories ────────────────────────────────────────────
   One photo per month since the relationship started (March 2025).
   Uses the <TimelineMemories /> component for the alternating vertical timeline.
   Each card fades + slides in when it enters the viewport.

   📸 Image paths use the pattern /images/month-YYYY-MM.jpg
      Replace each file in /public/images/ with the real photo for that month.
────────────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import TimelineMemories, {
  type Memory,
} from "../components/TimelineMemories";

/* ── Monthly memories data ──────────────────────────────────────────────────
   Add a real caption for each month and swap the src paths with actual photos.
   The fallback src "/images/placeholder.jpg" keeps the layout intact while
   photos haven't been added yet.
─────────────────────────────────────────────────────────────────────────────*/
const MEMORIES: Memory[] = [
  {
    month: "March",
    year: 2025,
    src: "/images/month-2025-03.jpg",
    alt: "March 2025 – the beginning",
    caption: "The month it all started 🌸",
  },
  {
    month: "April",
    year: 2025,
    src: "/images/month-2025-04.jpg",
    alt: "April 2025",
    caption: "Getting to know each other better",
  },
  {
    month: "May",
    year: 2025,
    src: "/images/month-2025-05.jpg",
    alt: "May 2025",
    caption: "Long walks and longer conversations",
  },
  {
    month: "June",
    year: 2025,
    src: "/images/month-2025-06.jpg",
    alt: "June 2025",
    caption: "Exploring new places together",
  },
  {
    month: "July",
    year: 2025,
    src: "/images/month-2025-07.jpg",
    alt: "July 2025",
    caption: "Finding comfort in each other",
  },
  {
    month: "August",
    year: 2025,
    src: "/images/month-2025-08.jpg",
    alt: "August 2025",
    caption: "Every moment felt like a gift",
  },
  {
    month: "September",
    year: 2025,
    src: "/images/month-2025-09.jpg",
    alt: "September 2025",
    caption: "More adventures, more memories",
  },
  {
    month: "October",
    year: 2025,
    src: "/images/month-2025-10.jpg",
    alt: "October 2025",
    caption: "Cozy days with you ☕",
  },
  {
    month: "November",
    year: 2025,
    src: "/images/month-2025-11.jpg",
    alt: "November 2025",
    caption: "Grateful for every ordinary day",
  },
  {
    month: "December",
    year: 2025,
    src: "/images/month-2025-12.jpg",
    alt: "December 2025",
    caption: "Ending the year the best way possible",
  },
  {
    month: "January",
    year: 2026,
    src: "/images/month-2026-01.jpg",
    alt: "January 2026",
    caption: "A new year, still the same us",
  },
  {
    month: "February",
    year: 2026,
    src: "/images/month-2026-02.jpg",
    alt: "February 2026",
    caption: "Every day is Valentine's Day with you 🤍",
  },
];

export default function Chapter7() {
  return (
    <section
      className="chapter-section"
      style={{
        alignItems: "center",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        gap: "2rem",
        /* Allow the timeline to scroll naturally */
        minHeight: "100dvh",
        justifyContent: "flex-start",
      }}
    >
      {/* ── Chapter label ── */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-sans"
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--color-text-muted)",
        }}
      >
        Chapter 07
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-handwritten text-center"
        style={{
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.2,
        }}
      >
        Monthly Memories
      </motion.h2>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.5 }}
        className="font-serif"
        style={{
          fontSize: "clamp(0.82rem, 3.5vw, 0.92rem)",
          color: "var(--color-text-muted)",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: 280,
          lineHeight: 1.7,
        }}
      >
        A year of us, one month at a time.
      </motion.p>

      {/* ── Decorative divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        aria-hidden="true"
        style={{
          height: 1,
          width: 60,
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
          borderRadius: 1,
        }}
      />

      {/* ── Timeline ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.6 }}
        style={{ width: "100%", maxWidth: 420, padding: "0 0.5rem" }}
      >
        <TimelineMemories memories={MEMORIES} />
      </motion.div>

      {/* ── Closing note ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          paddingBottom: "1rem",
          textAlign: "center",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
          🤍
        </span>
        <p
          className="font-handwritten"
          style={{
            fontSize: "clamp(1.1rem, 5vw, 1.35rem)",
            color: "var(--color-secondary)",
            lineHeight: 1.4,
          }}
        >
          twelve months.
          <br />
          a hundred little moments.
          <br />
          one big love.
        </p>
      </motion.div>
    </section>
  );
}
