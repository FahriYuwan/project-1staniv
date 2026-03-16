"use client";

/* ─── Chapter 10: Plushie Family ─────────────────────────────────────────────
   The final chapter — a warm, playful tribute to the four plushies:
   Pippi, Pupu, Miam, and Piyik.
   Each plushie is displayed inside a decorative frame via <PlushieGallery />.
────────────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import PlushieGallery from "../components/PlushieGallery";

const PLUSHIES = [
  {
    name: "Pippi",
    src: "/images/plushie-pippi.jpg",
    emoji: "🐻",
  },
  {
    name: "Pupu",
    src: "/images/plushie-pupu.jpg",
    emoji: "🐰",
  },
  {
    name: "Miam",
    src: "/images/plushie-miam.jpg",
    emoji: "🐱",
  },
  {
    name: "Piyik",
    src: "/images/plushie-piyik.jpg",
    emoji: "🐥",
  },
];

export default function Chapter10() {
  return (
    <section
      className="chapter-section"
      style={{ gap: "1.75rem", paddingTop: "5rem", paddingBottom: "5rem" }}
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
        Chapter 10
      </motion.p>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center" }}
      >
        <h2
          className="font-handwritten"
          style={{
            fontSize: "clamp(2rem, 9vw, 2.8rem)",
            color: "var(--color-secondary)",
            lineHeight: 1.15,
          }}
        >
          Plushie Family
        </h2>

        {/* Subtitle */}
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.8rem, 3.2vw, 0.9rem)",
            color: "var(--color-text-muted)",
            fontStyle: "italic",
            marginTop: "0.35rem",
          }}
        >
          our little family
        </p>
      </motion.div>

      {/* ── Decorative divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        aria-hidden="true"
        style={{
          height: 1,
          width: "min(200px, 55vw)",
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
        }}
      />

      {/* ── Plushie gallery ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 360 }}
      >
        <PlushieGallery plushies={PLUSHIES} />
      </motion.div>

      {/* ── Closing note ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          textAlign: "center",
          maxWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.65rem",
        }}
      >
        <p
          aria-hidden="true"
          style={{
            fontSize: "1rem",
            color: "var(--color-primary-dark)",
            letterSpacing: "0.3em",
          }}
        >
          ✦ ✦ ✦
        </p>

        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.82rem, 3.5vw, 0.92rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.85,
            fontStyle: "italic",
          }}
        >
          Every family needs a soft place to land.
          <br />
          Ours just happens to be extra fluffy.
        </p>

        <p
          className="font-handwritten"
          style={{
            fontSize: "clamp(1rem, 4.5vw, 1.2rem)",
            color: "var(--color-secondary)",
            marginTop: "0.25rem",
          }}
        >
          Pippi, Pupu, Miam &amp; Piyik 🤍
        </p>
      </motion.div>

      {/* ── Final page closing flourish ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.1,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        {/* Petal row */}
        <div
          aria-hidden="true"
          style={{ display: "flex", gap: "0.5rem", fontSize: "1.2rem" }}
        >
          {["🌸", "🤍", "🌸"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{ lineHeight: 1 }}
            >
              {e}
            </motion.span>
          ))}
        </div>

        <p
          className="font-handwritten"
          style={{
            fontSize: "clamp(0.85rem, 3.8vw, 1rem)",
            color: "var(--color-text-muted)",
          }}
        >
          — the end, for now —
        </p>
      </motion.div>
    </section>
  );
}
