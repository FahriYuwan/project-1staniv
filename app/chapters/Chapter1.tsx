"use client";

/* ─── Chapter 1: Opening ──────────────────────────────────────────────────────
   The very first chapter the visitor sees after unlocking the site.
   - Animated entrance for the retro polaroid photo frame
   - Names + relationship start date badge
   - Story invitation with animated swipe / arrow prompt
   NOTE: The countdown timer has been moved to the password gate page.
────────────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion } from "framer-motion";

/* ── Stagger helper for child elements ── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Chapter1() {
  return (
    <div className="chapter-section" style={{ gap: "1.75rem" }}>
      {/* ── Chapter label ── */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-sans"
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--color-text-muted)",
        }}
      >
        Chapter 01
      </motion.p>

      {/* ── Retro polaroid / photo frame ── */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{ position: "relative" }}
      >
        {/* Tilt shadow layer for depth */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(114,74,36,0.12)",
            borderRadius: "0.5rem",
            transform: "rotate(2.5deg) translateY(6px)",
            filter: "blur(4px)",
          }}
        />

        {/* Polaroid outer frame */}
        <motion.div
          whileHover={{ rotate: -1, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{
            position: "relative",
            backgroundColor: "#fefefe",
            borderRadius: "0.4rem",
            padding: "10px 10px 40px",
            boxShadow:
              "0 6px 28px rgba(62, 40, 16, 0.22), 0 1px 4px rgba(62,40,16,0.1)",
            width: "min(270px, 78vw)",
          }}
        >
          {/* Photo */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: "var(--color-parchment)",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/images/opening-photo.jpg"
              alt="Fahri and Anggi together"
              fill
              priority
              sizes="(max-width: 600px) 78vw, 270px"
              style={{ objectFit: "cover" }}
            />

            {/* Subtle warm tint overlay */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg, rgba(217,193,157,0.08) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Polaroid caption */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <p
              className="font-handwritten"
              style={{
                fontSize: "1rem",
                color: "var(--color-secondary)",
                letterSpacing: "0.04em",
              }}
            >
              us 🤍
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Title ── */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{ textAlign: "center" }}
      >
        <h1
          className="font-handwritten"
          style={{
            fontSize: "clamp(2rem, 9vw, 3rem)",
            color: "var(--color-secondary)",
            lineHeight: 1.15,
            marginBottom: "0.3rem",
          }}
        >
          Happy 1st Anniversary
        </h1>

        {/* Names */}
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.85rem, 3.8vw, 1.05rem)",
            color: "var(--color-text-muted)",
            fontStyle: "italic",
            letterSpacing: "0.03em",
          }}
        >
          Fahri Yuwan &amp; Anggi
        </p>

        {/* Date badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.65rem",
            backgroundColor: "var(--color-parchment)",
            border: "1px solid var(--color-primary)",
            borderRadius: "2rem",
            padding: "0.25rem 0.85rem",
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "0.75rem" }}>
            🌸
          </span>
          <span
            className="font-sans"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
            }}
          >
            Since March 20, 2025
          </span>
        </div>
      </motion.div>

      {/* ── Decorative divider ── */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        aria-hidden="true"
        style={{
          height: 1,
          width: "min(200px, 60vw)",
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
        }}
      />

      {/* ── Story invitation ── */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.84rem, 3.5vw, 0.95rem)",
            color: "var(--color-text-muted)",
            fontStyle: "italic",
            maxWidth: 250,
            lineHeight: 1.75,
          }}
        >
          A year of moments, big and small.
          <br />
          Swipe through our story.
        </p>

        {/* Animated swipe / arrow hint */}
        <div
          aria-hidden="true"
          style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
        >
          {/* Left bounce arrow */}
          <motion.span
            animate={{ x: [-4, 0, -4] }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            style={{
              fontSize: "0.85rem",
              color: "var(--color-primary-dark)",
              opacity: 0.55,
              lineHeight: 1,
            }}
          >
            ←
          </motion.span>

          {/* Centre dot */}
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              display: "block",
              opacity: 0.6,
            }}
          />

          {/* Right bounce arrow */}
          <motion.span
            animate={{ x: [4, 0, 4] }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: "0.85rem",
              color: "var(--color-primary-dark)",
              opacity: 0.55,
              lineHeight: 1,
            }}
          >
            →
          </motion.span>
        </div>
      </motion.div>

      {/* ── Closing note ── */}
      <motion.p
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-handwritten"
        style={{
          fontSize: "clamp(0.95rem, 4vw, 1.1rem)",
          color: "var(--color-primary-dark)",
          textAlign: "center",
          opacity: 0.8,
          lineHeight: 1.5,
        }}
      >
        a year of us — and so many more to come 🌸
      </motion.p>
    </div>
  );
}
