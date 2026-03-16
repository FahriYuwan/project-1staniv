"use client";

/* ─── Chapter 5: Braga ────────────────────────────────────────────────────────
   Braga became a place Fahri and Anggi often visit together.
   Layout: full-viewport section, photo with warm frame, poetic caption.
────────────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion } from "framer-motion";

export default function Chapter5() {
  return (
    <section className="chapter-section">
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
          marginBottom: "0.6rem",
        }}
      >
        Chapter 5
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="font-handwritten"
        style={{
          fontSize: "clamp(2rem, 9vw, 3rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.2,
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Braga
      </motion.h2>

      {/* ── Photo in a warm tilted frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
        transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        style={{
          position: "relative",
          width: "min(300px, 80vw)",
          margin: "0 auto",
          /* Outer polaroid-style frame */
          backgroundColor: "#fdf8f0",
          padding: "10px 10px 36px",
          borderRadius: "4px",
          boxShadow:
            "0 8px 32px rgba(62, 40, 16, 0.22), 0 2px 6px rgba(62,40,16,0.1)",
          border: "1px solid var(--color-sand)",
        }}
      >
        {/* Photo */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            borderRadius: "2px",
            backgroundColor: "var(--color-parchment)",
          }}
        >
          <Image
            src="/images/braga.jpg"
            alt="Braga, Bandung"
            fill
            sizes="(max-width: 600px) 78vw, 300px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Polaroid caption area */}
        <p
          className="font-handwritten"
          style={{
            textAlign: "center",
            fontSize: "1rem",
            color: "var(--color-secondary)",
            marginTop: "0.6rem",
            lineHeight: 1.3,
          }}
        >
          Braga ✿
        </p>
      </motion.div>

      {/* ── Poetic caption ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{
          maxWidth: 300,
          margin: "2rem auto 0",
          textAlign: "center",
        }}
      >
        {/* Decorative top flourish */}
        <p
          aria-hidden="true"
          style={{
            fontSize: "1rem",
            color: "var(--color-primary-dark)",
            marginBottom: "0.6rem",
            letterSpacing: "0.3em",
          }}
        >
          ✦ ✦ ✦
        </p>

        <blockquote
          className="font-serif"
          style={{
            fontSize: "clamp(0.88rem, 3.8vw, 1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.85,
            fontStyle: "italic",
          }}
        >
          Some places become ours —
          <br />
          not because of the buildings or the streets,
          <br />
          but because of the person
          <br />
          we walked them with.
        </blockquote>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: 1,
            width: "50%",
            margin: "1.1rem auto 0",
            background:
              "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
          }}
        />

        {/* Location tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-sans"
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-text-muted)",
            marginTop: "0.85rem",
          }}
        >
          📍 Jalan Braga, Bandung
        </motion.p>
      </motion.div>
    </section>
  );
}
