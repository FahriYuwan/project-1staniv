"use client";

/* ─── Chapter 6: First Date ───────────────────────────────────────────────────
   Location: Kiara Artha Park
   UI: Animated entrance, location badge, photo gallery grid (2 columns),
       warm caption underneath.
────────────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion } from "framer-motion";

/* Photos from the first date — replace src values with real images */
const PHOTOS = [
  {
    src: "/images/first-date-1.jpg",
    alt: "First date at Kiara Artha Park",
    caption: "our first steps together",
  },
  {
    src: "/images/first-date-2.jpg",
    alt: "Kiara Artha Park scenery",
    caption: "the park felt magical",
  },
  {
    src: "/images/first-date-3.jpg",
    alt: "Smiling together",
    caption: "nervous but happy",
  },
  {
    src: "/images/first-date-4.jpg",
    alt: "Colorful fountain lights at night",
    caption: "lights, water, and a little magic ✨",
  },
];

/* Stagger helper */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Chapter6() {
  return (
    <section
      className="chapter-section"
      style={{ gap: "1.5rem", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
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
        Chapter 06
      </motion.p>

      {/* ── Title ── */}
      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-handwritten text-center"
        style={{
          fontSize: "clamp(2rem, 9vw, 2.8rem)",
          color: "var(--color-secondary)",
          lineHeight: 1.15,
        }}
      >
        First Date
      </motion.h2>

      {/* ── Location badge ── */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          backgroundColor: "var(--color-parchment)",
          border: "1px solid var(--color-primary)",
          borderRadius: "2rem",
          padding: "0.3rem 1rem",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "0.8rem" }}>
          📍
        </span>
        <span
          className="font-sans"
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-text-muted)",
          }}
        >
          Kiara Artha Park, Bandung
        </span>
      </motion.div>

      {/* ── Photo grid ── */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.65rem",
          width: "100%",
          maxWidth: 360,
        }}
      >
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.35 + i * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.04, zIndex: 2 }}
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "0.875rem",
              overflow: "hidden",
              border: "1.5px solid var(--color-sand)",
              backgroundColor: "var(--color-parchment)",
              boxShadow:
                "0 4px 16px rgba(114, 74, 36, 0.15), 0 1px 4px rgba(114,74,36,0.08)",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 600px) 44vw, 175px"
              style={{ objectFit: "cover" }}
              loading={i < 2 ? "eager" : "lazy"}
            />

            {/* Caption overlay on hover / always visible on mobile */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, rgba(62,40,16,0.72) 0%, transparent 100%)",
                padding: "1.2rem 0.5rem 0.45rem",
                pointerEvents: "none",
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "0.6rem",
                  color: "#fdf8f0",
                  textAlign: "center",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Narrative caption ── */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          textAlign: "center",
          maxWidth: 290,
        }}
      >
        {/* Decorative quote line */}
        <div
          aria-hidden="true"
          style={{
            height: 1,
            width: "60%",
            margin: "0 auto 1.1rem",
            background:
              "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
          }}
        />

        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.84rem, 3.5vw, 0.95rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.85,
            fontStyle: "italic",
          }}
        >
          Every first is a little terrifying.
          <br />
          But with you by my side,
          <br />
          the nerves felt a lot like excitement.
        </p>

        {/* Heart sign-off */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="font-handwritten"
          style={{
            fontSize: "1.2rem",
            color: "var(--color-secondary)",
            marginTop: "0.85rem",
          }}
          aria-hidden="true"
        >
          🤍
        </motion.p>
      </motion.div>
    </section>
  );
}
