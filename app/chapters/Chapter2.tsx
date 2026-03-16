"use client";

/* ─── Chapter 2: First Meeting ───────────────────────────────────────────────
   Fahri first met Anggi when she was cosplaying.
   He asked her for a photo and asked for her Instagram.

   UI:
   - Entrance animation
   - Photo inside a soft frame
   - "Open Memory" button
   - MemoryPopup revealing the full story
────────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MemoryPopup from "../components/MemoryPopup";

export default function Chapter2() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
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
            marginBottom: "0.5rem",
          }}
        >
          Chapter 02
        </motion.p>

        {/* ── Title ── */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-handwritten"
          style={{
            fontSize: "clamp(2rem, 9vw, 2.8rem)",
            color: "var(--color-secondary)",
            marginBottom: "0.35rem",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          First Meeting
        </motion.h2>

        {/* ── Decorative divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          aria-hidden="true"
          style={{
            height: 1,
            width: 60,
            background:
              "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            marginBottom: "1.75rem",
          }}
        />

        {/* ── Photo frame ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            width: "min(280px, 78vw)",
            aspectRatio: "3 / 4",
            /* Outer frame */
            padding: 6,
            background:
              "linear-gradient(145deg, var(--color-primary-light), var(--color-primary-dark))",
            borderRadius: "1rem",
            boxShadow:
              "0 8px 32px rgba(114, 74, 36, 0.22), 0 2px 8px rgba(114,74,36,0.1)",
            marginBottom: "1.75rem",
          }}
        >
          {/* Inner cream mat */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "0.6rem",
              overflow: "hidden",
              backgroundColor: "var(--color-parchment)",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          >
            <Image
              src="/images/first-meeting.jpeg"
              alt="Fahri and Anggi's first meeting — she was cosplaying"
              fill
              sizes="(max-width: 600px) 78vw, 280px"
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Subtle vignette */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(62,40,16,0.18) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Corner ornaments */}
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: c.startsWith("t") ? 2 : "auto",
                bottom: c.startsWith("b") ? 2 : "auto",
                left: c.endsWith("l") ? 2 : "auto",
                right: c.endsWith("r") ? 2 : "auto",
                fontSize: "0.6rem",
                color: "var(--color-secondary-dark)",
                opacity: 0.8,
                lineHeight: 1,
              }}
            >
              ✿
            </span>
          ))}
        </motion.div>

        {/* ── Short teaser text ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-serif"
          style={{
            fontSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
            color: "var(--color-text-muted)",
            textAlign: "center",
            maxWidth: 260,
            lineHeight: 1.7,
            fontStyle: "italic",
            marginBottom: "1.75rem",
          }}
        >
          A chance encounter that started everything…
        </motion.p>

        {/* ── Open Memory button ── */}
        <motion.button
          onClick={() => setPopupOpen(true)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-warm"
          style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
        >
          <span aria-hidden="true">🌸</span>
          Open Memory
        </motion.button>
      </section>

      {/* ── Memory Popup ── */}
      <MemoryPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Where It All Began"
      >
        <p style={{ marginBottom: "0.9rem" }}>
          It was an event Fahri almost didn&apos;t go to. Then he saw her —
          Anggi, in full cosplay, completely in her element.
        </p>
        <p style={{ marginBottom: "0.9rem" }}>
          He gathered every ounce of courage he had and asked for a photo. She
          smiled and said yes. Before she could disappear into the crowd, he
          found himself asking one more thing —
        </p>
        <p
          className="font-handwritten"
          style={{
            fontSize: "1.15rem",
            color: "var(--color-secondary)",
            textAlign: "center",
            margin: "0.75rem 0",
          }}
        >
          &ldquo;Boleh minta Instagram-nya?&rdquo;
        </p>
        <p>
          She gave it. He thanked her. They went their separate ways — but
          somewhere in the back of his mind, he knew that wasn&apos;t the end.
        </p>
      </MemoryPopup>
    </>
  );
}
